import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Descriptions,
  Button,
  notification,
  Space,
} from "antd";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { addBookingByDoctor } from "../../../../reducers/TimetableManagement";

const AddByDoctorModal = (props) => {
  const [inputValues, setInputValues] = useState({
    note: "",
  });

  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(props.item);
    setInputValues({ ...inputValues, ...props.item });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, props.item]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    const request = {
      ...inputValues,
      doctor_id: props.doctor_id,
      list_option_time_id: props.list_option_time_id,
      book_date: props.book_date,
    };
    setConfirmLoading(true);
    const response = await dispatch(addBookingByDoctor(request));
    setTimeout(async () => {
      if (response.status === 200) {
        await notification.success({
          message: "Thêm lịch khám cho khách hàng thành công!",
          duration: 2.5,
        });
      } else if (response.status === 400) {
        await notification.error({
          message: "Thêm lịch khám cho khách hàng không thành công!",
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
      title="Thêm lịch khám"
      afterClose={props.afterClose}
      confirmLoading={confirmLoading}
      destroyOnClose
      preserve={false}
      footer={null}
    >
      <Descriptions>
        <Descriptions.Item label="Ngày">{props.book_date}</Descriptions.Item>
      </Descriptions>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Mã khách hàng"
          name="customer_code"
          rules={[{ required: true, message: "Vui lòng điền mã khách hàng!" }]}
        >
          <Input
            name="customer_code"
            onChange={handleOnChange}
            disabled={!_.isEmpty(props.item)}
          />
        </Form.Item>
        <Form.Item label="Ghi chú" name="note">
          <Input.TextArea
            rows={8}
            name="note"
            disabled={!_.isEmpty(props.item)}
            onChange={handleOnChange}
          />
        </Form.Item>
        <Descriptions>
          <Descriptions.Item label="Ca">
            {_.join(props.selected_time, ",")}
          </Descriptions.Item>
        </Descriptions>
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
              key="submit"
              type="primary"
              loading={confirmLoading}
              // onClick={handleSubmit}
              style={{ borderRadius: "5px" }}
              htmlType="submit"
            >
              Lưu
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default AddByDoctorModal;
