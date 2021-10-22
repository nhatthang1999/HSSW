import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
} from "antd";

import { useDispatch, useSelector } from "react-redux";

import { useHistory, useParams } from "react-router-dom";
import _ from "lodash";
import NumericInput from "../../../../component/NumericInput";
import { LoadingOutlined } from "@ant-design/icons";
import BackButton from "../../../../component/BackButton";
import AvatarHolder from "../../../../component/Avatar";
import {
  editDoctorForAdmin,
  getDetailOfDoctor,
} from "../../../../reducers/adminManagement/DoctorManagement";

const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  /* color: #3483eb; */
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
  .save_cancel {
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
      /* background: #ff0000; */
      /* color: #fff; */
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
  .ant-input {
    border-radius: 5px;
  }
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 5px;
  }
  .ant-form-item {
    margin-bottom: 14px;
  }
  @media only screen and (max-width: 424px) {
    .back_button {
      top: 0;
    }
  }
`;
const EditDoctor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(getDetailOfDoctor(id));
      let data = { ...response, faculty_id: response.faculty.faculty_id };
      for (let i = 0; i < response.list_specialty_id.length; i++) {
        data = { ...data, [i]: response.list_specialty_id[i] };
      }
      form.setFieldsValue(data);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const doctorDetail = useSelector((state) =>
    state.doctorManagement.doctorDetail
      ? state.doctorManagement.doctorDetail
      : []
  );

  const [inputValues, setInputValues] = useState({});

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const specialtyGroupByAcademic = useSelector((state) =>
    state.doctorManagement.specialtyGroupByAcademic
      ? state.doctorManagement.specialtyGroupByAcademic
      : []
  );
  const faculties = useSelector((state) =>
    state.doctorManagement.faculty ? state.doctorManagement.faculty : []
  );
  const handleOnChangeFaculty = (value) => {
    setInputValues({ ...inputValues, faculty_id: value });
  };
  const [chooseSpecialty, setChooseSpecialty] = useState({});

  const handleOnChangeSpecialtyGroup = (event) => {
    const { value, name } = event.target;
    const objectSync = {
      ...chooseSpecialty,
      [name]: value,
    };
    setChooseSpecialty(objectSync);
    setInputValues({
      ...inputValues,
      list_specialty_id: _.toArray(objectSync),
    });
  };
  const handleSubmit = async () => {
    let objectSync = _.cloneDeep(doctorDetail);
    let inputKeys = _.keysIn(objectSync);
    inputKeys.forEach((item) => {
      if (!_.isEmpty(_.get(inputValues, `${item}`))) {
        objectSync = {
          ...objectSync,
          [item]: _.get(inputValues, `${item}`),
        };
      }
    });
    if (_.isUndefined(inputValues.faculty_id)) {
      objectSync = {
        ...objectSync,
        faculty_id: objectSync.faculty.faculty_id,
      };
    } else {
      objectSync = {
        ...objectSync,
        faculty_id: inputValues.faculty_id,
      };
    }
    if (_.isUndefined(inputValues.is_public)) {
      objectSync = {
        ...objectSync,
        is_public: doctorDetail.is_public,
      };
    } else {
      objectSync = {
        ...objectSync,
        is_public: inputValues.is_public,
      };
    }
    const response = await dispatch(editDoctorForAdmin(objectSync));
    if (response.status === 200) history.replace(`/admin/doctor/${id}`);
  };
  const goBack = () => {
    history.replace(`/admin/doctor/${id}`);
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
        <h1>Sửa thông tin cá nhân</h1>
      </div>
      <Spin
        spinning={loading}
        tip="Vui lòng đợi..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <AvatarHolder
          name="image"
          onChange={handleOnChangeAvatar}
          image={_.get(doctorDetail, "image", "")}
        />

        <Form
          layout="vertical"
          method="post"
          form={form}
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
              <Form.Item
                label="Tài khoản"
                name="account"
                rules={[
                  { required: true, message: "Vui lòng điền tài khoản!" },
                ]}
              >
                <Input
                  disabled={true}
                  name="username"
                  onChange={handleOnChange}
                />
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
                  name="faculty_id"
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
                  <Form.Item label={group.academic_name} name={key} key={key}>
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
              <Form.Item
                label="Vị trí"
                name="position"
              // rules={[{ required: true, message: "Vui lòng điền vị trí!" }]}
              >
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
                  onChange={handleOnChange}
                >
                  <Space direction="horizontal">
                    <Radio value={true}>Hiển thị</Radio>
                    <Radio value={false}>Không hiển thị</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="Giới thiệu" name="about">
                <Input.TextArea
                  rows={8}
                  name="about"
                  onChange={handleOnChange}
                />
              </Form.Item>
              <Form.Item label="Kinh nghiệm" name="experience">
                <Input.TextArea
                  rows={8}
                  name="experience"
                  onChange={handleOnChange}
                />
              </Form.Item>
              <Form.Item label="Giải thưởng" name="awards">
                <Input.TextArea
                  rows={8}
                  name="awards"
                  onChange={handleOnChange}
                />
              </Form.Item>
              <Form.Item label="Quá trình đào tạo" name="training_process">
                <Input.TextArea
                  rows={8}
                  name="training_process"
                  onChange={handleOnChange}
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="save_cancel">
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

export default EditDoctor;
