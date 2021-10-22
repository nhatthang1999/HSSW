import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Input,
  Table,
  Row,
  Col,
  Descriptions,
  DatePicker,
  Tooltip,
  notification,
} from "antd";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import {
  getMedicalRecordsBySearch,
  getProfile,
} from "../../../reducers/Customer";
import {
  SearchOutlined,
  LoadingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { checkObjectSearch } from "../../../common";
const Wrapper = styled.div`
  width: 100%;
  padding: 30px 300px 50px;
  min-height: 100vh;
  background-color: #f1f9ff;

  .search_area {
    .search_button_area {
      display: flex;
      justify-content: flex-end;
      .search_button {
        border-radius: 5px;
      }
    }
  }
  .info_container {
    border: 1px solid hsla(0, 0%, 100%, 0);
    clear: both;
    padding: 20px;
    position: relative;
    transition: box-shadow 0.2s, border 0.1s;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 10px;
    box-shadow: 4px 8px 20px rgb(0 0 0 / 5%);
    margin-bottom: 20px;
    background-color: #ffffff;
  }
  .ant-btn {
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .ant-picker {
    width: 100%;
    border-radius: 5px;
  }
  .ant-input {
    width: 100%;
    border-radius: 5px;
  }

  h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }

  .ant-descriptions-item {
    padding-bottom: 0;
    display: flex;
    justify-content: flex-end;
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
    border-radius: 5px;
  }
  @media (max-width: 1440px) {
    padding: 30px 150px 50px;
  }
  @media only screen and (max-width: 1199px) {
    padding: 30px 70px 50px;
  }
  @media only screen and (max-width: 992px) {
    padding: 30px 50px 50px;
  }
  @media only screen and (max-width: 767px) {
    .ant-descriptions-item {
      padding-bottom: 16px;
      display: flex;
      justify-content: flex-start;
    }
    .search_button {
      margin-top: 39px;
    }
    padding: 30px 40px 50px;
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
    padding: 30px 25px 50px;
  }
`;

const MedicalRecord = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    limit: 10,
    sort: "desc",
    order: "create_date",
    toDate: moment().format("DD/MM/YYYY"),
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    showSizeChanger: true,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [customerCode, setCustomerCode] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { code } = await dispatch(getProfile());
      setCustomerCode(code);
      const response = await dispatch(
        getMedicalRecordsBySearch({
          ...paramsSearch,
          ...params,
          customerCode: code,
        })
      );
      setMedicalRecords(response.listMedicalRecordResponse);
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputValues, setInputValues] = useState({
    ..._.omit(params, ["page", "limit", "sort", "order"]),
    toDate: moment().format("DD/MM/YYYY"),
  });

  const dataWithIndex = [];

  for (let i = 0; i < medicalRecords.length; i++) {
    dataWithIndex.push({
      key: (pagination.current - 1) * pagination.pageSize + i + 1,
      ...medicalRecords[i],
    });
  }

  const handleChange = async (pagination, filters, sorter) => {
    setLoading(true);
    setParamsSearch({
      ...paramsSearch,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.order === "ascend" ? "asc" : "desc",
      order: "create_date",
    });
    const params1 = new URLSearchParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.order === "descend" ? "desc" : "asc",
      order: !_.isUndefined(sorter.order) ? sorter.field : "create_date",
    });

    history.push(`${location.pathname}?${params1.toString()}`);
    setPagination({
      ...pagination,
      current: pagination.current,
    });
    const response = await dispatch(
      getMedicalRecordsBySearch({
        ...inputValues,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sorter.order === "ascend" ? "asc" : "desc",
        order: "create_date",
        customerCode: customerCode,
      })
    );
    setMedicalRecords(response.listMedicalRecordResponse);

    setPagination({
      ...pagination,
      total: response.totalItem,
    });
    setLoading(false);
  };

  const handleFromDateChange = (date) => {
    setInputValues({
      ...inputValues,
      fromDate: date ? moment(date).format("DD/MM/YYYY") : "",
    });
  };

  const handleToDateChange = (date) => {
    setInputValues({
      ...inputValues,
      toDate: date ? moment(date).format("DD/MM/YYYY") : "",
    });
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Mã hồ sơ",
      dataIndex: "medical_record_code",
      key: "medical_record_code",
    },
    {
      title: "Đợt khám",
      dataIndex: "create_date",
      key: "create_date",
      sorter: true,
    },
    {
      title: "Bệnh",
      dataIndex: "disease_name",
      key: "disease_name",
      //   sorter: true,
      responsive: ["xl"],
    },
    {
      key: "view detail",
      render: (text, record) => (
        <Tooltip title="Xem chi tiết" placement="top">
          <Link to={`${location.pathname}/${record.medical_record_id}`}>
            <EyeOutlined />
          </Link>
        </Tooltip>
      ),
    },
  ];

  const handleSearch = async () => {
    if (checkObjectSearch(inputValues))
      await notification.error({
        message: "Yêu cầu phải nhập tiêu chí tìm kiếm!",
        duration: 2.5,
      });
    else {
      setLoading(true);
      const params = {
        ...paramsSearch,
        ...inputValues,
        page: 1,
      };
      const params1 = new URLSearchParams({
        ...params,
      });

      history.push(`${location.pathname}?${params1.toString()}`);

      const response = await dispatch(
        getMedicalRecordsBySearch({ ...params, customerCode: customerCode })
      );
      setPagination({
        ...pagination,
        current: 1,
        total: response.totalItem,
      });
      setMedicalRecords(response.listMedicalRecordResponse);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="header">
        <h1>Quản lý hồ sơ bệnh án</h1>
      </div>
      <div className="info_container">
        <div className="search_area">
          <Row gutter={[32, 16]}>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className="d-flex align-items-center justify-end"
                >
                  <Descriptions>
                    <Descriptions.Item label="Từ ngày"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    name="fromDate"
                    placeholder="DD/MM/YYYY"
                    onChange={handleFromDateChange}
                    defaultValue={
                      params.fromDate
                        ? moment(params.fromDate, "DD/MM/YYYY")
                        : ""
                    }
                    disabledDate={(current) => {
                      return (
                        current &&
                        current >
                          moment(inputValues.toDate, "DD/MM/YYYY").endOf("day")
                      );
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Đến ngày"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    name="toDate"
                    placeholder="DD/MM/YYYY"
                    onChange={handleToDateChange}
                    defaultValue={
                      params.toDate
                        ? moment(params.toDate, "DD/MM/YYYY")
                        : moment()
                    }
                    disabledDate={(current) => {
                      return (
                        current &&
                        current <
                          moment(inputValues.fromDate, "DD/MM/YYYY").endOf(
                            "day"
                          )
                      );
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Mã hồ sơ"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <Input
                    name="medicalRecordCode"
                    onChange={handleOnChange}
                    defaultValue={_.get(params, "medicalRecordCode", "")}
                  />
                </Col>
              </Row>
            </Col>
            <Col
              xl={24}
              lg={12}
              md={12}
              sm={12}
              xs={24}
              className="search_button_area"
            >
              <Tooltip title="Ấn vào đây để tìm kiếm" placement="right">
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                  className="search_button"
                >
                  Tìm kiếm
                </Button>
              </Tooltip>
            </Col>
          </Row>
        </div>
      </div>
      <div className="info_container">
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
        />
      </div>
    </Wrapper>
  );
};

export default MedicalRecord;
