import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Col,
  notification,
  Row,
  Radio,
  Spin,
  Space,
} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  editNewsForAdmin,
  getDetailOfNews,
} from "../../../../reducers/adminManagement/NewsManagement";
import BackButton from "../../../../component/BackButton";
// import _ from "lodash";
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

const EditNews = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [inputValues, setInputValues] = useState({});

  const [form] = Form.useForm();
  const [background, setBackground] = useState();
  const [file, setFile] = useState();
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const response = await dispatch(getDetailOfNews(id));
      form.setFieldsValue(response);
      setInputValues({ ...inputValues, ...response });
      setBackground(response.image);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleOnChangeContent = (content) => {
    setInputValues({ ...inputValues, content: content });
  };

  const fileHandler = (event) => {
    if (event.target.files[0].size < 2000000) {
      setIsChangeImage(true);
      let reader = new FileReader();
      reader.onload = function (e) {
        setFile(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const response = await dispatch(
      editNewsForAdmin(inputValues, file, isChangeImage)
    );
    if (response.status === 200) {
      await notification.success({
        message: "Cập nhật bài viết thành công!",
        duration: 2.5,
      });
      history.replace("/admin/news/" + id + "/view_public");
    } else {
      await notification.success({
        message: "Đã xảy ra lỗi! Xin vui lòng thử lại sau!",
        duration: 2.5,
      });
    }
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <BackButton />

      <Spin
        spinning={loading}
        tip="Vui lòng đợi..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <div className="header">
          <h1>Cập nhật bài viết</h1>
        </div>
        <Form
          layout="vertical"
          form={form}
          method="post"
          onFinish={handleSubmit}
        >
          {/* <Spin
          spinning={loading}
          tip="Vui lòng đợi..."
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        > */}
          <Row gutter={32}>
            <Col span={24}>
              <Form.Item
                label="Tiêu đề"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiêu đề",
                  },
                ]}
              >
                <Input name="title" onChange={handleOnChange} />
              </Form.Item>
              <Form.Item
                label="Tóm tắt nội dung"
                name="short_content"
                rules={[
                  { required: true, message: "Vui lòng nhập nội dung ngắn" },
                ]}
              >
                <TextArea name="short_content" onChange={handleOnChange} />
              </Form.Item>

              <Form.Item
                label="Ảnh bìa"
                rules={[{ required: true, message: "Vui lòng chọn ảnh bìa" }]}
              >
                <div>
                  <img
                    src={file ? file : background}
                    alt={""}
                    style={{ width: "500px", height: "auto" }}
                  />

                  <br />
                  <input type="file" onChange={fileHandler} />
                </div>
              </Form.Item>

              <Form.Item label="Trạng thái" name="is_public">
                <Radio.Group name="is_public" onChange={handleOnChange}>
                  <Radio value={true}>Đăng công khai</Radio>
                  <Radio value={false}>Lưu tạm thời</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Nội dung" name="content">
                <ReactQuill
                  name="content"
                  onChange={handleOnChangeContent}
                  modules={EditNews.modules}
                  formats={EditNews.formats}
                />
              </Form.Item>
              <br />
            </Col>
          </Row>
          {/* </Spin> */}
          <div className="edit_area">
            <Space>
              <Button className="deactive_button" onClick={goBack}>
                Hủy
              </Button>
              <Button className="edit_button" htmlType="submit">
                Cập nhật bài viết
              </Button>
            </Space>
          </div>

          <div style={{ paddingTop: "5px" }}></div>
        </Form>
      </Spin>
    </Wrapper>
  );
};

EditNews.modules = {
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

EditNews.formats = [
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

export default EditNews;
