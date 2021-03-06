import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Radio, Space, Col, Row, DatePicker, notification, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getProfile, editProfileUser } from "../../../../reducers/Customer";
import BackButton from "../../../../component/BackButton";

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
    text-align: center;
    padding-bottom: 40px;
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
    top: 55px;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 5px;
  }
`;

const EditProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [inputValues, setInputValues] = useState({});

    const { customerDetail = {} } = useSelector((state) =>
        state.customer ? state.customer : {}
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await dispatch(getProfile());
            let data = {
                ...response,
                birth_day: moment(response.birth_day, "DD/MM/YYYY"),
            };
            form.setFieldsValue(data);
            setLoading(false);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        const objectSync = { ...customerDetail, ...inputValues };
        const response = await dispatch(editProfileUser(objectSync));
        if (response.status === 200) {
            await notification.success({
                message: "C???p nh???t th??ng tin th??nh c??ng!",
                duration: 2.5,
            });
            setLoading(false);
            history.replace("/customer/profiles");
        }
        else {
            await notification.error({
                message: "Vui l??ng ki???m tra l???i th??ng tin!",
                description: response.message,
                duration: 2.5,
            });
            setLoading(false);
        }
    };

    const goBack = () => {
        history.goBack();
    };

    return (
        <Wrapper className="px-4 sm:px-6 lg:px-8">
            <Spin tip="Vui l??ng ?????i..." spinning={loading} >
                <div className="header">
                    <BackButton />
                    <h1>C???p nh???t th??ng tin c?? nh??n</h1>
                </div>
                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    <Row gutter={32}>
                        <Col span={12}>
                            <Form.Item label="H??? v?? t??n" name="full_name">
                                <Input name="full_name" disabled={true} />
                            </Form.Item>
                            <Form.Item label="T??i kho???n" name="username">
                                <Input name="username" disabled={true} />
                            </Form.Item>
                            <Form.Item label="Email" name="email">
                                <Input name="email" onChange={handleOnChange} disabled={true} />
                            </Form.Item>
                            <Form.Item
                                label="S??? ??i???n tho???i"
                                name="phone"
                                rules={[{ required: true, message: "Vui l??ng ??i???n S??? ??i???n tho???i!" }]}
                            >
                                <Input name="phone" onChange={handleOnChange} />
                            </Form.Item>
                            <Form.Item label="Ng??y sinh" name="birth_day">
                                <DatePicker
                                    name="birth_day"
                                    disabled={true}
                                    format="DD/MM/YYYY"
                                    value={moment(customerDetail.birth_day, "DD/MM/YYYY")}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Gi???i t??nh" name="sex">
                                <Radio.Group name="sex" disabled={true}>
                                    <Space>
                                        <Radio value={true}>Nam</Radio>
                                        <Radio value={false}>N???</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label="?????a ch???" name="address">
                                <Input name="address" onChange={handleOnChange} />
                            </Form.Item>
                            <Form.Item label="S??? c??n c?????c c??ng d??n" name="cccd">
                                <Input name="cccd" disabled={true} />
                            </Form.Item>
                            <Form.Item label="Nh??m m??u" name="blood">
                                <Input name="blood" onChange={handleOnChange} />
                            </Form.Item>
                            <Form.Item label="Ti???n s??? b???nh ??n" name="medicalHistory">
                                <Input.TextArea
                                    onChange={handleOnChange}
                                    name="medicalHistory"
                                    rows={4}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="save_cancel">
                        <Button className="save_button" htmlType="submit">
                            L??u th??ng tin
                        </Button>
                        <Button className="cancel_button" onClick={goBack}>
                            H???y
                        </Button>
                    </div>
                </Form>
            </Spin>
        </Wrapper>
    );
};

export default EditProfile;
