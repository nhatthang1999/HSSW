import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import _ from "lodash";
import { Form, Input, Button, Radio, Space, Col, Row, Select } from "antd";
import { } from "antd";
import NumericInput from "../../../../component/NumericInput";
import AvatarHolder from "../../../../component/Avatar";
import BackButton from "../../../../component/BackButton";
import {
  addNewDoctorForAdmin,
  getAllFacultyForAdmin,
  getAllSpecialtyGroupByAcademicForAdmin,
} from "../../../../reducers/adminManagement/DoctorManagement";
const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #f1f9ff;
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
  textarea {
    resize: none;
  }
  .add_cancel {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .add_button {
      background: #1890ff;
      color: #ffffff;
      border-radius: 5px;
    }
    .cancel_button {
      border-radius: 5px;
      width: 105px;
      /* background: #ff0000; */
      /* color: #fff; */
    }
  }
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  h1 {
    font-size: 30px;
    font-weight: bold;
    margin: 20px 0;
    text-align: left;
    color: #286ba6;
  }
  label {
    font-weight: 600;
  }
  .ant-input {
    border-radius: 5px;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 5px;
  }
  .ant-form-item {
    margin-bottom: 14px;
  }
`;
const AddDoctor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const fetchData = () => {
      dispatch(getAllFacultyForAdmin());
      dispatch(getAllSpecialtyGroupByAcademicForAdmin());
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [inputValues, setInputValues] = useState({
    password: "A123@123a",
    comfirm_password: "A123@123a",
    position: "",
    about: "",
    experience: "",
    awards: "",
    training_process: "",
    is_public: false,
  });

  const [is_public] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const faculties = useSelector((state) =>
    state.doctorManagement.faculty ? state.doctorManagement.faculty : []
  );
  const specialtyGroupByAcademic = useSelector((state) =>
    state.doctorManagement.specialtyGroupByAcademic
      ? state.doctorManagement.specialtyGroupByAcademic
      : []
  );

  const handleOnChangeFaculty = (value) => {
    setInputValues({ ...inputValues, faculty_id: value });
  };

  const [chooseSpecialty, setChooseSpecialty] = useState({});

  const handleOnChangeSpecialtyGroup = (event) => {
    const objectSync = {
      ...chooseSpecialty,
      [event.target.name]: event.target.id,
    };
    setChooseSpecialty(objectSync);
    setInputValues({
      ...inputValues,
      list_specialty_id: _.toArray(objectSync),
    });
  };
  const handleSubmit = async () => {
    const response = await dispatch(addNewDoctorForAdmin(inputValues));
    if (response.status === 200) history.replace("/admin/doctor");
  };
  const goBack = () => {
    history.goBack();
  };
  const handleOnChangeAvatar = (image) => {
    setInputValues({
      ...inputValues,
      image: image,
    });
  };
  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <BackButton />
        <h1>Thêm bác sĩ</h1>
      </div>
      <AvatarHolder name="image" onChange={handleOnChangeAvatar} />

      <Form layout="vertical" method="post" onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <Form.Item
              label="Họ và tên"
              name="full_name"
              rules={[{ required: true, message: "Vui lòng điền họ và tên!" }]}
            >
              <Input name="full_name" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="Tài khoản"
              name="username"
              rules={[{ required: true, message: "Vui lòng điền tài khoản!" }]}
            >
              <Input name="username" onChange={handleOnChange} />
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
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng điền Số điện thoại!" },
              ]}
            >
              <Input name="phone" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="Khoa"
              name="faculty_id"
              rules={[{ required: true, message: "Vui lòng chọn khoa!" }]}
            >
              <Select
                className="faculty_dropdown"
                onChange={handleOnChangeFaculty}
              >
                {faculties.map((faculty, key) => (
                  <Option key={key} value={faculty.faculty_id}>
                    {faculty.faculty_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {specialtyGroupByAcademic.map((group, key) => {
              return (
                <Form.Item label={group.academic_name} key={key}>
                  <Radio.Group
                    onChange={handleOnChangeSpecialtyGroup}
                    name={key}
                  >
                    <Space direction="vertical">
                      {group.list_specialty_response.map((item, key) => {
                        return (
                          <Radio
                            value={item.specialty_id}
                            key={item.specialty_id}
                            name={key}
                            id={item.specialty_id}
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
            <Form.Item label="Vị trí" name="position">
              <Input name="position" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item
              label="Giá tiền"
              name="price"
              rules={[{ required: true, message: "Vui lòng điền giá tiền!" }]}
            >
              <NumericInput
                name="price"
                maxLength={9}
                onChange={handleOnChange}
              />
            </Form.Item>
            <Form.Item label="Trạng thái hiển thị" name="is_public">
              <Radio.Group
                name="is_public"
                defaultValue={is_public}
                onChange={handleOnChange}
              >
                <Space direction="horizontal">
                  <Radio value={true}>Hiển thị</Radio>
                  <Radio value={false}>Không hiển thị</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
            <Form.Item label="Giới thiệu">
              <Input.TextArea rows={8} name="about" onChange={handleOnChange} />
            </Form.Item>
            <Form.Item label="Kinh nghiệm">
              <Input.TextArea
                rows={8}
                name="experience"
                onChange={handleOnChange}
              />
            </Form.Item>
            <Form.Item label="Giải thưởng">
              <Input.TextArea
                rows={8}
                name="awards"
                onChange={handleOnChange}
              />
            </Form.Item>
            <Form.Item label="Quá trình đào tạo">
              <Input.TextArea
                rows={8}
                name="training_process"
                onChange={handleOnChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="add_cancel">
          <Space>
            <Button className="cancel_button" onClick={goBack}>
              Hủy
            </Button>
            <Button className="add_button" htmlType="submit">
              Thêm bác sĩ
            </Button>
          </Space>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddDoctor;
