import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  notification,
  Row,
  Col,
  DatePicker,
  Space,
  Radio,
} from "antd";
import background from "../../../assets/image/13.jpg";
import BackButton from "../../../component/BackButton";
import moment from "moment";
import { registerAccountByCustomer } from "../../../reducers/Register";
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;

  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .overlay {
    width: 100%;
    height: 100%;
    padding: 80px;
    overflow: auto;
    .login_container {
      max-width: 1000px;
      width: 100%;
      height: 100%;
      display: grid;
      margin-left: auto;
      margin-right: 130px;
      justify-content: space-between;
      align-items: center;
      grid-template-columns: auto 1fr;
      .bl-content {
        flex: 1 1 0%;
        width: 100%;
        max-width: 700px;
        max-height: calc(100vh - 160px);
        border-radius: 5px;
        background-color: rgb(255, 255, 255);
        margin-left: auto;
        // overflow: auto;
        padding: 35px 50px;

        .login_header {
          display: block;
          margin: 15px auto 30px;
          font-size: 25px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1.52;
          letter-spacing: normal;
          color: rgb(0, 0, 0);
          text-transform: capitalize;
          text-align: center;
          color: #286ba6;
        }
        .form_login {
          padding: 0px;
          .ant-input-affix-wrapper {
            border-radius: 5px !important;
            .ant-input {
              padding: 0 !important;
              border: none !important;
            }
          }
          .ant-form-item-children-icon {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .ant-picker {
            width: 100%;
            border-radius: 5px;
          }
          .btn_login {
            margin-top: 16px;
            margin-bottom: 16px;
            .loading_button {
              position: relative;
              overflow: hidden;
              width: 100%;
              color: #ffffff;
              padding: 12px 40px;
              background: #0f76c4;
              height: 50px;
              border-radius: 5px;
              &:hover {
                background: #ffffff;
                color: #0f76c4;
              }
            }
          }
          .sign_up > a {
            color: rgb(33, 37, 41);
            font-size: 16px;
            font-weight: 600;

            &:hover {
              text-decoration: underline;
            }
          }
          .sign_up {
            text-align: center;
            color: #286ba6;
          }
        }
      }
    }
  }
  .back_button {
    position: absolute;
    top: 40px;
    left: 62px;
  }
  @media only screen and (max-width: 920px) {
    .login_container .bl-content {
      margin: auto auto 70px;
      max-height: initial !important;
      position: relative;
      z-index: 10;
      overflow: auto;
    }
    .overlay {
      padding: 90px 20px;
    }
    .back_button {
      top: 30px;
      left: 20px;
    }
  }
  @media only screen and (max-width: 1366px) {
    .login_container .bl-content {
      margin: auto auto 70px;
      max-height: initial !important;
      position: relative;
      z-index: 10;
      overflow: auto;
    }
    .overlay {
      padding: 90px 20px;
    }
    .back_button {
      top: 30px;
      left: 20px;
    }
  }
  @media only screen and (max-width: 520px) {
    .login_container .bl-content {
      padding: 35px 20px !important;
    }
  }
  @media only screen and (min-width: 1366px) and (max-width: 1900px) {
    .login_container .bl-content {
      margin: auto auto 70px;
      max-height: initial !important;
      position: relative;
      z-index: 10;
      overflow: auto;
    }
    .overlay {
      padding: 90px 20px;
    }
    .back_button {
      top: 30px;
      left: 20px;
    }
  }
`;

const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    medicalHistory: "",
    blood: "",
    address: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleDateChange = (date) => {
    setInputValues({
      ...inputValues,
      birth_day: moment(date).format("DD/MM/YYYY"),
    });
  };

  const handleSubmit = async () => {
    try {
      setConfirmLoading(true);
      const response = await dispatch(registerAccountByCustomer(inputValues));
      setConfirmLoading(false);
      if (response.status === 200) {
        await notification.success({
          message: "Đăng ký thành công!",
          description:
            "Bạn sẽ được điều hướng về trang đăng nhập. Vui lòng kiểm tra email của bạn để xác nhận tài khoản!",
          duration: 2.5,
          onClose: () => history.replace(`/login`),
        });
      } else {
        await notification.error({
          message: "Đăng ký không thành công!",
          description: `${response.message}`,
          duration: 2.5,
        });
      }
    } catch (error) {}
  };

  return (
    <Wrapper>
      <BackButton />
      <div className="overlay">
        <div className="login_container">
          <div className="w_left" />
          <div className="w_right">
            <div className="bl-content">
              <div className="login_header">
                <h1>Đăng ký</h1>
              </div>
              <Form
                layout="vertical"
                className="form_login"
                method="post"
                onFinish={handleSubmit}
              >
                <Row gutter={16}>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      label="Họ và tên"
                      name="full_name"
                      rules={[
                        { required: true, message: "Vui lòng điền họ và tên!" },
                      ]}
                    >
                      <Input name="full_name" onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item
                      label="Tài khoản"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền tài khoản!",
                        },
                      ]}
                      tooltip="Tài khoản phải có độ dài từ 8-32 ký tự,không viết hoa, có thể có dấu '_'"
                    >
                      <Input name="username" onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền mật khẩu!",
                        },
                      ]}
                      tooltip="Mật khẩu phải chứa ít nhất 1 ký tự viết hoa, 1 ký tự đặc biệt và 1 số và có độ dài 8-32 ký tự"
                      hasFeedback
                    >
                      <Input.Password
                        name="password"
                        onChange={handleOnChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Xác nhận mật khẩu"
                      name="comfirm_password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng xác nhận mật khẩu!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "Mật khẩu xác nhận phải giống với mật khẩu mới!"
                              )
                            );
                          },
                        }),
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        name="comfirm_password"
                        onChange={handleOnChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Địa chỉ email"
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "Vui lòng điền đúng định dạng Email!",
                        },
                        {
                          required: true,
                          message: "Vui lòng điền địa chỉ Email!",
                        },
                      ]}
                    >
                      <Input
                        name="email"
                        placeholder="Ví dụ: example@abc.def"
                        onChange={handleOnChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                      tooltip="Số điện thoại bắt đầu bằng 03, 05, 07, 08, 09 và phải có 8 số sau nó"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng điền Số điện thoại!",
                        },
                      ]}
                    >
                      <Input name="phone" onChange={handleOnChange} />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      label="Ngày sinh"
                      name="birth_day"
                      rules={[
                        {
                          required: true,
                          message: " Vui lòng điền hoặc chọn ngày sinh!",
                        },
                      ]}
                    >
                      <DatePicker
                        format="DD/MM/YYYY"
                        name="birth_day"
                        disabledDate={(current) => {
                          return current && current > moment().endOf("day");
                        }}
                        placeholder="DD/MM/YYYY"
                        onChange={handleDateChange}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Giới tính "
                      name="sex"
                      rules={[
                        {
                          required: true,
                          message: " Vui lòng chọn giới tính!",
                        },
                      ]}
                    >
                      <Radio.Group
                        name="sex"
                        placeholder="Giới tính"
                        onChange={handleOnChange}
                      >
                        <Space>
                          <Radio value={true}>Nam</Radio>
                          <Radio value={false}>Nữ</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      label="Số căn cước công dân"
                      name="cccd"
                      rules={[
                        {
                          required: true,
                          message: " Vui lòng điền số căn cước công dân!",
                        },
                      ]}
                      tooltip="Số căn cước công dân không chứa các ký tự chữ và số, ký tự đặc biệt hoặc khác 12 ký tự số"
                    >
                      <Input name="cccd" onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="address">
                      <Input name="address" onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item label="Nhóm máu" name="blood">
                      <Input name="blood" onChange={handleOnChange} />
                    </Form.Item>
                    <Form.Item label="Tiền sử bệnh án" name="medicalHistory">
                      <Input name="medicalHistory" onChange={handleOnChange} />
                    </Form.Item>
                  </Col>
                </Row>

                <div className="btn_login">
                  <Button
                    htmlType="submit"
                    className="loading_button"
                    loading={confirmLoading}
                  >
                    Đăng Ký
                  </Button>
                </div>
                <div className="sign_up">
                  Đã có tài khoản?
                  <NavLink to="/login"> Đăng nhập </NavLink>
                </div>
                <div className="sign_up">
                  <NavLink to="/"> Trở về trang chủ </NavLink>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
