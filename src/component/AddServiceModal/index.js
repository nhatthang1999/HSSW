import React, { useState } from "react";
import styled from "styled-components";
import { Input, Modal, Button, Space, notification } from "antd";
import { Form } from "antd";
import { useDispatch } from "react-redux";
// import { addNewServiceForAdmin } from "../../reducers/ServiceManagement";
import NumericInput from "../NumericInput";
import { addNewServiceForAdmin } from "../../reducers/adminManagement/ServiceManagement";

const Wrapper = styled.div``;
const AddServiceModal = (props) => {
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
      addNewServiceForAdmin({
        ...inputValues,
      })
    );
    setConfirmLoading(true);
    setTimeout(async () => {
      if (response.status === 200)
        await notification.success({
          message: "Thêm dịch vụ thành công!",
          duration: 2.5,
        });
      else
        await notification.error({
          message: "Thêm dịch vụ không thành công!",
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
      title="Tạo dịch vụ"
      footer={null}
      destroyOnClose
      afterClose={props.afterClose}
      preserve={false}
    >
      <Wrapper>
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          method="post"
          onFinish={handleOk}
        >
          <Form.Item
            label="Tên dịch vụ"
            name="service_name"
            rules={[{ required: true, message: "Vui lòng điền tên dịch vụ!" }]}
          >
            <Input
              name="service_name"
              onChange={handleOnChange}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            label="Đơn vị tính"
            name="unit"
            rules={[{ required: true, message: "Vui lòng điền đơn vị tính!" }]}
          >
            <Input name="unit" onChange={handleOnChange} autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Khối lượng"
            name="mass"
            rules={[{ required: true, message: "Vui lòng điền khối lượng!" }]}
          >
            <NumericInput name="mass" maxLength={9} onChange={handleOnChange} />
          </Form.Item>
          <Form.Item
            label="Đơn giá(VND)"
            name="price"
            rules={[{ required: true, message: "Vui lòng điền đơn giá!" }]}
          >
            <NumericInput
              name="price"
              maxLength={9}
              onChange={handleOnChange}
            />
          </Form.Item>
          <div className="flex justify-end">
            <Space>
              <Button
                key="back"
                onClick={props.onHide}
                style={{ borderRadius: "5px" }}
              >
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

export default AddServiceModal;
