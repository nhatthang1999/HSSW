import React from "react";
import { Modal, Divider, Space } from "antd";
import _ from "lodash";
import NumberFormat from "react-number-format";

const BillModal = (props) => {
  return (
    <Modal
      {...props}
      visible={props.visible}
      onCancel={props.onHide}
      //   title={props.title}
      title="Xem trước hóa đơn"
      footer={null}
    >
      {/* <h3>Xem trước hóa đơn</h3> */}

      <div className="content">
        <p>Khoa: {_.get(props, "doctor.faculty.faculty_name", "")}</p>
        <p>Bác sĩ: {_.get(props, "doctor.full_name", "")}</p>
        <p>Ngày: {_.get(props, "book_date", "")}</p>
        <p>Ca: {_.get(props, "selected_time", "")}</p>
        <p>Ghi chú: {_.get(props, "note", "")}</p>
      </div>
      <Divider orientation="left" plain></Divider>

      <div>
        <p>
          <Space>
            Thành tiền:
            <NumberFormat
              value={_.get(props, "doctor.price", "")}
              displayType={"text"}
              thousandSeparator={true}
            />
            VND
          </Space>
        </p>
      </div>
    </Modal>
  );
};

export default BillModal;
