import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Collapse, Descriptions, Table, Skeleton } from "antd";
import BackButton from "../../../../component/BackButton";
import { getPaymentDetailsByPaymentId } from "../../../../reducers/PaymentManagement";
import NumberFormat from "react-number-format";
import _ from "lodash";
import { LoadingOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const Wrapper = styled.div`
  width: 100%;
  /* color: #3483eb; */
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
  .header {
    text-align: left;
  }
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  .info {
    margin-bottom: 32px;
  }
  .ant-collapse {
    border-radius: 5px;
    .ant-collapse-header {
      font-weight: 600;
    }
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

const PaymentDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
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
    pageSizeOptions: [10, 20],
    showSizeChanger: true,
    total: 0,
  });
  const { total_price } = useSelector((state) =>
    state.paymentManagement.paymentDetail
      ? state.paymentManagement.paymentDetail
      : {}
  );

  const [list_item_of_payment_details, setList_item_of_payment_details] =
    useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoadingInfo(true);
      const response = await dispatch(
        getPaymentDetailsByPaymentId({ ...paramsSearch })
      );
      setList_item_of_payment_details(response.list_item_of_payment_details);
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
      setLoadingInfo(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { paymentDetail = {} } = useSelector((state) =>
    state.paymentManagement ? state.paymentManagement : {}
  );

  const dataWithIndex = [];

  for (let i = 0; i < list_item_of_payment_details.length; i++) {
    dataWithIndex.push({
      key: (pagination.current - 1) * pagination.pageSize + i + 1,
      ...list_item_of_payment_details[i],
    });
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "create_date",
      key: "create_date",
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
      getPaymentDetailsByPaymentId({
        ...paramsSearch,
        page: pagination.current,
        limit: pagination.pageSize,
      })
    );
    setList_item_of_payment_details(response.list_item_of_payment_details);
    setPagination({
      ...pagination,
      total: response.totalItem,
    });
    setLoading(false);
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <BackButton />
        <h1>Bảng kê chi tiết dịch vụ khám</h1>
      </div>
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        className="info"
      >
        <Panel header="Thông tin khách hàng" key="1">
          <Skeleton active loading={loadingInfo}>
            <Descriptions
              bordered
              column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Đợt khám từ ngày">
                {paymentDetail.create_date}
              </Descriptions.Item>
              <Descriptions.Item label="Mã khách hàng">
                {paymentDetail.customer_code}
              </Descriptions.Item>
              <Descriptions.Item label="Mã bảng kê">
                {paymentDetail.payment_code}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {paymentDetail.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Họ và tên">
                {paymentDetail.customer_name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {paymentDetail.email}
              </Descriptions.Item>
            </Descriptions>
          </Skeleton>
        </Panel>
      </Collapse>

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
                <Table.Summary.Cell index={3} colSpan={3}>
                  <span className="font-semibold">TỔNG CHI PHÍ ( VND )</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6} colSpan={1}>
                  <NumberFormat
                    value={total_price}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </Wrapper>
  );
};

export default PaymentDetail;
