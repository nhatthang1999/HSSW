import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
// import { addNewStaffForAdmin } from "../../../../reducers/StaffManagement";
import { Form, Input, Button, Col, Row, Radio, Space } from "antd";
import BackButton from "../../../../component/BackButton";
import { addNewStaffForAdmin } from "../../../../reducers/adminManagement/StaffManagement";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* color: #3483eb; */
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
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
      /* background: #1890ff;
      color: #ffffff; */
      border-radius: 5px;
    }
    .cancel_button {
      border-radius: 5px;
      width: 115px;
      /* background: #ff0000;
      color: #fff; */
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
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  label {
    font-weight: 600;
  }
  .img_container {
    margin-bottom: 20px;
  }
  .ant-input {
    border-radius: 5px;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 5px;
  }
  .ant-form-item {
    margin-bottom: 14px;
  }
`;

const AddStaff = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputValues, setInputValues] = useState({
    password: "A123@123a",
    comfirm_password: "A123@123a",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit = async () => {
    const response = await dispatch(addNewStaffForAdmin(inputValues));
    if (response.status === 200) history.replace("/admin/staff");
  };

  const goBack = () => {
    history.goBack();
  };
  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <BackButton />
        <h1>Thêm nhân viên</h1>
      </div>
      <Form layout="vertical" method="post" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Họ và tên"
              name="full_name"
              rules={[{ required: true, message: "Vui lòng điền họ và tên!" }]}
            >
              <Input name="full_name" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="Tài khoản"
              name="username"
              rules={[
                { required: true, message: "Vui lòng điền tên tài khoản!" },
              ]}
            >
              <Input name="username" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Vui lòng điền đúng định dạng Email!",
                },
                { required: true, message: "Vui lòng điền Email!" },
              ]}
            >
              <Input name="email" onChange={handleOnChange} />
            </Form.Item>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Giới tính "
              name="sex"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            >
              <Radio.Group name="sex" onChange={handleOnChange}>
                <Space>
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng điền Số điện thoại!" },
              ]}
            >
              <Input name="phone" onChange={handleOnChange} />
            </Form.Item>
          </Col>
        </Row>
        <div className="add_cancel">
          <Space>
            <Button className="cancel_button" onClick={goBack}>
              Hủy
            </Button>
            <Button className="add_button" htmlType="submit" type="primary">
              Lưu thông tin
            </Button>
          </Space>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddStaff;
