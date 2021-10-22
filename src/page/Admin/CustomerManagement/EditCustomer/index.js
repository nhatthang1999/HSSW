import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import { Form, Input, Button, Radio, Space, Col, Row, DatePicker } from "antd";

import moment from "moment";
import _ from "lodash";
import BackButton from "../../../../component/BackButton";
import {
  editCustomerForAdmin,
  getCustomerDetailForAdmin,
} from "../../../../reducers/adminManagement/CustomerManagement";

const Wrapper = styled.div`
  width: 100%;
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
  .save_cancel {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .save_button {
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
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  label {
    font-weight: 600;
  }
  .ant-input {
    border-radius: 5px;
  }
  .ant-form-item {
    margin-bottom: 14px;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 5px;
  }
  @media only screen and (max-width: 424px) {
    .back_button {
      top: 0;
    }
  }
`;

const EditCustomer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getCustomerDetailForAdmin(id));
      let data = {
        ...response,
        birth_day: moment(response.birth_day, "DD/MM/YYYY"),
      };
      form.setFieldsValue(data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customerDetail = useSelector((state) =>
    state.customerManagement.customerDetail
      ? state.customerManagement.customerDetail
      : {}
  );

  const [inputValues, setInputValues] = useState({});

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit = async () => {
    let objectSync = _.cloneDeep(customerDetail);
    let inputKeys = _.keysIn(objectSync);
    inputKeys.forEach((item) => {
      if (!_.isEmpty(_.get(inputValues, `${item}`))) {
        objectSync = {
          ...objectSync,
          [item]: _.get(inputValues, `${item}`),
        };
      }
    });
    const response = await dispatch(editCustomerForAdmin(objectSync));
    if (response.status === 200) history.replace(`/admin/customer/${id}`);
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
      <div className="header">
        <BackButton />
        <h1>Sửa thông tin cá nhân</h1>
      </div>
      <Form layout="vertical" method="post" form={form} onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item
              label="Họ và tên"
              name="full_name"
              rules={[{ required: true, message: "Vui lòng điền họ và tên!" }]}
            >
              <Input name="full_name" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item label="Tài khoản" name="username">
              <Input disabled={true} name="username" />
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
            <Form.Item label="Ngày sinh" name="birth_day">
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
            <Form.Item label="Giới tính " name="sex">
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
            <Form.Item label="Số căn cước công dân" name="cccd">
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
        <div className="save_cancel">
          <Space>
            <Button className="cancel_button" onClick={goBack}>
              Hủy
            </Button>
            <Button className="save_button" htmlType="submit" type="primary">
              Lưu thông tin
            </Button>
          </Space>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditCustomer;
