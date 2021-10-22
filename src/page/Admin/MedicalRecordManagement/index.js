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
import { getMedicalRecordsBySearch } from "../../../reducers/MedicalRecordManagement";
import { Link, useHistory, useLocation } from "react-router-dom";
import AddMedicalRecordModal from "../../../component/AddMedicalRecordModal";
import moment from "moment";
import _ from "lodash";
import { STAFF } from "../../../constant/role";
import { getAuthorization } from "../../../reducers/Login";
import EditMedicalRecordModal from "../../../component/EditMedicalRecordModal";
import {
  SearchOutlined,
  LoadingOutlined,
  EyeOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { checkObjectSearch } from "../../../common";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #f1f9ff;
  padding: 30px 50px 100px;

  /* color: #3483eb; */
  .ant-btn {
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    &.add_button {
      position: relative;
      bottom: 49px;
    }
    &.add_button_no_paging {
      position: relative;
      bottom: -12px;
    }
  }
  .ant-picker {
    width: 100%;
    border-radius: 5px;
  }
  .ant-input {
    width: 100%;
    border-radius: 5px;
  }
  .search_area {
    margin-bottom: 20px;
    .search_button_area {
      display: flex;
      justify-content: flex-end;
      .search_button {
        border-radius: 5px;
      }
    }
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
  @media only screen and (max-width: 768px) {
    .ant-descriptions-item {
      padding-bottom: 16px;
      justify-content: flex-start;
    }
  }
  @media only screen and (max-width: 767px) {
    .ant-descriptions-item {
      padding-bottom: 16px;
    }
    .search_button {
      margin-top: 39px;
    }
  }
  @media only screen and (max-width: 575px) {
    .search_button {
      margin-top: 0;
    }
    .search_button_area {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const MedicalRecordManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [authorization, setAuthorization] = useState({});

  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    limit: 10,
    sort: "desc",
    order: "create_date",
  });
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    showSizeChanger: true,
    total: 0,
    responsive: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(
        getMedicalRecordsBySearch({ ...paramsSearch, ...params })
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
      const res = await dispatch(getAuthorization());
      setAuthorization(res);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputValues, setInputValues] = useState(
    _.omit(params, ["page", "limit", "sort", "order"])
  );

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
      order: !_.isUndefined(sorter.order) ? sorter.field : "create_date",
    });
    const params1 = new URLSearchParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.order === "ascend" ? "asc" : "desc",
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
        order: !_.isUndefined(sorter.order) ? sorter.field : "create_date",
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
      responsive: ["md"],
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
      title: "Mã khách hàng",
      dataIndex: "customer_code",
      key: "customer_code",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
      sorter: true,
    },
    {
      title: "Bệnh",
      dataIndex: "disease_name",
      key: "disease_name",
      sorter: true,
      responsive: ["xl"],
    },
    {
      title: "Dịch vụ khám",
      key: "action",
      responsive: ["md"],
      render: (text, record) => (
        <Tooltip title="Xem" placement="top">
          <Link
            to={`/${authorization.role}/serviceCart?customerCode=${record.customer_code}`}
          >
            <EyeOutlined />
          </Link>
        </Tooltip>
      ),
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
    {
      key: "edit",
      render: (text, record) =>
        authorization.role === STAFF && (
          <Tooltip title="Sửa" placement="top">
            <Button
              type="link"
              onClick={() => {
                setEditItem(record);
                setShowEdit(true);
              }}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
        ),
    },
  ];

  const [showAddNew, setShowAddNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const handleFetchData = async () => {
    setLoading(true);

    const response = await dispatch(
      getMedicalRecordsBySearch({ ...paramsSearch, ...params })
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

  const handleSearch = async () => {
    if (checkObjectSearch(inputValues)) {
      setMedicalRecords([]);
      setPagination({
        ...pagination,
        current: 1,
        total: 0,
      });
      await notification.error({
        message: "Yêu cầu phải nhập tiêu chí tìm kiếm!",
        duration: 2.5,
      });
    } else {
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

      const response = await dispatch(getMedicalRecordsBySearch(params));
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
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <h1>Quản lý hồ sơ bệnh án</h1>
        <div className="search_area">
          <Row gutter={[32, 16]}>
            <Col lg={8} md={12} sm={12} xs={24}>
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
            <Col lg={8} md={12} sm={12} xs={24}>
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
                      params.toDate ? moment(params.toDate, "DD/MM/YYYY") : ""
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
            <Col lg={8} md={12} sm={12} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Tên khách hàng"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <Input
                    name="customerName"
                    onChange={handleOnChange}
                    defaultValue={_.get(params, "customerName", "")}
                  />
                </Col>
              </Row>
            </Col>

            <Col lg={8} md={12} sm={12} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Mã khách hàng"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <Input
                    name="customerCode"
                    onChange={handleOnChange}
                    defaultValue={_.get(params, "customerCode", "")}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
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
            <Col lg={8} md={12} sm={12} xs={24} className="search_button_area">
              {/* <Tooltip title="Ấn vào đây để tìm kiếm" placement="right"> */}
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                className="search_button"
              >
                {/* <SearchOutlined /> */}
                Tìm kiếm
              </Button>
              {/* </Tooltip> */}
            </Col>
          </Row>
        </div>
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
      />

      {authorization.role === STAFF && (
        <Tooltip title="Tạo hồ sơ bệnh án" placement="right">
          <Button
            type="primary"
            icon={<PlusOutlined style={{ fontSize: "16px" }} />}
            className={
              dataWithIndex.length > 0 ? "add_button" : "add_button_no_paging"
            }
            onClick={() => setShowAddNew(true)}
          ></Button>
        </Tooltip>
      )}
      <AddMedicalRecordModal
        visible={showAddNew}
        onHide={() => setShowAddNew(false)}
        afterClose={handleFetchData}
      />
      <EditMedicalRecordModal
        visible={showEdit}
        onHide={() => setShowEdit(false)}
        afterClose={handleFetchData}
        item={editItem}
      />
    </Wrapper>
  );
};

export default MedicalRecordManagement;
