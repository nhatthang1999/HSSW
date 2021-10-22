import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Form, Input, Button, notification, Result } from "antd";
import background from "../../../assets/image/13.jpg";
import { useLocation } from "react-router-dom";
import {
  changePasswordForgot,
  getUserForget,
} from "../../../reducers/ChangePassword";

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
        text-align: start;
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
          text-align: start;
color: #286ba6;
          text-transform: capitalize;
        }
        .form_login {
          max-width: 400px;
          margin: auto;
          padding: 0px;
          text-align: -webkit-left;
          .input_padding {
            padding: 10px 25px !important;;
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

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [current, setCurrent] = useState(0);
  const location = useLocation();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));
  const [inputValues, setInputValues] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getUserForget(params));
      if (response.status !== 400) {
        setInputValues({ user_id: response.data.data });
        await notification.success({
          message: "Xác thực thành công!",
          description: `Vui lòng nhập mật khẩu muốn đổi`,
          duration: 4.5,
        });
        if (current === 0) {
          setCurrent(current + 1);
        }
      } else {
        await notification.error({
          message: "Xác thực thất bại!",
          description: `Vui lòng kiểm tra lại!`,
          duration: 4.5,
        });
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    setConfirmLoading(true);
    const response = await dispatch(changePasswordForgot(inputValues));
    if (response.message === "success") {
      setConfirmLoading(false);
      await notification.success({
        message: "Đổi mật khẩu thành công!",
        description: "Bạn sẽ được điều hướng về trang đăng nhập!",
        duration: 2.5,
        onClose: () => history.replace(`/login`),
      });
    } else {
      setConfirmLoading(false);
      await notification.error({
        message: "Đã xảy ra lỗi!",
        description: `${response.message}`,
        duration: 2.5,
      });
    }
  };

  const steps = [
    {
      title: "Xác minh tài khoản",
      content: (
        <Result
          status="error"
          title="Xác thực thất bại!"
          subTitle="Vui lòng kiểm tra lại đường dẫn ở trong email!"
          extra={[
            <Button
              type="primary"
              onClick={() => history.replace("/login")}
              style={{ borderRadius: "5px" }}
            >
              Trở về trang đăng nhập
            </Button>,
          ]}
        />
      ),
    },
    {
      title: "Cập nhật mật khẩu",
      content: (
        <div>
          <Form
            // name="basic"
            labelCol={{ span: 24 }}
            layout="vertical"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            className="form_login"
          >
            <Form.Item
              className="align-left"
              label="Mật khẩu mới"
              name="input_password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              ]}
            >
              <Input.Password name="input_password" onChange={handleOnChange} />
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu mới"
              name="confirm_password"
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ]}
            >
              <Input.Password
                name="confirm_password"
                onChange={handleOnChange}
              />
            </Form.Item>

            <div className="btn_login">
              <Button
                type="primary"
                htmlType="submit"
                style={{ borderRadius: "5px" }}
                className="loading_button"
                loading={confirmLoading}
              >
                Cập nhật mật khẩu
              </Button>
            </div>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
      <div className="overlay">
        <div className="login_container">
          <div className="w_left"></div>
          <div className="w_right">
            <div className="bl-content">
              <div className="login_header">
                <h1>Cập nhật mật khẩu</h1>
              </div>
              <div>
                <div className="steps-content">{steps[current].content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UpdatePassword;
