import React, { useState } from "react";
import styled from "styled-components";
import { Input, Modal, Descriptions, Button, Space, notification } from "antd";
import { Form } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { createNewServiceCart } from "../../reducers/ExamServiceManagement";
import { useHistory, useLocation } from "react-router-dom";

const Wrapper = styled.div``;
const AddServiceCartModal = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  //handle request and return response to notificate
  const handleOk = async () => {
    const response = await dispatch(
      createNewServiceCart({
        medical_record_code: inputValues.medical_record_code,
      })
    );
    setConfirmLoading(true);
    setTimeout(async () => {
      if (response.status === 200) {
        await notification.success({
          message: "Thêm danh sách dịch vụ thành công!",
          duration: 2.5,
        });
        history.push(`${location.pathname}/${response.data.cart_id}`);
      } else {
        await notification.error({
          message: "Thêm danh sách dịch vụ không thành công!",
          description: `${response.message}`,
          duration: 2.5,
        });
      }
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
      title="Thêm danh sách dịch vụ"
      footer={null}
      afterClose={props.afterClose}
      preserve={false}
      destroyOnClose
    >
      <Wrapper>
        <Form layout="vertical" method="post" onFinish={handleOk}>
          <Descriptions>
            <Descriptions.Item label="Ngày">
              {moment().format("DD/MM/YYYY")}
            </Descriptions.Item>
          </Descriptions>
          <Form.Item
            label="Mã hồ sơ"
            name="medical_record_code"
            rules={[{ required: true, message: "Vui lòng điền mã hồ sơ!" }]}
          >
            <Input name="medical_record_code" onChange={handleOnChange} />
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
                Tạo danh sách
              </Button>
            </Space>
          </div>
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default AddServiceCartModal;
