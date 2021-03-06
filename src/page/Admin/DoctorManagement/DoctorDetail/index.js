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
          message: "???? cho ph??p b??c s?? n??y ng??ng l??m vi???c",
          duration: 2.5,
        });
      else
        await notification.success({
          message: "???? cho ph??p b??c s?? n??y ti???p t???c l??m vi???c!",
          duration: 2.5,
        });
      setDoctorDetail(res);
    } else
      await notification.error({
        message: "???? x???y ra l???i! Xin vui l??ng th??? l???i sau!",
        duration: 2.5,
      });
  };

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
                <h3>Tr???ng th??i:</h3>
                {doctorDetail.status === "Active" ? (
                  <Status status="Active">??ang l??m vi???c</Status>
                ) : (
                  <Status status="Deactive">Ng??ng l??m vi???c</Status>
                )}
              </Space>
            </div>
          </Col>
        </Row>
        <Form layout="vertical">
          <Row gutter={32}>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item label="H??? v?? t??n">
                <Input disabled={true} value={doctorDetail.full_name} />
              </Form.Item>
              <Form.Item label="T??i kho???n">
                <Input disabled={true} value={doctorDetail.account} />
              </Form.Item>
              <Form.Item label="Email">
                <Input disabled={true} value={doctorDetail.email} />
              </Form.Item>
              <Form.Item label="S??? ??i???n tho???i">
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
              <Form.Item label="V??? tr??">
                <Input disabled={true} value={doctorDetail.position} />
              </Form.Item>
              <Form.Item label="Gi??">
                <Input disabled={true} value={doctorDetail.price} />
              </Form.Item>
              <Form.Item label="Tr???ng th??i hi???n th???">
                <Radio.Group disabled={true} value={isPublic}>
                  <Space direction="horizontal">
                    <Radio value={true}>Hi???n th???</Radio>
                    <Radio value={false}>Kh??ng hi???n th???</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item label="Gi???i thi???u">
                <Input.TextArea
                  disabled={true}
                  value={doctorDetail.about}
                  rows={6}
                />
              </Form.Item>
              <Form.Item label="Kinh nghi???m">
                <Input.TextArea
                  disabled={true}
                  value={doctorDetail.experience}
                  rows={6}
                />
              </Form.Item>
              <Form.Item label="Gi???i th?????ng">
                <Input.TextArea
                  disabled={true}
                  value={doctorDetail.awards}
                  rows={7}
                />
              </Form.Item>
              <Form.Item label="Qu?? tr??nh ????o t???o">
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
              Ng??ng l??m vi???c
            </Button>
          ) : (
            <Button
              onClick={() => {
                setModalShowActive(true);
              }}
              className="active_button"
            >
              Ti???p t???c l??m vi???c
            </Button>
          )}
          <NavLink to={`${location.pathname}/edit`} replace>
            <Button className="edit_button">S???a th??ng tin</Button>
          </NavLink>
        </Space>
      </div>
      <ConfirmModal
        visible={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
        title="X??c nh???n b??c s?? ng??ng l??m vi???c"
        modalText="B???n c?? ch???c ch???n ng??ng l??m vi???c b??c s?? n??y kh??ng?"
        callBack={callbackFunctionActive}
      />
      <ConfirmModal
        visible={modalShowActive}
        onHide={() => setModalShowActive(false)}
        title="X??c nh???n b??c s?? ti???p t???c l??m vi???c"
        modalText="B???n c?? ch???c ch???n cho b??c s?? n??y ti???p t???c l??m vi???c kh??ng?"
        callBack={callbackFunctionActive}
      />
    </Wrapper>
  );
};

export default DoctorDetail;
