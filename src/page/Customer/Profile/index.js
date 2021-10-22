import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { editProfileUser, getProfile } from "../../../reducers/Customer";
import {
  Form,
  Button,
  Col,
  Descriptions,
  Input,
  Row,
  Spin,
  notification,
} from "antd";
import moment from "moment";
import { EditOutlined } from "@ant-design/icons";
import { checkObjectSearch } from "../../../common";

const Wrapper = styled.div`
  width: 100%;
  background-color: #f1f9ff;

  padding: 30px 100px 50px;
  min-height: 100vh;
  .save_cancel {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .edit_button {
      border-radius: 5px;
    }
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 0;
    padding-bottom: 20px;
    color: #286ba6;
  }
  label {
    font-weight: 600;
  }
  .ant-input {
    border-radius: 5px;
  }
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 55px;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 5px;
  }
  .ant-picker {
    border-radius: 5px;
    width: 100%;
  }
  .info_container {
    border: 1px solid hsla(0, 0%, 100%, 0);
    clear: both;
    padding: 20px;
    position: relative;
    transition: box-shadow 0.2s, border 0.1s;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 10px;
    box-shadow: 4px 8px 20px rgb(0 0 0 / 5%);
    background: #ffffff;
  }

  .ant-descriptions-bordered .ant-descriptions-view {
    border: 1px solid #f0f0f0;
    border-radius: 5px;
  }
  .input_borderless {
    .ant-input {
      padding: 0 !important;
      border: none !important;
    }
    &,
    .ant-input-affix-wrapper {
      padding: 0 !important;
      border: none !important;
    }
  }
  .ant-form-item-control-input {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 22px;
  }
  .ant-form-item {
    margin-bottom: 0 !important;
  }
  @media (max-width: 1200px) {
    padding: 30px 70px;
  }
  @media (max-width: 992px) {
    padding: 30px 50px;
  }
  @media (max-width: 767px) {
    padding: 30px 40px;
    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 576px) {
    padding: 30px 25px;
  }
`;

const CustomerProfile = () => {
  //   const location = useLocation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(getProfile());
      setProfile(response);
      let data = {
        ...response,
        birth_day: moment(response.birth_day, "DD/MM/YYYY"),
      };
      form.setFieldsValue(data);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [inputValues, setInputValues] = useState({});

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    const objectSync = { ...profile, ...inputValues };
    const response = await dispatch(editProfileUser(objectSync));
    if (response.status === 200) {
      await notification.success({
        message: "Cập nhật thông tin thành công!",
        duration: 2.5,
      });
      setLoading(false);
    } else {
      await notification.error({
        message: "Vui lòng kiểm tra lại thông tin!",
        description: response.message,
        duration: 2.5,
      });
      setLoading(false);
    }
    setInputValues({});
  };
  return (
    <Wrapper>
      <Spin tip="Vui lòng đợi..." spinning={loading}>
        <div className="header">
          <h1>Thông tin cá nhân</h1>
        </div>
        <Form form={form} onFinish={handleSubmit}>
          <Row className="flex justify-center">
            <Col xxl={12} lg={18} md={24} sm={24} xs={24}>
              <Row className="flex justify-center info_container">
                <Col span={24}>
                  <Descriptions
                    bordered
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                  >
                    <Descriptions.Item label="Họ và tên">
                      {profile?.full_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tài khoản">
                      {profile?.username}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      {profile?.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                      <Form.Item name="phone">
                        <Input
                          className="input_borderless"
                          name="phone"
                          onChange={handleOnChange}
                          suffix={
                            <EditOutlined
                              style={{ color: "rgba(0,0,0,.45)" }}
                            />
                          }
                        />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh">
                      {profile?.birth_day}
                    </Descriptions.Item>
                    <Descriptions.Item label="Giới tính">
                      {profile?.sex ? "Nam" : "Nữ"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">
                      <Form.Item name="address">
                        <Input
                          className="input_borderless"
                          name="address"
                          onChange={handleOnChange}
                          suffix={
                            <EditOutlined
                              style={{ color: "rgba(0,0,0,.45)" }}
                            />
                          }
                        />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Số căn cước công dân">
                      {profile?.cccd}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nhóm máu">
                      <Form.Item name="blood">
                        <Input
                          className="input_borderless"
                          name="blood"
                          onChange={handleOnChange}
                          suffix={
                            <EditOutlined
                              style={{ color: "rgba(0,0,0,.45)" }}
                            />
                          }
                        />
                      </Form.Item>
                    </Descriptions.Item>
                    <Descriptions.Item label="Tiền sử bệnh án">
                      <Form.Item name="medicalHistory">
                        <Input
                          className="input_borderless"
                          name="medicalHistory"
                          onChange={handleOnChange}
                          suffix={
                            <EditOutlined
                              style={{ color: "rgba(0,0,0,.45)" }}
                            />
                          }
                        />
                      </Form.Item>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col span={24}>
                  <div className="save_cancel">
                    <Button
                      className="edit_button"
                      htmlType="submit"
                      disabled={checkObjectSearch(inputValues)}
                    >
                      Sửa thông tin
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Wrapper>
  );
};

export default CustomerProfile;
