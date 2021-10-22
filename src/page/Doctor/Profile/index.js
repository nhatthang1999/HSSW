import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Radio, Space, Col, Row, Select } from "antd";
import styled from "styled-components";

import _ from "lodash";
import {
  getAllFacultyForAdmin,
  getAllSpecialtyGroupByAcademicForAdmin,
  getProfileDoctor,
} from "../../../reducers/adminManagement/DoctorManagement";
const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  /* color: #3483eb; */
  padding: 30px 50px 100px;
  .ant-picker {
    width: 100%;
  }
  textarea {
    resize: none;
  }
  .edit_area {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    .edit_button {
      background: #6d88fa;
      color: #ffffff;
      border-radius: 8px;
    }
  }
  h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
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
`;
const ProfileDoctor = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  // const [form] = Form.useForm();
  const [doctorDetail, setDoctorDetail] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getProfileDoctor());
      setDoctorDetail(response);
      dispatch(getAllFacultyForAdmin());
      dispatch(getAllSpecialtyGroupByAcademicForAdmin());
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

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <h1>Thông tin cá nhân</h1>
      </div>
      <Row style={{ marginBottom: "16px" }}>
        <Col span={8}>
          <img
            className="img_container"
            src={doctorDetail.image}
            alt=""
            width="100px"
            height="100px"
          />
        </Col>
      </Row>

      <Form layout="vertical">
        <Row gutter={32}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
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
                  !_.isEmpty(doctorDetail) && doctorDetail.faculty.faculty_name
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
            <Form.Item label="Giá tiền">
              <Input disabled={true} value={doctorDetail.price} />
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item label="Giới thiệu">
              <Input.TextArea
                disabled={true}
                value={doctorDetail.about}
                rows={4}
              />
            </Form.Item>
            <Form.Item label="Kinh nghiệm">
              <Input.TextArea
                disabled={true}
                value={doctorDetail.experience}
                rows={4}
              />
            </Form.Item>
            <Form.Item label="Giải thưởng">
              <Input.TextArea
                disabled={true}
                value={doctorDetail.award}
                rows={4}
              />
            </Form.Item>
            <Form.Item label="Quá trình đào tạo">
              <Input.TextArea
                disabled={true}
                value={doctorDetail.training_process}
                rows={4}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
};

export default ProfileDoctor;
