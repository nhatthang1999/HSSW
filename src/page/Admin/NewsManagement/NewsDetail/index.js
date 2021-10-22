import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  Input,
  Button,
  Radio,
  Col,
  Row,
  notification,
  Descriptions,
  Spin,
  Space,
} from "antd";
import { NavLink, useLocation, useParams } from "react-router-dom";
import BackButton from "../../../../component/BackButton";
import ConfirmModal from "../../../../component/ConfirmModal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { LoadingOutlined } from "@ant-design/icons";
import {
  deleteNewsForAdmin,
  getDetailOfNews,
} from "../../../../reducers/adminManagement/NewsManagement";

const { TextArea } = Input;

const Wrapper = styled.div`
  width: 100%;
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
      width: 130px;
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
  .ant-descriptions-item {
    .ant-descriptions-item-label {
      font-weight: 600;
    }
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

const NewsDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      dispatch(getDetailOfNews(id));
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newsDetail = useSelector((state) =>
    state.newsManagement.newsDetail ? state.newsManagement.newsDetail : {}
  );

  const [modalShowDelete, setModalShowDelete] = useState(false);

  const callbackFunctionDelete = async () => {
    const status = await dispatch(deleteNewsForAdmin(id));
    if (status.status === 200) {
      await notification.success({
        message: "Xóa bài viết thành công!",
        duration: 2.5,
      });
      return history.replace("/admin/news");
    }
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <BackButton />
      <div className="header">
        <h1>Thông tin bài viết</h1>
      </div>
      <Spin
        spinning={loading}
        tip="Vui lòng đợi..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <Row gutter={32}>
          <Col span={24}>
            <Descriptions layout="vertical" column={1}>
              <Descriptions.Item label="Tiêu đề">
                <Input disabled={true} value={newsDetail.title} />
              </Descriptions.Item>
              <Descriptions.Item label="Tóm tắt nội dung">
                <TextArea disabled={true} value={newsDetail.short_content} />
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Radio.Group
                  name="is_public"
                  value={newsDetail.is_public}
                  disabled
                >
                  <Radio value={true}>Đăng công khai</Radio>
                  <Radio value={false}>Lưu tạm thời</Radio>
                </Radio.Group>
              </Descriptions.Item>
              <Descriptions.Item label="Ảnh bìa">
                <img
                  src={newsDetail.image}
                  alt=""
                  style={{ width: "500px", height: "auto" }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Nội dung">
                <ReactQuill
                  value={newsDetail.content}
                  readOnly
                  modules={NewsDetail.modules}
                  formats={NewsDetail.formats}
                />
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <br />
        <div className="edit_area">
          <Space>
            <Button
              onClick={() => {
                setModalShowDelete(true);
              }}
              className="deactive_button"
            >
              Xóa bài viết
            </Button>
            <NavLink to={`${location.pathname}/edit`} replace>
              <Button className="edit_button">Sửa thông tin</Button>
            </NavLink>
          </Space>
        </div>
        <ConfirmModal
          visible={modalShowDelete}
          onHide={() => setModalShowDelete(false)}
          title="Xóa bài viết"
          modalText="Bạn có chắc chắn muốn xóa bài viết này không?"
          callBack={callbackFunctionDelete}
        />
      </Spin>
    </Wrapper>
  );
};

NewsDetail.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
    [
      { align: null },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

NewsDetail.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "clean",
  "align",
];

export default NewsDetail;
