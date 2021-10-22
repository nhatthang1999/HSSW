import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Space,
  notification,
  Radio,
  Spin,
} from "antd";
import BackButton from "../../../../component/BackButton";
import ConfirmModal from "../../../../component/ConfirmModal";
import { LoadingOutlined } from "@ant-design/icons";
import {
  activeStaffForAdmin,
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
    margin-bottom: 50px;
    .edit_button {
      background: #1890ff;
      color: #ffffff;
      border-radius: 5px;
      width: 140px;
    }
    .deactive_button {
      border-radius: 5px;
      /* background: #ff0000;
      color: #fff; */
      width: 140px;
    }
    .active_button {
      /* background: #2eb82e; */
      border-radius: 5px;
      /* color: #ffffff; */
      width: 140px;
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
  .status {
    display: flex;
    font-size: 22px;
    justify-content: flex-end;
    align-items: center;
    /* width: 100%;
    height: 100%; */
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
`;

const Status = styled.h2`
  color: ${(props) => (props.status === "Active" ? "#83CE91" : "#d7101c")};
`;

const StaffDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getStaffDetailForAdmin(id));
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const staffDetail = useSelector((state) =>
    state.staffManagement.staffDetail ? state.staffManagement.staffDetail : {}
  );

  const [modalShowActive, setModalShowActive] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);

  const callbackFunctionActive = async () => {
    const response = await dispatch(activeStaffForAdmin(id));
    await dispatch(getStaffDetailForAdmin(id));
    if (response.status === 200) {
      if (staffDetail.status === "Inactive")
        await notification.success({
          message: "Đã cho phép nhân viên này tiếp tục làm việc!",
          duration: 2.5,
        });
      else
        await notification.warning({
          message: "Đã cho phép nhân viên này ngưng làm việc!",
          duration: 2.5,
        });
    } else
      await notification.error({
        message: "Đã xảy ra lỗi! Xin vui lòng thử lại sau!",
        duration: 2.5,
      });
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      {/* <Row gutter={16}>
        <Col span={8}>
          <img
            className="img_container"
            // src={ staffDetail.avatar}
            alt=""
            width="130px"
            height="130px"
          />
        </Col>
        <Col span={16}> */}
      <div className="header">
        <BackButton />
        <h1>Thông tin cá nhân</h1>
      </div>
      <div className="status">
        <Space>
          <h3>Trạng thái:</h3>
          {staffDetail.status === "Inactive" ? (
            <Status status="Deactive">Ngưng làm việc</Status>
          ) : (
            <Status status="Active">Đang làm việc</Status>
          )}
        </Space>
      </div>
      {/* </Col>
      </Row> */}
      <Spin
        spinning={loading}
        tip="Vui lòng đợi..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <Form layout="vertical">
          <Row gutter={32}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="Họ và tên">
                <Input disabled={true} value={staffDetail.full_name} />
              </Form.Item>
              <Form.Item label="Tài khoản">
                <Input disabled={true} value={staffDetail.username} />
              </Form.Item>
              <Form.Item label="Email">
                <Input disabled={true} value={staffDetail.email} />
              </Form.Item>
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="Giới tính">
                <Radio.Group disabled={true} value={staffDetail.sex}>
                  <Space>
                    <Radio value={true}>Nam</Radio>
                    <Radio value={false}>Nữ</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Số điện thoại">
                <Input disabled={true} value={staffDetail.phone} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
      <div className="edit_area">
        <Space>
          {staffDetail.status === "Inactive" ? (
            <Button
              onClick={() => {
                setModalShowActive(true);
              }}
              className="active_button"
            >
              Tiếp tục làm việc
            </Button>
          ) : (
            <Button
              onClick={() => {
                setModalShowDelete(true);
              }}
              className="deactive_button"
            >
              Ngưng làm việc
            </Button>
          )}
          <NavLink to={`${location.pathname}/edit`} replace>
            <Button className="edit_button">Sửa thông tin</Button>
          </NavLink>
        </Space>
      </div>

      <ConfirmModal
        visible={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
        title="Xác nhận nhân viên ngưng làm việc"
        modalText="Bạn có chắc chắn ngưng làm việc nhân viên này không?"
        callBack={callbackFunctionActive}
      />
      <ConfirmModal
        visible={modalShowActive}
        onHide={() => setModalShowActive(false)}
        title="Xác nhận nhân viên tiếp tục làm việc"
        modalText="Bạn có chắc chắn cho nhân viên này tiếp tục làm việc không?"
        callBack={callbackFunctionActive}
      />
    </Wrapper>
  );
};

export default StaffDetail;
