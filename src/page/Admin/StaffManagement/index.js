import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { getStaffBySearch } from "../../../reducers/StaffManagement";
import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Table,
  Input,
  Button,
  Col,
  Row,
  Descriptions,
  Typography,
  notification,
  Tooltip,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  LoadingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import { checkObjectSearch } from "../../../common";
import { getStaffBySearch } from "../../../reducers/adminManagement/StaffManagement";
const { Text } = Typography;
// const { Search } = Input;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #f1f9ff;
  padding: 30px 50px 100px;
  .search_area {
    margin-bottom: 20px;
    .search_button_area {
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
    .nav_link {
      color: #fff;
      margin-left: 10px;
    }
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
    border-radius: 5px !important;
  }
  .ant-input {
    width: 100%;
    border-radius: 5px;
  }

  @media only screen and (max-width: 1199px) {
    .search_area {
      .search_button_area {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .ant-descriptions-item {
      padding-bottom: 14px;
    }
  }
  @media only screen and (max-width: 575px) {
    .ant-descriptions-item {
      padding-bottom: 14px;
      justify-content: flex-start;
    }
    .ant-btn {
      &.add_button {
        position: relative;
        bottom: 44px;
      }
    }
  }
`;

const StaffManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));

  const [staff, setStaff] = useState([]);

  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    limit: 10,
    sort: "asc",
    order: "code",
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    showSizeChanger: true,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(
        getStaffBySearch({ ...paramsSearch, ...params })
      );

      setStaff(response.listStaffResponse);
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
  const [inputValues, setInputValues] = useState(
    _.omit(params, ["page", "limit", "sort", "order"])
  );

  const dataWithIndex = [];

  for (let i = 0; i < staff.length; i++) {
    dataWithIndex.push({
      key: (pagination.current - 1) * pagination.pageSize + i + 1,
      ...staff[i],
    });
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleSearch = async () => {
    if (checkObjectSearch(inputValues)) {
      setStaff([]);
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

      const response = await dispatch(getStaffBySearch(params));
      setPagination({
        ...pagination,
        current: 1,
        total: response.totalItem,
      });
      setStaff(response.listStaffResponse);
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "60px",
      responsive: ["md"],
    },
    {
      title: "Họ tên",
      dataIndex: "full_name",
      key: "full_name",
      sorter: true,
    },
    {
      title: "Mã nhân viên",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
      ellipsis: {
        showTitle: false,
      },
      render: (email) => (
        <Tooltip placement="topLeft" title={email}>
          {email}
        </Tooltip>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: "150px",
      responsive: ["md"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (status) => (
        <>
          {status === "Inactive" ? (
            <Text type="danger">Ngưng làm việc</Text>
          ) : (
            <Text type="success">Đang làm việc</Text>
          )}
        </>
      ),
    },
    {
      key: "view detail",
      title: "Thông tin cá nhân",
      render: (text, record) => (
        <Tooltip title="Xem thông tin cá nhân" placement="top">
          <Link to={`${location.pathname}/${record.staff_id}`}>
            <EyeOutlined />
          </Link>
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
      sort: sorter.order === "descend" ? "desc" : "asc",
      order: !_.isUndefined(sorter.order) ? sorter.field : "code",
    });

    const params1 = new URLSearchParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.order === "descend" ? "desc" : "asc",
      order: !_.isUndefined(sorter.order) ? sorter.field : "code",
    });

    history.push(`${location.pathname}?${params1.toString()}`);
    setPagination({
      ...pagination,
      current: pagination.current,
    });
    await dispatch(
      getStaffBySearch({
        ...params,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sorter.order === "descend" ? "desc" : "asc",
        order: !_.isUndefined(sorter.order) ? sorter.field : "code",
      })
    ).then((res) => {
      setStaff(res.listStaffResponse);
      setPagination({
        ...pagination,
        total: res.totalItem,
      });
    });
    setLoading(false);
  };
  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <h1>Quản lý Nhân viên</h1>
        <div className="search_area">
          <Row gutter={[32, 16]}>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={8}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Tên nhân viên"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={16} xs={24}>
                  <Input
                    name="staffName"
                    onChange={handleOnChange}
                    defaultValue={_.get(params, "staffName", "")}
                  />
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={8}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Mã nhân viên"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={16} xs={24}>
                  <Input
                    name="staffCode"
                    onChange={handleOnChange}
                    defaultValue={_.get(params, "staffCode", "")}
                  />
                </Col>
              </Row>
            </Col>
            <Col
              xl={8}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              className="search_button_area"
            >
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
      <Tooltip title="Thêm nhân viên" placement="right">
        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontSize: "16px" }} />}
          className={
            dataWithIndex.length > 0 ? "add_button" : "add_button_no_paging"
          }
          href={`${location.pathname}/add`}
        ></Button>
      </Tooltip>
    </Wrapper>
  );
};

export default StaffManagement;
