// import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  Form,
  Input,
  Button,
  Radio,
  Space,
  Col,
  Row,
  DatePicker,
  Spin,
} from "antd";
import moment from "moment";
import BackButton from "../../../../component/BackButton";
import { LoadingOutlined } from "@ant-design/icons";
import { getCustomerDetailForAdmin } from "../../../../reducers/adminManagement/CustomerManagement";

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
  .edit_area {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-bottom: 50px;
    .edit_button {
      background: #1890ff;
      color: #ffffff;
      border-radius: 5px;
      width: 150px;
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
  label {
    font-weight: 600;
  }
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  .ant-input[disabled] {
    color: #6b7280;
    border-radius: 5px;
  }
  .ant-select-disabled.ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    color: #6b7280;
    border-radius: 5px;
  }
  .ant-radio-disabled + span {
    color: #6b7280;
  }
  .ant-form-item {
    margin-bottom: 14px;
  }
  .ant-picker-input > input[disabled] {
    color: rgba(0, 0, 0, 0.85);
  }
`;

const CustomerDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getCustomerDetailForAdmin(id));
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customerDetail = useSelector((state) =>
    state.customerManagement.customerDetail
      ? state.customerManagement.customerDetail
      : {}
  );

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <BackButton />
        <h1>Th??ng tin c?? nh??n</h1>
      </div>
      <Spin
        spinning={loading}
        tip="Vui l??ng ?????i..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <Form layout="vertical">
          <Row gutter={32}>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item label="H??? v?? t??n">
                <Input disabled={true} value={customerDetail.full_name} />
              </Form.Item>
              <Form.Item label="T??i kho???n">
                <Input disabled={true} value={customerDetail.username} />
              </Form.Item>
              <Form.Item label="Email">
                <Input disabled={true} value={customerDetail.email} />
              </Form.Item>
              <Form.Item label="S??? ??i???n tho???i">
                <Input disabled={true} value={customerDetail.phone} />
              </Form.Item>
              <Form.Item label="Ng??y sinh">
                <DatePicker
                  disabled={true}
                  format="DD/MM/YYYY"
                  value={moment(customerDetail.birth_day, "DD/MM/YYYY")}
                />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item label="Gi???i t??nh">
                <Radio.Group disabled={true} value={customerDetail.sex}>
                  <Space>
                    <Radio value={true}>Nam</Radio>
                    <Radio value={false}>N???</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="?????a ch???">
                <Input disabled={true} value={customerDetail.address} />
              </Form.Item>
              <Form.Item label="S??? c??n c?????c c??ng d??n">
                <Input disabled={true} value={customerDetail.cccd} />
              </Form.Item>
              <Form.Item label="Nh??m m??u">
                <Input disabled={true} value={customerDetail.blood} />
              </Form.Item>
              <Form.Item label="Ti???n s??? b???nh ??n">
                <Input.TextArea
                  disabled={true}
                  value={customerDetail.medicalHistory}
                  rows={4}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
      <div className="edit_area">
        <NavLink to={`${location.pathname}/edit`} replace>
          <Button className="edit_button">S???a th??ng tin</Button>
        </NavLink>
      </div>
    </Wrapper>
  );
};

export default CustomerDetail;
