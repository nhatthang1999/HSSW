import React, { useState } from "react";
import styled from "styled-components";
import { Input, Modal, Descriptions, Button, Space, notification } from "antd";
import { Form } from "antd";
import moment from "moment";
import { createNewMedicalRecordsForStaff } from "../../reducers/MedicalRecordManagement";
import { useDispatch } from "react-redux";

const Wrapper = styled.div``;
const AddMedicalRecordModal = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  //handle request and return response to notificate
  const handleOk = async () => {
    const response = await dispatch(
      createNewMedicalRecordsForStaff({
        customer_code: inputValues.customer_code,
        disease_name: inputValues.disease_name,
        note: inputValues.note,
      })
    );
    setConfirmLoading(true);
    setTimeout(async () => {
      if (response.status === 200)
        await notification.success({
          message: "Thêm hồ sơ bệnh án thành công!",
          duration: 2.5,
        });
      else
        await notification.error({
          message: "Thêm hồ sơ bệnh án không thành công!",
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
      confirmLoading={confirmLoading}
      title="Tạo hồ sơ bệnh án"
      footer={null}
      afterClose={props.afterClose}
      preserve={false}
      destroyOnClose
    >
      <Wrapper>
        <Form layout="vertical" method="post" onFinish={handleOk}>
          <Descriptions>
            <Descriptions.Item label="Đợt khám">
              {moment().format("DD/MM/YYYY")}
            </Descriptions.Item>
          </Descriptions>
          <Form.Item
            label="Mã khách hàng"
            name="customer_code"
            rules={[
              { required: true, message: "Vui lòng điền mã khách hàng!" },
            ]}
          >
            <Input name="customer_code" onChange={handleOnChange} />
          </Form.Item>
          <Form.Item
            label="Tên bệnh"
            name="disease_name"
            rules={[{ required: true, message: "Vui lòng điền tên bệnh!" }]}
          >
            <Input name="disease_name" onChange={handleOnChange} />
          </Form.Item>
          <Form.Item
            label="Ghi chú"
            name="note"
            rules={[{ required: true, message: "Vui lòng ghi chú!" }]}
          >
            <Input.TextArea rows={8} name="note" onChange={handleOnChange} />
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

export default AddMedicalRecordModal;
