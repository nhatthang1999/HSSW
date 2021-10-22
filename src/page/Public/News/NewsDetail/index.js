import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { Form } from "antd";
import styled from "styled-components";
import { getDetailOfNews } from "../../../../reducers/adminManagement/NewsManagement";
import BackButton from "../../../../component/BackButton";
import { Skeleton } from "antd";
// import { getDetailOfNews, } from "../../../../reducers/NewsManagement";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 20px 300px 100px;
  background-color: #f1f9ff;

  textarea {
    resize: none;
  }
  h1 {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: #286ba6;
    margin-bottom: 0;
    padding-bottom: 20px;
  }
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  img {
    margin: auto;
  }
  .news_short_content {
    margin-bottom: 20px;
    padding: 0 20px;
    text-align: center;
  }
  .news_image {
    margin-bottom: 20px;
    width: auto;
    height: 300px;
  }
  .create_date {
    display: flex;
    justify-content: flex-end;
  }
  .news_content {
    padding: 0 20px;
  }
  @media (max-width: 1440px) {
    padding: 50px 150px;
  }
  @media (max-width: 1199px) {
    padding: 50px 70px;
  }

  @media (max-width: 1200px) {
    padding: 50px 70px 100px;
  }
  @media (max-width: 992px) {
    padding: 50px 50px 100px;
    .news_content {
      padding: 0;
    }
  }
  @media (max-width: 767px) {
    padding: 50px 40px 100px;
    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 576px) {
    padding: 50px 25px 100px;
    .news_image {
      width: auto;
      height: 200px;
    }
  }
`;

const NewsDetailPublic = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const location = useLocation();
  // const history = useHistory();
  // const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [newsDetail, setNewsDetail] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(getDetailOfNews(id));
      setNewsDetail(response);
      setLoading(false);

      // form.setFieldsValue(response);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const newsDetail = useSelector((state) =>
  //   state.newsManagement.newsDetail ? state.newsManagement.newsDetail : {}
  // );

  return (
    <Wrapper>
      <BackButton />
      <Skeleton loading={loading} active />
      <Skeleton loading={loading} active>
        <h1 className="title-content">{newsDetail?.title}</h1>
        <h2 className="news_short_content">{newsDetail?.short_content}</h2>
        <img src={newsDetail?.image} alt="" className="news_image" />
        <div className="news_content">
          <div
            dangerouslySetInnerHTML={{
              __html: newsDetail?.content,
            }}
          ></div>
          <div className="create_date">{newsDetail?.create_date}</div>
        </div>
      </Skeleton>
    </Wrapper>
  );
};

export default NewsDetailPublic;
