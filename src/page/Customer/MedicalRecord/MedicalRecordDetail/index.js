import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Collapse, Descriptions, Skeleton, Table, Button } from "antd";
import BackButton from "../../../../component/BackButton";
import { getListDetailByMedicalRecordId } from "../../../../reducers/Customer";
import _ from "lodash";
import { LoadingOutlined, PrinterOutlined } from "@ant-design/icons";
import PrintData from "../ExportPDFMedicalRecord";

const { Panel } = Collapse;

const Wrapper = styled.div`
  width: 100%;
  /* color: #3483eb; */
  padding: 20px 300px 50px;
  min-height: 100vh;
  background: #f1f9ff;
  .header {
    text-align: center;
  }
  .ant-btn {
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
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
  .info_container {
    border: 1px solid hsla(0, 0%, 100%, 0);
    clear: both;
    padding: 16px;
    position: relative;
    transition: box-shadow 0.2s, border 0.1s;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 5px;
    box-shadow: 4px 8px 20px rgb(0 0 0 / 5%);
    background-color: #ffffff;
  }
  .note {
    word-break: break-word;
    /* overflow-wrap: break-word; */
    white-space: pre-line;
    margin-bottom: 0;
  }
  @media (max-width: 1440px) {
    padding: 20px 150px 50px;
  }
  @media (max-width: 1200px) {
    padding: 20px 70px 50px;
  }
  @media (max-width: 992px) {
    padding: 20px 50px 50px;
  }

  @media only screen and (max-width: 767px) {
    .ant-descriptions-item {
      padding-bottom: 16px;
    }
    .search_button {
      margin-top: 39px;
    }
    padding: 20px 40px 50px;
  }
  @media only screen and (max-width: 575px) {
    .search_button {
      margin-top: 0;
    }
    .search_area {
      .search_button_area {
        display: flex;
        justify-content: flex-end;
      }
    }
    padding: 20px 25px 50px;
  }
`;
const MedicalRecordDetailCustomer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));

  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    limit: 10,
    sort: "desc",
    medicalRecordId: id,
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    showSizeChanger: true,
    total: 0,
  });

  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [dataPrint, setDataPrint] = useState();
  const printRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoadingInfo(true);
      const response = await dispatch(
        getListDetailByMedicalRecordId({ ...paramsSearch, params })
      );
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

  const { customerDetail = {}, medicalRecordDetail = [] } = useSelector(
    (state) => (state.customer ? state.customer : {})
  );

  const { list_medical_detail = [] } = medicalRecordDetail;

  const dataWithIndex = [];

  for (let i = 0; i < list_medical_detail.length; i++) {
    dataWithIndex.push({
      key: (pagination.current - 1) * pagination.pageSize + i + 1,
      ...list_medical_detail[i],
    });
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      responsive: ["sm"],
    },
    {
      title: "Ng??y kh??m",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: "Th???i gian",
      dataIndex: "created_hour",
      key: "created_hour",
    },
    // {
    //   title: "M?? b??c s??",
    //   dataIndex: "doctor_code",
    //   key: "doctor_code",
    // },
    {
      title: "T??n b??c s??",
      dataIndex: "doctor_name",
      key: "doctor_name",
    },
    {
      title: "Di???n bi???n",
      dataIndex: "helppenings",
      key: "helppenings",
      render: (helppenings) => <p className="note">{helppenings}</p>,
    },
    {
      title: "Y l???nh",
      dataIndex: "prescription",
      key: "prescription",
      render: (prescription) => <p className="note">{prescription}</p>,
    },
  ];

  const handleChange = async (pagination, filters, sorter) => {
    setLoading(true);
    setParamsSearch({
      ...paramsSearch,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.order === "ascend" ? "asc" : "desc",
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
      getListDetailByMedicalRecordId({
        ...paramsSearch,
        page: pagination.current,
        limit: pagination.pageSize,
      })
    );

    setPagination({
      ...pagination,
      total: response.totalItem,
    });
    setLoading(false);
  };

  const [paramPrint] = useState({
    medicalRecordId: id,
    page: 1,
    limit: 50,
    sort: "desc",
  });

  const handlePrint = async () => {
    const response = await dispatch(getListDetailByMedicalRecordId(paramPrint));
    setDataPrint(response);
    printRef.current.click();
  };

  return (
    <Wrapper>
      <div className="header">
        <BackButton />
        <div className="d-flex justify-between">
          <h1>H??? s?? b???nh ??n</h1>
          <Button
            type="primary"
            onClick={handlePrint}
            icon={<PrinterOutlined />}
            className="print_button"
          />
        </div>
        <div style={{ display: "none" }}>
          {dataPrint && customerDetail && (
            <PrintData
              dataPrint={dataPrint}
              customerDetail={customerDetail}
              printRef={printRef}
            />
          )}
        </div>
      </div>
      <Collapse
        defaultActiveKey={["1", "2"]}
        expandIconPosition="right"
        className="info"
      >
        <Panel header="Th??ng tin kh??ch h??ng" key="1">
          <Skeleton active loading={loadingInfo}>
            <Descriptions
              bordered
              column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="M?? kh??ch h??ng">
                {customerDetail.code}
              </Descriptions.Item>
              <Descriptions.Item label="H??? t??n">
                {customerDetail.full_name}
              </Descriptions.Item>
              <Descriptions.Item label="Gi???i t??nh">
                {customerDetail.sex ? "Nam" : "N???"}
              </Descriptions.Item>
              <Descriptions.Item label="Ng??y sinh">
                {customerDetail.birth_day}
              </Descriptions.Item>
              <Descriptions.Item label="S??? ??i???n tho???i">
                {customerDetail.phone}
              </Descriptions.Item>
              <Descriptions.Item label="?????a ch???">
                {customerDetail.address}
              </Descriptions.Item>
              <Descriptions.Item label="Nh??m m??u">
                {customerDetail.blood}
              </Descriptions.Item>
              <Descriptions.Item label="Ti???n s??? b???nh ??n">
                {customerDetail.medicalHistory}
              </Descriptions.Item>
            </Descriptions>
          </Skeleton>
        </Panel>
        <Panel header="Th??ng tin ?????t kh??m" key="2">
          <Skeleton active loading={loadingInfo}>
            <Descriptions
              bordered
              column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="?????t kh??m">
                {medicalRecordDetail.create_date}
              </Descriptions.Item>
              <Descriptions.Item label="B???nh">
                {medicalRecordDetail.disease_name}
              </Descriptions.Item>
              <Descriptions.Item label="Ghi ch??">
                {medicalRecordDetail.note}
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
        />
      </div>
    </Wrapper>
  );
};

export default MedicalRecordDetailCustomer;
