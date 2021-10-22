import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Row, Col, Input, Pagination, Button, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { getTop3News } from "../../../reducers/Public";

// const { Search } = Input;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f1f9ff;

  padding: 30px 300px 100px;
  .header {
  }
  .search_area {
    margin-bottom: 20px;
    .search_button {
      display: flex;
    }
  }
  .ant-btn {
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: start;
    color: #286ba6;
    margin-bottom: 0;
    padding-bottom: 20px;
  }
  h2 {
    font-size: 18px;
    font-weight: 500;
  }
  .news_title {
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
  }
  .news_content {
    color: #000000;
  }
  .img_container {
    width: 100%;
    height: 100%;
    object-fit: cover;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .pagination {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-item-link {
    border-radius: 50%;
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
  .ant-pagination-item {
    border-radius: 50%;
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
  .news {
    padding: 15px 0;
    position: relative;
    transition: box-shadow 0.2s, border 0.1s;
    .news_container {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      padding: 15px;
      border: 1px solid hsla(0, 0%, 100%, 0);
      clear: both;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.14);

      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.4);
        border-radius: 10px;
        box-shadow: 4px 8px 20px rgb(0 0 0 / 5%);
      }
    }

    /* .img_cont {
      padding-left: 0 !important;
      padding-right: 0 !important;
    } */
  }
  .ant-row {
    row-gap: 0 !important;
  }
  @media (max-width: 1440px) {
    padding: 30px 150px 50px;
  }
  @media (max-width: 1199px) {
    padding: 30px 70px;
  }
  @media (max-width: 1023px) {
    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 992px) {
    padding: 30px 50px;
  }
  @media (max-width: 767px) {
    padding: 30px 40px;
  }
  @media (max-width: 576px) {
    padding: 30px 25px;
  }
`;

const News = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    limit: 6,
    sort: "desc",
    order: "create_date",
    isPublic: true,
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(
        getTop3News({ ...paramsSearch, ...params })
      );
      setNews(response.listNewsResponses);
      setPagination({
        ...pagination,
        total: response.totalItem,
        current: !_.isUndefined(params.page)
          ? _.parseInt(params.page)
          : pagination.current,
        pageSize: !_.isUndefined(params.limit)
          ? _.parseInt(params.limit)
          : pagination.pageSize,
      });
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputValues, setInputValues] = useState(
    _.omit(params, ["page", "limit", "sort", "order"])
  );

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSearch = async () => {
    setLoading(true);
    setNews([]);
    const params = {
      ...paramsSearch,
      ...inputValues,
    };
    const params1 = new URLSearchParams({
      ...params,
    });

    history.push(`${location.pathname}?${params1.toString()}`);
    const response = await dispatch(getTop3News(params));
    setPagination({
      ...pagination,
      current: pagination.current,
      total: response.totalItem,
    });
    setNews(response.listNewsResponses);
    setLoading(false);
  };

  const onChange = async (page) => {
    setLoading(true);

    setParamsSearch({
      ...paramsSearch,
      page: page,
      limit: pagination.pageSize,
    });

    const params1 = new URLSearchParams({
      ...params,
      page: page,
      limit: pagination.pageSize,
    });

    setPagination({
      ...pagination,
      current: page,
    });

    history.push(`${location.pathname}?${params1.toString()}`);

    const response = await dispatch(
      getTop3News({ ...params, ...paramsSearch, page: page })
    );

    setNews(response.listNewsResponses);
    setLoading(false);
  };

  const dataWithIndex = [];
  for (let i = 0; i < news.length; i++) {
    dataWithIndex.push({
      ...news[i],
    });
  }

  return (
    <Wrapper>
      <div className="header">
        <h1>Danh sách bài viết</h1>
        <Row className="flex justify-start">
          <Col lg={12} md={24} sm={24} xs={24} className="search_area">
            <div className="search_button">
              <Input
                name="title"
                onChange={handleOnChange}
                defaultValue={_.get(params, "title", "")}
              />
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                style={{ marginLeft: "16px" }}
              >
                Tìm kiếm
              </Button>
            </div>
          </Col>
        </Row>
        <Skeleton loading={loading} active />
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {dataWithIndex.map((item, index) => {
            return (
              <Skeleton loading={loading} active key={index}>
                <Col
                  lg={12}
                  md={24}
                  sm={24}
                  xs={24}
                  key={item.id}
                  className="news"
                >
                  <div className="news_container">
                    <div className="news_title">
                      <Link to={`${location.pathname}/${item.news_id}`}>
                        <h2>{item.title}</h2>
                      </Link>
                    </div>

                    <Row gutter={16}>
                      <Col span={8} className="img_cont">
                        <div className="img_container">
                          <Link to={`${location.pathname}/${item.news_id}`}>
                            <img src={item.image} alt="" />
                          </Link>
                        </div>
                      </Col>
                      <Col span={16}>
                        <Link to={`${location.pathname}/${item.news_id}`}>
                          <div className="news_content">
                            {item.short_content}
                          </div>
                        </Link>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Skeleton>
            );
          })}
        </Row>
        <Skeleton loading={loading} active>
          <Pagination
            {...pagination}
            onChange={onChange}
            className="flex item-center justify-center pagination"
          />
        </Skeleton>
      </div>
    </Wrapper>
  );
};

export default News;
