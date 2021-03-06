import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Collapse, Descriptions, Skeleton, Space, Table } from "antd";
import BackButton from "../../../../component/BackButton";
import NumberFormat from "react-number-format";
import _ from "lodash";
import { getPaymentDetailsByPaymentId } from "../../../../reducers/Customer";
import { LoadingOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const Wrapper = styled.div`
  width: 100%;
  /* color: #3483eb; */
  padding: 30px 300px 50px;
  min-height: 100vh;
  background: #f1f9ff;

  .header {
    text-align: center;
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
    margin-bottom: 20px;
    box-shadow: 4px 8px 20px rgb(0 0 0 / 5%);
    .ant-collapse-header {
      font-weight: 600;
    }
  }
  .info_container {
    border: 1px solid hsla(0, 0%, 100%, 0);
    clear: both;
    padding: 16px;
    position: relative;
    transition: box-shadow 0.2s, border 0.1s;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 5px;
    box-shadow: 4px 8px 20px rgb(0 0 0 / 5%);
    background: #ffffff;
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
  @media (max-width: 1440px) {
    padding: 30px 150px 50px;
  }
  @media (max-width: 1200px) {
    padding: 30px 70px 50px;
  }
  @media (max-width: 992px) {
    padding: 30px 50px 50px;
  }
  @media (max-width: 767px) {
    padding: 30px 40px 50px;

    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 576px) {
    padding: 30px 25px 50px;
  }
`;
const PaymentHistoryDetail = () => {
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
    state.customer.paymentHistoryDetail
      ? state.customer.paymentHistoryDetail
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

  const { paymentHistoryDetail = {} } = useSelector((state) =>
    state.customer ? state.customer : {}
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
      title: "Ng??y thanh to??n",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "T??n d???ch v???",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "????n v??? t??nh",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "S??? l?????ng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "????n gi??",
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
      title: "Th??nh ti???n",
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
    <Wrapper>
      <div className="header">
        <BackButton />
        <h1>B???ng k?? chi ti???t d???ch v??? kh??m</h1>
      </div>
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        className="info"
      >
        <Panel header="Th??ng tin chi ti???t" key="1">
          <Skeleton active loading={loadingInfo}>
            <Descriptions
              bordered
              column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="?????t kh??m t??? ng??y">
                {paymentHistoryDetail.create_date}
              </Descriptions.Item>
              <Descriptions.Item label="M?? kh??ch h??ng">
                {paymentHistoryDetail.customer_code}
              </Descriptions.Item>
              <Descriptions.Item label="M?? b???ng k??">
                {paymentHistoryDetail.payment_code}
              </Descriptions.Item>
              <Descriptions.Item label="S??? ??i???n tho???i">
                {paymentHistoryDetail.phone}
              </Descriptions.Item>
              <Descriptions.Item label="H??? v?? t??n">
                {paymentHistoryDetail.customer_name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {paymentHistoryDetail.email}
              </Descriptions.Item>
            </Descriptions>
          </Skeleton>
        </Panel>
      </Collapse>
      <div className="info_container">
        <Table
          dataSource={dataWithIndex}
          columns={columns}
          onChange={handleChange}
          pagination={pagination}
          loading={{
            spinning: loading,
            tip: "Vui l??ng ?????i...",
            indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />,
          }}
          summary={(pageData) => {
            return (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell
                    index={0}
                    colSpan={3}
                  ></Table.Summary.Cell>
                  <Table.Summary.Cell index={3} colSpan={3}>
                    <span className="font-semibold">T???NG CHI PH?? ( VND )</span>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6} colSpan={1}>
                    <Space>
                      <NumberFormat
                        value={total_price}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                      VND
                    </Space>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            );
          }}
        />
      </div>
    </Wrapper>
  );
};

export default PaymentHistoryDetail;
