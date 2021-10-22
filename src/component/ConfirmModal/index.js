import React, { useState } from "react";
import { Button, Modal } from "antd";

const ConfirmModal = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    setTimeout(() => {
      props.onHide();
      setConfirmLoading(false);
      props.callBack();
    }, 2000);
  };
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      // onOk={handleOk}
      confirmLoading={confirmLoading}
      // okText="Xác nhận"
      // cancelText="Hủy"
      onCancel={props.onHide}
      afterClose={props.afterClose}
      keyboard
      footer={[
        <Button
          key="back"
          onClick={props.onHide}
          style={{ borderRadius: "5px", width: "90px" }}
        >
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
          style={{ borderRadius: "5px" }}
        >
          Xác nhận
        </Button>,
      ]}
    >
      <p>{props.modalText}</p>
    </Modal>
  );
};

export default ConfirmModal;
