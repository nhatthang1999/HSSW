import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  useDispatch,
  // useSelector
} from "react-redux";
import background from "../../../assets/image/13.jpg";
import { Form, Button, notification } from "antd";
import { useLocation } from "react-router";
import { verifyAccount } from "../../../reducers/Register";

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
        text-align: center;
        color: #286ba6;

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
          text-align: center;
          color: #286ba6;
          text-transform: capitalize;
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

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [paramVerify, setParamVerify] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setParamVerify({
        email: params.email,
        register_email_token: params.token,
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    try {
      setConfirmLoading(true);
      const response = await dispatch(verifyAccount(paramVerify));
      if (response.status === 200) {
        setConfirmLoading(false);
        await notification.success({
          message: "Xác thực tài khoản thành công!",
          description: "Bạn sẽ được điều hướng về trang đăng nhập!",
          duration: 2.5,
          onClose: () => history.replace(`/login`),
        });
      } else {
        setConfirmLoading(false);
        await notification.error({
          message: "Xác thực không thành công!",
          description: `${response.message}`,
          duration: 2.5,
        });
      }
    } catch (error) {}
  };

  return (
    <Wrapper>
      <div className="overlay">
        <div className="login_container">
          <div className="w_left"></div>
          <div className="w_right">
            <div className="bl-content">
              <div className="login_header">
                <h1>Xác thực tài khoản</h1>
              </div>
              <Form
                className="form_login"
                method="post"
                onFinish={handleSubmit}
              >
                <div className="btn_login">
                  <Button
                    htmlType="submit"
                    className="loading_button"
                    loading={confirmLoading}
                  >
                    Xác minh tài khoản
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default VerifyEmail;
