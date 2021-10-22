import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, Modal, Descriptions, Button, Space, notification } from "antd";
import { Form } from "antd";
import moment from "moment";
import { editMedicalRecordHappeningForDoctor } from "../../reducers/MedicalRecordManagement";
import { useDispatch } from "react-redux";

const Wrapper = styled.div``;

const EditMedicalHappening = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props.item);
    setInputValues(props.item);
  }, [form, props.item]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  //handle request and return response to notificate
  const handleOk = async () => {
    const response = await dispatch(
      editMedicalRecordHappeningForDoctor({
        doctor_id: props.doctor_id,
        medical_detail_id: props.item.medical_detail_id,
        helppenings: inputValues.helppenings,
        prescription: inputValues.prescription,
      })
    );
    setConfirmLoading(true);
    setTimeout(async () => {
      if (response.status === 200)
        await notification.success({
          message: "Sửa diễn biến thành công!",
          duration: 2.5,
        });
      else
        await notification.error({
          message: "Sửa diễn biến không thành công!",
          description: `${response.message}`,
          duration: 2.5,
        });
      props.onHide();
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Modal
      {...props}
      visible={props.visible}
      onCancel={props.onHide}
      //   onOk={handleOk}
      confirmLoading={confirmLoading}
      title="Sửa diễn biến"
      afterClose={props.afterClose}
      footer={null}
      preserve={false}
      forceRender
      destroyOnClose
    >
      <Wrapper>
        <Form layout="vertical" method="post" form={form} onFinish={handleOk}>
          <Descriptions>
            <Descriptions.Item label="Ngày">
              {moment().format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian">
              {moment().format("h:mm a")}
            </Descriptions.Item>
          </Descriptions>
          {/* <Form.Item label="Mã lịch khám" name="book_doctor_code">
            <Input name="book_doctor_code" onChange={handleOnChange} />
          </Form.Item> */}
          <Form.Item
            label="Diễn biến"
            name="helppenings"
            rules={[{ required: true, message: "Vui lòng điền diễn biến!" }]}
          >
            <Input.TextArea
              rows={8}
              name="helppenings"
              onChange={handleOnChange}
            />
          </Form.Item>
          <Form.Item
            label="Y lệnh"
            name="prescription"
            rules={[{ required: true, message: "Vui lòng diền y lệnh!" }]}
          >
            <Input.TextArea
              rows={8}
              name="prescription"
              onChange={handleOnChange}
            />
          </Form.Item>
          <div className="flex justify-end">
            <Space>
              <Button onClick={props.onHide} style={{ borderRadius: "5px" }}>
                Hủy
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                loading={confirmLoading}
                style={{ borderRadius: "5px" }}
              >
                Lưu
              </Button>
            </Space>
          </div>
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default EditMedicalHappening;
