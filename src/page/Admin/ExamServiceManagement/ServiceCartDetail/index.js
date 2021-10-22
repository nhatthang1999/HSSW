import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, message, notification, Space, Table, Tooltip } from "antd";
import { getAuthorization } from "../../../../reducers/Login";
import { DOCTOR } from "../../../../constant/role";
import BackButton from "../../../../component/BackButton";
import {
  deleteItemInServiceCart,
  getCartDetailsByCartId,
  payServiceCart,
} from "../../../../reducers/ExamServiceManagement";
import {
  LoadingOutlined,
  PlusOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import AddServiceToCartModal from "../../../../component/AddServiceToCartModal";
import ConfirmModal from "../../../../component/ConfirmModal";
import NumberFormat from "react-number-format";
import _ from "lodash";

const Wrapper = styled.div`
  width: 100%;
  /* color: #3483eb; */
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
  .header {
    text-align: left;
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  .ant-btn {
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .add_button {
    position: relative;
    bottom: 49px;
  }
  .add_button_no_paging {
    position: relative;
    bottom: -12px;
  }
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-item-link {
    border-radius: 50%;
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
  .ant-pagination-item {
    border-radius: 50%;
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
  .ant-select-selector {
    border-radius: 5px !important;
  }
`;
const ServiceCartDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [authorization, setAuthorization] = useState({});
  const history = useHistory();

  const location = useLocation();

  const search = location.search;

  const params = Object.fromEntries(new URLSearchParams(search));

  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    limit: 10,
    id: id,
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    showSizeChanger: true,
    total: 0,
  });

  const { is_pay = false, total } = useSelector((state) =>
    state.serviceCartManagement.serviceCartDetail
      ? state.serviceCartManagement.serviceCartDetail
      : {}
  );
  const [list_cart_details_response, setList_cart_details_response] = useState(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await dispatch(
        getCartDetailsByCartId({
          ...paramsSearch,
          ...params,
        })
      );
      setList_cart_details_response(response.list_cart_details_response);

      setPagination({
        ...pagination,
        total: response.totalItem,
        current: !_.isUndefined(params.page)
          ? _.parseInt(params.page)
          : pagination.current,
        pageSize: !_.isUndefined(params.limit)
          ? _.parseInt(params.limit)
          : pagination.pageSize,
      });

      const res = await dispatch(getAuthorization());
      setAuthorization(res);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataWithIndex = [];

  for (let i = 0; i < list_cart_details_response.length; i++) {
    dataWithIndex.push({
      key: (pagination.current - 1) * pagination.pageSize + i + 1,
      ...list_cart_details_response[i],
    });
  }
  const [showAddNew, setShowAddNew] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const [showPay, setShowPay] = useState(false);

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: "unit_price",
      key: "unit_price",
      render: (unit_price) => (
        <NumberFormat
          value={unit_price}
          displayType={"text"}
          thousandSeparator={true}
        />
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <NumberFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
        />
      ),
    },
    {
      key: "action",
      render: (text, record) =>
        authorization.role === DOCTOR &&
        !is_pay && (
          <Tooltip title="Xóa" placement="top">
            <Button
              onClick={() => {
                setDeleteId(record.service_id);
                setShowDelete(true);
              }}
              type="link"
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>
        ),
    },
  ];

  const handleChange = async (pagination, filters, sorter) => {
    setLoading(true);

    setParamsSearch({
      ...paramsSearch,
      page: pagination.current,
      limit: pagination.pageSize,
    });
    const params1 = new URLSearchParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

    history.replace(`${location.pathname}?${params1.toString()}`);

    setPagination({
      ...pagination,
      current: pagination.current,
    });

    const response = await dispatch(
      getCartDetailsByCartId({
        ...paramsSearch,
        page: pagination.current,
        limit: pagination.pageSize,
      })
    );

    setList_cart_details_response(response.list_cart_details_response);

    setPagination({
      ...pagination,
      total: response.totalItem,
    });
    setLoading(false);
  };

  const handleFetchData = async () => {
    setLoading(true);

    const response = await dispatch(
      getCartDetailsByCartId({
        ...paramsSearch,
        page: pagination.current,
        limit: pagination.pageSize,
      })
    );

    setList_cart_details_response(response.list_cart_details_response);

    setPagination({
      ...pagination,
      total: response.totalItem,
      current: !_.isUndefined(params.page)
        ? _.parseInt(params.page)
        : pagination.current,
      pageSize: !_.isUndefined(params.limit)
        ? _.parseInt(params.limit)
        : pagination.pageSize,
    });
    setLoading(false);
  };

  const callbackFunctionDelete = async () => {
    await message.loading("Hành động đang được thực hiện...", 2.5);
    const response = await dispatch(
      deleteItemInServiceCart({
        cartId: id,
        serviceId: deleteId,
      })
    );
    if (response.status === 200) {
      await notification.success({
        message: "Xóa dịch vụ khám thành công!",
        duration: 2.5,
      });
      handleFetchData();
    } else if (response.status === 400) {
      await notification.error({
        message: "Xóa dịch vụ khám không thành công!",
        description: `${response.message}`,
        duration: 2.5,
      });
    }
  };

  const callbackFunctionPay = async () => {
    await message.loading("Hành động đang được thực hiện...", 2.5);
    const response = await dispatch(
      payServiceCart({
        cartId: id,
      })
    );
    if (response.status === 200) {
      await notification.success({
        message: "Duyệt danh sách dịch vụ khám thành công!",
        duration: 2.5,
      });
      handleFetchData();
    } else if (response.status === 400) {
      await notification.error({
        message: "Duyệt danh sách dịch vụ không thành công!",
        description: `${response.message}`,
        duration: 2.5,
      });
    }
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <BackButton />
        <h1>Danh sách dịch vụ</h1>
      </div>
      <Table
        dataSource={dataWithIndex}
        columns={columns}
        onChange={handleChange}
        pagination={pagination}
        loading={{
          spinning: loading,
          tip: "Vui lòng đợi...",
          indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />,
        }}
        summary={(pageData) => {
          return (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}></Table.Summary.Cell>
                <Table.Summary.Cell index={3} colSpan={2}>
                  <span className="font-semibold">TỔNG CHI PHÍ ( VND )</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} colSpan={2}>
                  <NumberFormat
                    value={total}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
      {authorization.role === DOCTOR && !is_pay && (
        <div
          className={
            dataWithIndex.length > 0 ? "add_button" : "add_button_no_paging"
          }
        >
          <Space>
            <Tooltip title="Thêm dịch vụ" placement="bottomLeft">
              <Button
                type="primary"
                onClick={() => setShowAddNew(true)}
                icon={<PlusOutlined style={{ fontSize: "16px" }} />}
              ></Button>
            </Tooltip>
            <Tooltip title="Duyệt" placement="bottomLeft">
              <Button
                disabled={dataWithIndex.length === 0}
                // className={
                //   dataWithIndex.length > 0 ? "add_button" : "add_button_no_paging"
                // }
                onClick={() => setShowPay(true)}
                icon={<CheckOutlined style={{ fontSize: "16px" }} />}
              ></Button>
            </Tooltip>
          </Space>
        </div>
      )}
      <AddServiceToCartModal
        visible={showAddNew}
        onHide={() => setShowAddNew(false)}
        cartId={id}
        afterClose={handleFetchData}
      />
      <ConfirmModal
        visible={showDelete}
        onHide={() => setShowDelete(false)}
        title="Xác nhận xóa dịch vụ khám"
        modalText="Bạn có chắc chắn xóa dịch vụ khám này không?"
        callBack={callbackFunctionDelete}
      />
      <ConfirmModal
        visible={showPay}
        onHide={() => setShowPay(false)}
        title="Xác nhận duyệt danh sách dịch vụ khám"
        modalText="Bạn có chắc chắn duyệt danh sách dịch vụ khám này không?"
        callBack={callbackFunctionPay}
      />
    </Wrapper>
  );
};

export default ServiceCartDetail;
