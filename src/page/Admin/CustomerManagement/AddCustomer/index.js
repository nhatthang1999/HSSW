import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { Form, Input, Button, Radio, Space, Col, Row, DatePicker } from "antd";
import BackButton from "../../../../component/BackButton";
import { addNewCustomerForAdmin } from "../../../../reducers/adminManagement/CustomerManagement";
//
// import _ from "lodash";
const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  /* color: #3483eb; */
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
  .ant-picker {
    width: 100%;
    border-radius: 5px;
  }
  textarea {
    resize: none;
  }
  .add_cancel {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .add_button {
      background: #1890ff;
      color: #ffffff;
      border-radius: 5px;
    }
    .cancel_button {
      border-radius: 5px;
      width: 140px;
      /* background: #ff0000;
      color: #fff; */
    }
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    padding-bottom: 20px;
    color: #286ba6;
    margin-bottom: 0;
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

const AddCustomer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputValues, setInputValues] = useState({
    password: "A123@123a",
    comfirm_password: "A123@123a",
    medicalHistory: "",
    blood: "",
    address: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit = async () => {
    const response = await dispatch(addNewCustomerForAdmin(inputValues));
    if (response.status === 200) history.replace("/admin/customer");
  };
  const handleDateChange = (date) => {
    setInputValues({
      ...inputValues,
      birth_day: moment(date).format("DD/MM/YYYY"),
    });
  };

  const goBack = () => {
    history.goBack();
  };
  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      {/* <Row gutter={16}>
        <Col span={8}>
          <img
            className="img_container"
            src={ customerDetail.avatar}
            alt=""
            width="100px"
            height="100px"
          />
        </Col>
        <Col span={16}> */}
      <div className="header">
        <BackButton />
        <h1>Thêm khách hàng</h1>
      </div>
      {/* </Col>
      </Row> */}
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
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng điền Số điện thoại!" },
              ]}
            >
              <Input name="phone" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birth_day"
              rules={[{ required: true, message: "Vui lòng điền ngày sinh!" }]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                name="birth_day"
                disabledDate={(current) => {
                  return current && current > moment().endOf("day");
                }}
                onChange={handleDateChange}
              />
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
            <Form.Item label="Địa chỉ" name="address">
              <Input name="address" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="Số căn cước công dân"
              name="cccd"
              rules={[
                { required: true, message: "Vui lòng điền căn cước công dân!" },
              ]}
            >
              <Input name="cccd" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item label="Nhóm máu" name="blood">
              <Input name="blood" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item label="Tiền sử bệnh án" name="medicalHistory">
              <Input.TextArea
                name="medicalHistory"
                rows={4}
                onChange={handleOnChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="add_cancel">
          <Space>
            <Button className="cancel_button" onClick={goBack}>
              Hủy
            </Button>
            <Button className="add_button" htmlType="submit">
              Thêm khách hàng
            </Button>
          </Space>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddCustomer;
