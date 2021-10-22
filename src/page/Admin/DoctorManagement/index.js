import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import {
  Table,
  Input,
  Button,
  Typography,
  Select,
  Row,
  Col,
  Descriptions,
  Tooltip,
  notification,
} from "antd";

import _ from "lodash";
import {
  SearchOutlined,
  PlusOutlined,
  EyeOutlined,
  LoadingOutlined,
  // DeleteOutlined,
  // EditOutlined,
} from "@ant-design/icons";
import { checkObjectSearch } from "../../../common";
import {
  getAllFacultyForAdmin,
  getAllSpecialtyGroupByAcademicForAdmin,
  getDoctorsBySearch,
} from "../../../reducers/adminManagement/DoctorManagement";

const { Text } = Typography;

const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #f1f9ff;
  padding: 30px 50px 100px;
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
  @media only screen and (max-width: 767px) {
    .ant-descriptions-item {
      padding-bottom: 14px;
      justify-content: flex-start;
    }
    .search_button {
      margin-top: 37px;
    }
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
    .ant-btn {
      &.add_button {
        position: relative;
        bottom: 44px;
      }
    }
  }
`;

const DoctorManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));

  const [doctors, setDoctors] = useState([]);

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
    responsive: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(
        getDoctorsBySearch({ ...paramsSearch, ...params })
      );
      dispatch(getAllFacultyForAdmin());
      dispatch(getAllSpecialtyGroupByAcademicForAdmin());

      setDoctors(response.listDoctorDetailsResponse);
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

  const { faculty = [] } = useSelector((state) =>
    state.doctorManagement ? state.doctorManagement : []
  );

  const [inputValues, setInputValues] = useState(
    _.omit(params, ["page", "limit", "sort", "order"])
  );

  const dataWithIndex = [];

  for (let i = 0; i < doctors.length; i++) {
    dataWithIndex.push({
      key: (pagination.current - 1) * pagination.pageSize + i + 1,
      ...doctors[i],
    });
  }
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
      title: "Mã bác sĩ",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: {
        showTitle: false,
      },
      responsive: ["xl"],
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
      responsive: ["xl"],
    },
    {
      title: "Khoa",
      dataIndex: "faculty",
      key: "faculty",
    },
    {
      title: "Học vị",
      dataIndex: "specialty",
      key: "specialty",
      responsive: ["md"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      responsive: ["md"],

      render: (status) => (
        <>
          {status === "Active" ? (
            <Text type="success">Đang làm việc</Text>
          ) : (
            <Text type="danger">Ngưng làm việc</Text>
          )}
        </>
      ),
    },
    {
      title: "Thông tin cá nhân",
      key: "view detail",
      render: (text, record) => (
        <Tooltip title="Xem chi tiết" placement="top">
          <Link to={`${location.pathname}/${record.doctor_id}`}>
            <EyeOutlined />
          </Link>
        </Tooltip>
      ),
    },
  ];
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSearch = async () => {
    if (checkObjectSearch(inputValues)) {
      setDoctors([]);
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

      const response = await dispatch(getDoctorsBySearch(params));
      setPagination({
        ...pagination,
        current: 1,
        total: response.totalItem,
      });
      setDoctors(response.listDoctorDetailsResponse);
      setLoading(false);
    }
  };

  const handleChangeFaculty = (facultyId) => {
    setInputValues({ ...inputValues, facultyId: facultyId });
  };
  const [contentSorter, setContentSorter] = useState("");

  const handleChange = async (pagination, filters, sorter) => {
    setLoading(true);
    setParamsSearch({
      ...paramsSearch,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.order === "descend" ? "desc" : "asc",
      order: !_.isUndefined(sorter.order) ? sorter.field : "code",
    });
    setContentSorter(
      sorter.order === "descend" ? "Sắp xếp giảm dần" : "Sắp xếp tăng dần"
    );
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
      getDoctorsBySearch({
        ...params,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sorter.order === "descend" ? "desc" : "asc",
        order: !_.isUndefined(sorter.order) ? sorter.field : "code",
      })
    ).then((res) => {
      setDoctors(res.listDoctorDetailsResponse);
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
        <h1>Quản lý Bác sĩ</h1>
        <div className="search_area">
          <Row gutter={[14, 14]}>
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
                    <Descriptions.Item label="Tên bác sĩ"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <Input
                    name="doctorName"
                    onChange={handleOnChange}
                    defaultValue={_.get(params, "doctorName", "")}
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
                    <Descriptions.Item label="Mã bác sĩ"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <Input
                    name="doctorCode"
                    onChange={handleOnChange}
                    defaultValue={_.get(params, "doctorCode", "")}
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
                    <Descriptions.Item label="Khoa"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <Select
                    defaultValue={
                      !_.isEmpty(_.get(params, "facultyId", ""))
                        ? faculty.filter(
                          (item) =>
                            item.faculty_id ===
                            Number(_.get(params, "facultyId", ""))
                        )[0].faculty_name
                        : ""
                    }
                    className="w-full"
                    onChange={(faculty) => handleChangeFaculty(faculty)}
                    name="facultyId"
                  >
                    <Option value="">--- Chọn Khoa để lọc ---</Option>
                    {faculty.map((faculty, key) => (
                      <Option key={key} value={faculty.faculty_id}>
                        {faculty.faculty_name}
                      </Option>
                    ))}
                  </Select>
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
        showSorterTooltip={{
          title: `${contentSorter}`,
        }}
      />
      <Tooltip title="Thêm bác sĩ" placement="right">
        {/* <NavLink to={`${location.pathname}/add`}> */}
        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontSize: "16px" }} />}
          className={
            dataWithIndex.length > 0 ? "add_button" : "add_button_no_paging"
          }
          href={`${location.pathname}/add`}
        ></Button>
        {/* </NavLink> */}
      </Tooltip>
    </Wrapper>
  );
};

export default DoctorManagement;
