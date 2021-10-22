import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
// import { useLocation } from "react-router";
import styled from "styled-components";
import { checkLogin } from "../../../reducers/Login";
import { NavLink } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
// import avatar from "../../../assets/image/avatar.jpg";
import background from "../../../assets/image/13.jpg";
// import slogan from "../../../assets/image/vinmec.svg";
import BackButton from "../../../component/BackButton";
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
      margin: auto;
      justify-content: space-between;
      align-items: center;
      grid-template-columns: auto 1fr;
      .bl-content {
        flex: 1 1 0%;
        width: 100%;
        max-width: 450px;
        max-height: calc(100vh - 160px);
        border-radius: 5px;
        background-color: rgb(255, 255, 255);
        margin-left: auto;
        overflow: auto;
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
          max-width: 400px;
          margin: auto;
          padding: 0px;
          .input_padding {
            padding: 10px 25px !important;
            line-height: 33px;
            width: 100%;
            box-sizing: border-box;
            color: rgb(23, 28, 34);
            font-weight: 500;
            font-size: 14px;
            transition: background-color 0.5s ease 0s;
            border: 1px solid rgb(187, 187, 187);
            height: 50px;
            background-color: rgb(255, 255, 255);
            border-radius: 5px !important;
            .ant-input {
              border: none !important;
              padding: 0 !important;
            }
            .ant-input {
              border: none !important;
              padding: 0 !important;
            }
          }
          .forgot_password > a {
            color: rgb(33, 37, 41);
            font-size: 16px;
            font-weight: 600;

            &:hover {
              text-decoration: underline;
            }
          }
          .forgot_password {
            margin-bottom: 30px;
            text-align: center;
            color: #286ba6;
          }
          .btn_login {
            margin-bottom: 30px;
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
`;

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setConfirmLoading(true);
      const response = await dispatch(checkLogin(inputValues));
      setConfirmLoading(false);
      if (response.status === 200) {
        history.replace(`/${response.role}`);
        await notification.success({
          message: "Đăng nhập thành công!",
          description: `Xin chào ${inputValues.username}`,
          duration: 1.5,
        });
      } else {
        await notification.error({
          message: "Đăng nhập không thành công!",
          description: `${response.message}`,
          duration: 2.5,
        });
      }
    } catch (error) {
      await notification.error({
        message: "Đăng nhập không thành công!",
        duration: 2.5,
      });
    }
  };

  return (
    <Wrapper>
      <BackButton />
      <div className="overlay">
        <div className="login_container">
          <div className="w_left"></div>
          <div className="w_right">
            <div className="bl-content">
              <div className="login_header">
                <h1>Đăng nhập</h1>
              </div>
              <Form
                className="form_login"
                method="post"
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền tài khoản đăng nhập!",
                    },
                  ]}
                >
                  <Input
                    name="username"
                    onChange={handleOnChange}
                    placeholder={"Tài khoản đăng nhập"}
                    className="input_padding"
                    autoComplete="false"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng điền mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password
                    name="password"
                    placeholder="Nhập mật khẩu"
                    onChange={handleOnChange}
                    className="input_padding"
                    autoComplete="false"
                  />
                </Form.Item>
                <div className="forgot_password">
                  <NavLink to="/forgetpassword">Quên mật khẩu?</NavLink>
                </div>
                <div className="btn_login">
                  <Button
                    htmlType="submit"
                    className="loading_button"
                    loading={confirmLoading}
                  >
                    Đăng Nhập
                  </Button>
                </div>
                <div className="sign_up">
                  Bạn chưa có tài khoản?
                  <NavLink to="/signup"> Đăng ký </NavLink>
                </div>
                <div className="sign_up">
                  <NavLink to="/">Trở về trang chủ</NavLink>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
