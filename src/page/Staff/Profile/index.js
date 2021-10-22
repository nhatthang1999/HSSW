import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getProfileStaff } from "../../../reducers/Staff/Profile";
import { Form, Input, Radio, Space, Col, Row } from "antd";
// import moment from "moment";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* color: #3483eb; */
  padding: 30px 50px 100px;
  .ant-picker {
    width: 100%;
  }
  textarea {
    resize: none;
  }
  h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  .edit_area {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    .edit_button {
      background: #6d88fa;
      color: #ffffff;
      border-radius: 8px;
    }
  }
`;

const StaffProfile = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getProfileStaff());
      form.setFieldsValue(response);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <h1>Thông tin cá nhân</h1>
      </div>
      <Form layout="vertical" form={form}>
        <Row gutter={32}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item label="Họ và tên" name="full_name">
              <Input disabled={true} name="full_name" />
            </Form.Item>
            <Form.Item label="Tài khoản" name="username">
              <Input disabled={true} name="username" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled={true} name="email" />
            </Form.Item>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item label="Giới tính" name="sex">
              <Radio.Group disabled={true} name="sex">
                <Space>
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone">
              <Input disabled={true} name="phone" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default StaffProfile;
