import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addNewNewsForAdmin } from "../../../../reducers/adminManagement/NewsManagement";
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Radio,
  notification,
  Space,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BackButton from "../../../../component/BackButton";

const { TextArea } = Input;

const Wrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  background-color: #f1f9ff;
  padding: 20px 50px 100px;
  .header {
    text-align: left;
  }
  .ant-picker {
    width: 100%;
  }
  textarea {
    resize: none;
  }
  .add_cancel {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .add_button {
      /* background: #1890ff; */
      /* color: #ffffff; */
      border-radius: 5px;
    }
    .cancel_button {
      border-radius: 5px;
      width: 115px;
      /* background: #ff0000; */
      /* color: #fff; */
    }
  }
  h1 {
    font-size: 30px;
    font-weight: bold;
    margin: 20px 0 50px 0;
  }
  .ant-form-item-label {
    font-weight: 600;
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
`;

const AddNews = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({ isPublic: true });

  const [file, setFile] = useState(null);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleOnChangeContent = (content) => {
    setInputValues({ ...inputValues, content: content });
  };

  const fileHandler = (event) => {
    if (event.target.files[0].size < 2000000) {
      let reader = new FileReader();
      reader.onload = function (e) {
        setFile(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const status = await dispatch(addNewNewsForAdmin(inputValues, file));
    if (status.status === 200) {
      await notification.success({
        message: "T???o b??i vi???t th??nh c??ng!",
        duration: 2.5,
      });
      history.replace("/admin/news");
    } else {
      await notification.success({
        message: "???? x???y ra l???i! Xin vui l??ng th??? l???i sau!",
        duration: 2.5,
      });
    }
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <BackButton />
        <h1>Th??m b??i vi???t</h1>
      </div>
      <Form layout="vertical" method="post" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Ti??u ?????"
              name="title"
              rules={[{ required: true, message: "Vui l??ng nh???p ti??u ?????" }]}
            >
              <Input name="title" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="T??m t???t n???i dung"
              name="shortContent"
              rules={[
                { required: true, message: "Vui l??ng nh???p n???i dung ng???n" },
              ]}
            >
              <TextArea name="shortContent" onChange={handleOnChange} />
            </Form.Item>

            <Form.Item
              label="???nh b??a"
              name="image_cover"
              rules={[{ required: true, message: "Vui l??ng ch???n ???nh b??a" }]}
            >
              <div>
                <img src={file} alt={""} />
                <br />
                <input type="file" onChange={fileHandler} />
              </div>
            </Form.Item>

            <Form.Item label="Tr???ng th??i" name="isPublic">
              <Radio.Group
                name="isPublic"
                defaultValue={true}
                onChange={handleOnChange}
              >
                <Radio value={true}>????ng c??ng khai</Radio>
                <Radio value={false}>L??u t???m th???i</Radio>
              </Radio.Group>
            </Form.Item>
            <ReactQuill
              onChange={handleOnChangeContent}
              modules={AddNews.modules}
              formats={AddNews.formats}
              placeholder="Nh???p n???i dung"
            />
            <br />
          </Col>
        </Row>
        <div className="add_cancel">
          <Space>
            <Button className="cancel_button" onClick={goBack}>
              H???y
            </Button>
            <Button className="add_button" htmlType="submit" type="primary">
              Th??m b??i vi???t
            </Button>
          </Space>
        </div>
      </Form>
    </Wrapper>
  );
};

AddNews.modules = {
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
    [{ "align": null }, { "align": "center" }, { "align": "right" }, { "align": "justify" }]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

AddNews.formats = [
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
  "align"
];

export default AddNews;
