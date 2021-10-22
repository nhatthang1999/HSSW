import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import _ from "lodash";
import {
  Form,
  Input,
  Button,
  Radio,
  Space,
  Col,
  Row,
  Select,
  Spin,
  notification,
} from "antd";
import { NavLink, useLocation, useParams } from "react-router-dom";
import ConfirmModal from "../../../../component/ConfirmModal";
import BackButton from "../../../../component/BackButton";
import { LoadingOutlined } from "@ant-design/icons";
import {
  activeDoctorForAdmin,
  getDetailOfDoctor,
} from "../../../../reducers/adminManagement/DoctorManagement";

const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
  .status {
    display: flex;
    font-size: 22px;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    h3,
    h2 {
      margin-bottom: 0;
    }
  }
  textarea {
    resize: none;
  }
  .edit_deactive {
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
      /* background: #ff0000; */
      /* color: #fff; */
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
  @media only screen and (max-width: 575px) {
    .flex_row {
      flex-direction: column !important;
      align-items: flex-end !important;
    }
  }
`;

const Status = styled.h2`
  color: ${(props) => (props.status === "Active" ? "#83CE91" : "#d7101c")};
`;

const DoctorDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const [doctorDetail, setDoctorDetail] = useState({});
  const [isPublic, setIsPublic] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(getDetailOfDoctor(id));
      setIsPublic(response.is_public);
      setDoctorDetail(response);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const specialtyGroupByAcademic = useSelector((state) =>
    state.doctorManagement.specialtyGroupByAcademic
      ? state.doctorManagement.specialtyGroupByAcademic
      : []
  );
  const faculties = useSelector((state) =>
    state.doctorManagement.faculty ? state.doctorManagement.faculty : []
  );
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [modalShowActive, setModalShowActive] = useState(false);

  const callbackFunctionActive = async () => {
    const response = await dispatch(activeDoctorForAdmin(id));
    if (response.status === 200) {
      const res = await dispatch(getDetailOfDoctor(id));
      if (doctorDetail.status === "Active")
        await notification.warning({
          message: "Đã cho phép bác sĩ này ngưng làm việc",
          duration: 2.5,
        });
      else
        await notification.success({
          message: "Đã cho phép bác sĩ này tiếp tục làm việc!",
          duration: 2.5,
        });
      setDoctorDetail(res);
    } else
      await notification.error({
        message: "Đã xảy ra lỗi! Xin vui lòng thử lại sau!",
        duration: 2.5,
      });
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <BackButton />
        <h1>Thông tin cá nhân</h1>
      </div>
      <Spin
        spinning={loading}
        tip="Vui lòng đợi..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <Row gutter={16} style={{ marginBottom: "14px" }}>
          <Col span={8}>
            <img
              className="img_container"
              src={doctorDetail.image}
              alt=""
              width="130px"
              height="130px"
            />
          </Col>
          <Col span={16}>
            <div className="status">
              <Space className="flex_row">
                <h3>Trạng thái:</h3>
                {doctorDetail.status === "Active" ? (
                  <Status status="Active">Đang làm việc</Status>
                ) : (
                  <Status status="Deactive">Ngưng làm việc</Status>
                )}
              </Space>
            </div>
          </Col>
        </Row>
        <Form layout="vertical">
          <Row gutter={32}>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item label="Họ và tên">
                <Input disabled={true} value={doctorDetail.full_name} />
              </Form.Item>
              <Form.Item label="Tài khoản">
                <Input disabled={true} value={doctorDetail.account} />
              </Form.Item>
              <Form.Item label="Email">
                <Input disabled={true} value={doctorDetail.email} />
              </Form.Item>
              <Form.Item label="Số điện thoại">
                <Input disabled={true} value={doctorDetail.phone} />
              </Form.Item>
              <Form.Item label="Khoa">
                <Select
                  value={
                    !_.isEmpty(doctorDetail) &&
                    doctorDetail.faculty.faculty_name
                  }
                  className="faculty_dropdown"
                  disabled={true}
                >
                  {faculties.map((faculty, key) => (
                    <Option key={key} value={faculty.faculty_name}>
                      {faculty.faculty_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {specialtyGroupByAcademic.map((group, key) => {
                return (
                  <Form.Item label={group.academic_name} key={key}>
                    <Radio.Group
                      disabled={true}
                      value={_.get(doctorDetail, `list_specialty_id[${key}]`)}
                    >
                      <Space direction="vertical">
                        {group.list_specialty_response.map((item) => {
                          return (
                            <Radio
                              value={item.specialty_id}
                              key={item.specialty_id}
                            >
                              {item.specialty_name}
                            </Radio>
                          );
                        })}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                );
              })}
              <Form.Item label="Vị trí">
                <Input disabled={true} value={doctorDetail.position} />
              </Form.Item>
              <Form.Item label="Giá">
                <Input disabled={true} value={doctorDetail.price} />
              </Form.Item>
              <Form.Item label="Trạng thái hiển thị">
                <Radio.Group disabled={true} value={isPublic}>
                  <Space direction="horizontal">
                    <Radio value={true}>Hiển thị</Radio>
                    <Radio value={false}>Không hiển thị</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item label="Giới thiệu">
                <Input.TextArea
                  disabled={true}
                  value={doctorDetail.about}
                  rows={6}
                />
              </Form.Item>
              <Form.Item label="Kinh nghiệm">
                <Input.TextArea
                  disabled={true}
                  value={doctorDetail.experience}
                  rows={6}
                />
              </Form.Item>
              <Form.Item label="Giải thưởng">
                <Input.TextArea
                  disabled={true}
                  value={doctorDetail.awards}
                  rows={7}
                />
              </Form.Item>
              <Form.Item label="Quá trình đào tạo">
                <Input.TextArea
                  disabled={true}
                  value={doctorDetail.training_process}
                  rows={6}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
      <div className="edit_deactive">
        <Space>
          {doctorDetail.status === "Active" ? (
            <Button
              onClick={() => {
                setModalShowDelete(true);
              }}
              className="deactive_button"
            >
              Ngưng làm việc
            </Button>
          ) : (
            <Button
              onClick={() => {
                setModalShowActive(true);
              }}
              className="active_button"
            >
              Tiếp tục làm việc
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
        title="Xác nhận bác sĩ ngưng làm việc"
        modalText="Bạn có chắc chắn ngưng làm việc bác sĩ này không?"
        callBack={callbackFunctionActive}
      />
      <ConfirmModal
        visible={modalShowActive}
        onHide={() => setModalShowActive(false)}
        title="Xác nhận bác sĩ tiếp tục làm việc"
        modalText="Bạn có chắc chắn cho bác sĩ này tiếp tục làm việc không?"
        callBack={callbackFunctionActive}
      />
    </Wrapper>
  );
};

export default DoctorDetail;
