import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
// import {
//   getNewsBySearch,
// } from "../../../reducers/NewsManagement";
import moment from "moment";
import {
  Table,
  DatePicker,
  Input,
  Button,
  Typography,
  Select,
  Row,
  Tooltip,
  Col,
  Descriptions,
  notification,
  Space,
} from "antd";
import { checkObjectSearch } from "../../../common";
import _ from "lodash";
import {
  SearchOutlined,
  PlusOutlined,
  LoadingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { getNewsBySearch } from "../../../reducers/adminManagement/NewsManagement";

const { Text } = Typography;
const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #f1f9ff;
  padding: 30px 50px 100px;
  .search_area {
    margin-bottom: 20px;
    .search_button_area {
      display: flex;
      justify-content: flex-end;
      .search_button {
        border-radius: 5px;
      }
    }
  }
  h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  .ant-btn {
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    &.add_button {
      position: relative;
      bottom: 49px;
    }
    &.add_button_no_paging {
      position: relative;
      bottom: -12px;
    }
    .nav_link {
      color: #fff;
      margin-left: 10px;
    }
  }
  .ant-picker {
    width: 100%;
    border-radius: 5px;
  }
  .ant-descriptions-item {
    padding-bottom: 0;
    display: flex;
    justify-content: flex-end;
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
  .ant-select-selector {
    border-radius: 5px !important;
  }
  .ant-input {
    width: 100%;
    border-radius: 5px;
  }
  @media only screen and (max-width: 1199px) {
    .search_area {
      .search_button_area {
        /* display: flex;
        justify-content: flex-start; */
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .ant-descriptions-item {
      padding-bottom: 16px;
      display: flex;
      justify-content: flex-start;
    }
    .search_button {
      margin-top: 39px;
    }
  }
  @media only screen and (max-width: 575px) {
    .search_button {
      margin-top: 0;
    }
    .search_area {
      .search_button_area {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

const NewsManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    limit: 10,
    sort: "desc",
    order: "create_date",
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    showSizeChanger: true,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!checkObjectSearch(params)) {
        const response = await dispatch(
          getNewsBySearch({ ...paramsSearch, ...params })
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
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputValues, setInputValues] = useState(
    _.omit(params, ["page", "limit", "sort", "order"])
  );

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 10,
    },
    {
      title: "Ngày tạo",
      dataIndex: "create_date",
      key: "create_date",
      width: 50,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 250,
    },
    {
      title: "Nội dung  tóm tắt",
      dataIndex: "short_content",
      key: "short_content",
      width: 500,
      responsive: ["lg"],
    },
    {
      title: "Trạng thái",
      dataIndex: "is_public",
      key: "is_public",
      width: 100,
      render: (is_public) => (
        <>
          {is_public === true ? (
            <Text type="success">Công khai</Text>
          ) : (
            <Text type="danger">Lưu tạm thời</Text>
          )}
        </>
      ),
    },
    {
      key: "view detail",
      width: 80,
      render: (text, record) => (
        <Tooltip title="Xem chi tiết" placement="top">
          <Link to={`${location.pathname}/${record.news_id}`}>
            <EyeOutlined />
          </Link>
        </Tooltip>
      ),
    },
    {
      key: "view public",
      width: 30,
      render: (text, record) => (
        <Tooltip title="Xem công khai" placement="top">
          <Link to={`${location.pathname}/${record.news_id}/view_public`}>
            Xem
          </Link>
        </Tooltip>
      ),
    },
  ];

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleOnChangePublic = (is_public) => {
    setInputValues({ ...inputValues, isPublic: is_public });
  };

  const handleFromDateChange = (date) => {
    setInputValues({
      ...inputValues,
      createDate: date ? moment(date).format("DD/MM/YYYY") : "",
    });
  };

  const handleSearch = async () => {
    if (checkObjectSearch(inputValues)) {
      setNews([]);
      setPagination({
        ...pagination,
        current: 1,
        total: 0,
      });
      await notification.error({
        message: "Yêu cầu phải nhập tiêu chí tìm kiếm!",
        duration: 2.5,
      });
    } else {
      setLoading(true);
      const params = {
        ...paramsSearch,
        ...inputValues,
      };
      const params1 = new URLSearchParams({
        ...params,
      });

      history.push(`${location.pathname}?${params1.toString()}`);
      const response = await dispatch(getNewsBySearch(params));
      setPagination({
        ...pagination,
        current: pagination.current,
        total: response.totalItem,
      });
      setNews(response.listNewsResponses);
      setLoading(false);
    }
  };

  const handleChange = async (pagination, filters, sorter) => {
    setLoading(true);
    setParamsSearch({
      ...paramsSearch,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: "desc",
      order: "create_date",
    });

    const params1 = new URLSearchParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: "desc",
      order: "create_date",
    });

    history.push(`${location.pathname}?${params1.toString()}`);

    await dispatch(
      getNewsBySearch({
        ...inputValues,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: "desc",
        order: "create_date",
      })
    ).then((res) => {
      setNews(res.listNewsResponses);
      setPagination({
        ...pagination,
        current: pagination.current,
        total: res.totalItem,
      });
    });
    setLoading(false);
  };

  const dataWithIndex = [];
  if (news.length) {
    for (let i = 0; i < news.length; i++) {
      dataWithIndex.push({
        key: (pagination.current - 1) * pagination.pageSize + i + 1,
        ...news[i],
      });
    }
  }

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <h1>Quản lý Bài viết</h1>
        <div className="search_area">
          <Row gutter={[32, 16]}>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Tiêu đề"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <Input
                    name="title"
                    onChange={handleOnChange}
                    defaultValue={_.get(params, "title", "")}
                  />
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Trạng thái"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <Select
                    defaultValue={
                      _.get(params, "isPublic", "") === "true"
                        ? true
                        : _.get(params, "isPublic", "") === "false"
                        ? false
                        : ""
                    }
                    className="w-full"
                    onChange={(is_public) => handleOnChangePublic(is_public)}
                    name="is_public"
                  >
                    <Option value="">--- Chọn trạng thái ---</Option>
                    <Option value={true}>Công Khai</Option>
                    <Option value={false}>Lưu tạm thời</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Ngày tạo"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    name="create_date"
                    placeholder="DD/MM/YYYY"
                    onChange={handleFromDateChange}
                    defaultValue={
                      params.createDate
                        ? moment(params.createDate, "DD/MM/YYYY")
                        : ""
                    }
                    disabledDate={(current) => {
                      return (
                        current &&
                        current >
                          moment(inputValues.toDate, "DD/MM/YYYY").endOf("day")
                      );
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col
              xl={24}
              lg={12}
              md={12}
              sm={12}
              xs={24}
              className="search_button_area"
            >
              {/* <Tooltip title="Ấn vào đây để tìm kiếm" placement="right"> */}
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                className="search_button"
              >
                {/* <SearchOutlined /> */}
                Tìm kiếm
              </Button>
              {/* </Tooltip> */}
            </Col>
          </Row>
        </div>
      </div>
      <Table
        dataSource={dataWithIndex}
        columns={columns}
        onChange={handleChange}
        pagination={pagination}
        loading={{
          spinning: loading,
          tip: "Vui lòng đợi...",
          indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />,
        }}
      />
      <div className="function_area">
        <Space>
          <Tooltip title="Thêm bài viết" placement="bottomLeft">
            <Button
              type="primary"
              icon={<PlusOutlined style={{ fontSize: "16px" }} />}
              className={
                dataWithIndex.length > 0 ? "add_button" : "add_button_no_paging"
              }
              href={`${location.pathname}/add`}
            ></Button>
          </Tooltip>
          <Tooltip title="Xem danh sách bài viết" placement="right">
            <Button
              type="primary"
              icon={<EyeOutlined style={{ fontSize: "16px" }} />}
              className={
                dataWithIndex.length > 0 ? "add_button" : "add_button_no_paging"
              }
              href={`${location.pathname}/viewlistnews`}
            ></Button>
          </Tooltip>
        </Space>
      </div>
    </Wrapper>
  );
};

export default NewsManagement;
