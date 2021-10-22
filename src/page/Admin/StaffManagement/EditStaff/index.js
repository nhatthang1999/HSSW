import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
// import {
//   editStaffForAdmin,
//   getStaffDetailForAdmin,
// } from "../../../../reducers/StaffManagement";
import { Form, Input, Button, Col, Row, Radio, Space, Spin } from "antd";
import _ from "lodash";
import { LoadingOutlined } from "@ant-design/icons";
import BackButton from "../../../../component/BackButton";
import {
  editStaffForAdmin,
  getStaffDetailForAdmin,
} from "../../../../reducers/adminManagement/StaffManagement";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* color: #3483eb; */
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
  textarea {
    resize: none;
  }
  .edit_area {
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

// const Status = styled.h2`
//   color: ${(props) => (props.status === "Active" ? "#83CE91" : "#d7101c")};
// `;

const EditStaff = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(getStaffDetailForAdmin(id));
      form.setFieldsValue(response);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const staffDetail = useSelector((state) =>
    state.staffManagement.staffDetail ? state.staffManagement.staffDetail : {}
  );

  const [inputValues, setInputValues] = useState({});

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const goBack = () => {
    history.goBack();
  };

  const handleSubmit = async () => {
    let objectSync = _.cloneDeep(staffDetail);
    let inputKeys = _.keysIn(objectSync);
    inputKeys.forEach((item) => {
      if (!_.isEmpty(_.get(inputValues, `${item}`))) {
        objectSync = {
          ...objectSync,
          [item]: _.get(inputValues, `${item}`),
        };
      }
    });
    const response = await dispatch(editStaffForAdmin(objectSync));
    if (response.status === 200) history.replace(`/admin/staff/${id}`);
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <BackButton />
        <h1>Sửa thông tin cá nhân</h1>
      </div>
      <Spin
        spinning={loading}
        tip="Vui lòng đợi..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <Form
          layout="vertical"
          form={form}
          method="post"
          onFinish={handleSubmit}
        >
          <Row gutter={32}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Họ và tên"
                name="full_name"
                rules={[
                  { required: true, message: "Vui lòng điền họ và tên!" },
                ]}
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
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Giới tính "
                name="sex"
                rules={[
                  { required: true, message: "Vui lòng chọn giới tính!" },
                ]}
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
          <div className="edit_area">
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
      </Spin>
    </Wrapper>
  );
};

export default EditStaff;
