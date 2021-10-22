import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { Form } from "antd";
import BackButton from "../../../../component/BackButton";
// import { getDetailOfNews, } from "../../../../reducers/NewsManagement";
import styled from "styled-components";
import { getDetailOfNews } from "../../../../reducers/adminManagement/NewsManagement";

const Wrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  /* color: #3483eb; */
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
  textarea {
    resize: none;
  }
  .edit_area {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 50px;
    .edit_button {
      background: #1890ff;
      color: #ffffff;
      border-radius: 5px;
      width: 130px;
    }
    .deactive_button {
      border-radius: 5px;
      /* background: #ff0000;
      color: #fff; */
    }
    .active_button {
      /* background: #2eb82e; */
      border-radius: 5px;
      /* color: #ffffff; */
    }
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  .title-content {
    font-weight: bold;
  }
  .status {
    display: flex;
    font-size: 22px;
    justify-content: flex-end;
    align-items: center;
    /* width: 100%;
    height: 100%; */
  }
  label {
    font-weight: 600;
  }
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  .ant-input[disabled] {
    color: #6b7280;
    border-radius: 5px;
  }
  .ant-select-disabled.ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    color: #6b7280;
    border-radius: 5px;
  }
  .ant-radio-disabled + span {
    color: #6b7280;
  }
  img {
    margin: auto;
  }
`;

const ViewPublic = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDetailOfNews(id));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newsDetail = useSelector((state) =>
    state.newsManagement.newsDetail ? state.newsManagement.newsDetail : {}
  );

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <BackButton />
      <div className="header">
        <h1>Xem trước bài viết</h1>
      </div>
      <div>
        <img src={newsDetail.image} alt="" />

        <p className="title-content">{newsDetail.title}</p>
        <div>{newsDetail.short_content}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: newsDetail.content,
          }}
        ></div>
        <div>{newsDetail.create_date}</div>
      </div>
    </Wrapper>
  );
};

export default ViewPublic;
