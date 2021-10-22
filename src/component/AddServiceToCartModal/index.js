import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Button, Space, Descriptions, Spin, notification } from "antd";
import { Form } from "antd";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { addItemToServiceCart } from "../../reducers/ExamServiceManagement";
import { getServiceDetail } from "../../api/serviceManagement";
import DebounceSelect from "../DebounceSelect";
import { InputNumber } from "../InputNumber";
import { searchServiceForCart } from "../../api/examServiceManagement";

const Wrapper = styled.div`
  .ant-select-selector {
    border-radius: 5px !important;
  }
  .ant-input {
    width: 100% !important;
    border-radius: 5px;
  }
`;
const AddServiceToCartModal = (props) => {
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState([]);
  const [selectedService, setSelectedService] = useState({});

  const handleChange = async (service) => {
    setValue(service);
    const response = await getServiceDetail(service.value);
    setSelectedService(response.data);
  };
  //handle search service
  const handleSearchService = async (value) => {
    const response = await searchServiceForCart({
      page: 1,
      limit: 10,
      serviceName: value,
      sort: "asc",
      order: "name",
    });
    const listServiceSearch = response.data.listServiceResponse;
    return listServiceSearch.map((service) => ({
      label: service.service_name,
      value: service.service_id,
    }));
  };
  //handle request and return response to notificate
  const handleOk = async () => {
    const response = await dispatch(
      addItemToServiceCart({
        cartId: props.cartId,
        service_id: selectedService.service_id,
        quantity: quantity,
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
      clearState();
      props.onHide();
      setConfirmLoading(false);
    }, 2000);
  };
  //clear state when confirm or cancel
  const clearState = () => {
    setConfirmLoading(false);
    setQuantity(1);
    setSelectedService({});
    setValue([]);
  };
  return (
    <Modal
      {...props}
      visible={props.visible}
      onCancel={() => {
        props.onHide();
        clearState();
      }}
      confirmLoading={confirmLoading}
      title="Thêm dịch vụ"
      footer={null}
      afterClose={props.afterClose}
      preserve={false}
      destroyOnClose
    >
      <Wrapper>
        <Form layout="vertical" method="post" onFinish={handleOk}>
          <Form.Item
            label="Tên dịch vụ"
            name="service_id"
            rules={[{ required: true, message: "Vui lòng chọn dịch vụ!" }]}
          >
            <DebounceSelect
              showSearch
              value={value}
              fetchOptions={handleSearchService}
              onChange={(newValue) => handleChange(newValue)}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              // { required: true, message: "Vui lòng điền số lượng!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value?.number > 0 || quantity > 0) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("Số lượng phải lớn hơn 0!"));
                },
              }),
            ]}
          >
            <InputNumber onChange={(value) => setQuantity(value.number)} />
          </Form.Item>
          <Spin
            spinning={_.isEmpty(selectedService) || quantity <= 0}
            delay={500}
            tip="Vui lòng chọn dịch vụ và số lượng"
          >
            <Descriptions>
              <Descriptions.Item label="Đơn giá">
                {_.get(selectedService, "price", 0)}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Đơn vị tính">
                {_.get(selectedService, "unit", "")}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Thành tiền">
                {_.get(selectedService, "price", "") * quantity}
              </Descriptions.Item>
            </Descriptions>
          </Spin>

          <div className="flex justify-end">
            <Space>
              <Button
                onClick={() => {
                  props.onHide();
                  clearState();
                }}
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

export default AddServiceToCartModal;
