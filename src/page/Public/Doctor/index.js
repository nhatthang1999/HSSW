import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  Input,
  Button,
  Select,
  Row,
  Col,
  Descriptions,
  Pagination,
  Skeleton,
  Space,
} from "antd";
import _ from "lodash";
import { SearchOutlined } from "@ant-design/icons";
import {
  getDoctorsBySearch,
  getAllFaculty,
  getAllSpecialtyGroupByAcademicForAdmin,
} from "../../../reducers/Public";
import { Icon } from "@iconify/react";
import userGraduate from "@iconify/icons-fa-solid/user-graduate";
import doctorIcon from "@iconify/icons-maki/doctor";
const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 30px 300px 100px;
  margin: auto;
  background-color: #f1f9ff;

  .search_area {
    margin-bottom: 16px;
    .search_button {
      display: flex;
      /* margin-top: 16px; */
      justify-content: flex-end;
    }
  }
  .ant-btn {
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }
  h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 0;
    padding-bottom: 20px;
    text-align: start;
    color: #286ba6;
  }
  .ant-descriptions-item {
    padding-bottom: 0;
    display: flex;
    justify-content: flex-end;
  }
  .ant-descriptions-item-label {
    font-weight: bold;
  }
  .ant-descriptions-item-container {
  }
  .info_container {
    border: 1px solid hsla(0, 0%, 100%, 0);
    clear: both;
    padding: 16px;
    position: relative;
    background-color: #ffffff;
    transition: box-shadow 0.2s, border 0.1s;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 10px;
    box-shadow: 4px 8px 20px rgb(0 0 0 / 5%);
  }
  .nav_link {
    color: #fff;
    margin-left: 10px;
  }
  .img_container {
    /* width: 100%;
    height: 250px;
    object-fit: cover; */
    width: 100%;
    max-width: 400px;
    height: auto;
  }
  .ant-select-selector {
    border-radius: 5px !important;
  }
  .pagination {
    margin-top: 20px;
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

  h2 {
    font-size: 18px;
    font-weight: 500;
  }
  .doctor_info {
    display: flex;
    flex-direction: column;
    a {
      margin-bottom: 16px;
    }
    .doctor_name {
      font-size: 20px;
      font-weight: 500;
    }
    .doctor_info_item {
      margin-bottom: 0;
      color: #0066a6;
    }
  }
  .doctor {
    padding: 15px 0;
    position: relative;
    transition: box-shadow 0.2s, border 0.1s;

    .doctor_container {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      padding: 15px;
      border: 1px solid hsla(0, 0%, 100%, 0);
      clear: both;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.14);

      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        box-shadow: 4px 8px 20px rgb(0 0 0 / 5%);
      }
    }
    .doctor_about {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      white-space: pre-line;
    }
  }
  a {
    color: #0066a6;
    transition: all 0.1s;
    &:hover {
      text-decoration: underline;
    }
  }
  .see_more {
    display: flex;
    justify-content: flex-end;
  }
  @media (max-width: 1440px) {
    padding: 30px 150px;
  }
  @media (max-width: 1199px) {
    padding: 30px 70px;
  }

  @media (max-width: 992px) {
    padding: 30px 50px;
    .doctor {
      .doctor_about {
        margin: 20px 0px;
      }
    }
  }
  @media (max-width: 767px) {
    padding: 30px 40px;
    .hidden_responsive {
      display: none !important;
    }
    .ant-descriptions-item {
      padding-bottom: 0;
      display: flex;
      justify-content: flex-start;
    }
    .search_area {
      .search_button {
        margin-top: 23px;
      }
    }
  }
  @media (max-width: 576px) {
    padding: 30px 25px;
    .search_area {
      .search_button {
        margin-top: 0;
      }
    }
  }
`;

const PublicDoctor = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));

  const [doctors, setDoctors] = useState([]);

  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    limit: 5,
    sort: "asc",
    order: "code",
    doctorCode: "BS",
    isActive: true,
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(
        getDoctorsBySearch({ ...paramsSearch, ...params })
      );

      setDoctors(response.listDoctorDetailsResponse);
      dispatch(getAllFaculty());
      dispatch(getAllSpecialtyGroupByAcademicForAdmin());

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
    state.homePublic ? state.homePublic : []
  );

  const specialtyGroupByAcademic = useSelector((state) =>
    state.homePublic.specialtyGroupByAcademic
      ? state.homePublic.specialtyGroupByAcademic
      : []
  );

  const [inputValues, setInputValues] = useState(
    _.omit(params, ["page", "limit", "sort", "order", "doctorCode"])
  );

  const dataWithIndex = [];

  for (let i = 0; i < doctors.length; i++) {
    dataWithIndex.push({
      ...doctors[i],
    });
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSearch = async () => {
    setLoading(true);
    const params = {
      ...paramsSearch,
      ...inputValues,
    };
    const params1 = new URLSearchParams({
      ...params,
    });

    history.push(`${location.pathname}?${params1.toString()}`);

    const response = await dispatch(
      getDoctorsBySearch({ ...params, ...paramsSearch })
    );

    setPagination({
      ...pagination,
      current: 1,
      total: response.totalItem,
    });
    setDoctors(response.listDoctorDetailsResponse);
    setLoading(false);
  };

  const handleChangeFaculty = (facultyId) => {
    setInputValues({ ...inputValues, facultyId: facultyId });
  };

  const handleChangeSpecialty = (specialtyId) => {
    setInputValues({ ...inputValues, specialtyId: specialtyId });
  };

  const onChange = async (page) => {
    setLoading(true);

    setParamsSearch({
      ...paramsSearch,
      page: page,
      limit: pagination.pageSize,
    });

    const params1 = new URLSearchParams({
      ...params,
      page: page,
      limit: pagination.pageSize,
    });

    setPagination({
      ...pagination,
      current: page,
    });

    history.push(`${location.pathname}?${params1.toString()}`);

    const response = await dispatch(
      getDoctorsBySearch({ ...params, ...paramsSearch, page: page })
    );

    setDoctors(response.listDoctorDetailsResponse);
    setLoading(false);
  };

  return (
    <Wrapper>
      <div className="header">
        <h1>Danh sách bác sĩ</h1>
        <div className="search_area info_container">
          <Row gutter={[32, 16]}>
            <Col lg={8} md={12} sm={12} xs={24}>
              <Row>
                <Col lg={8} md={8} sm={24} xs={24}>
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
                    <Option value="">--- Chọn Khoa ---</Option>
                    {faculty.map((faculty, key) => (
                      <Option key={key} value={faculty.faculty_id}>
                        {faculty.faculty_name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
              <Row>
                <Col lg={8} md={8} sm={24} xs={24}>
                  <Descriptions>
                    <Descriptions.Item label="Học vị"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <Select
                    defaultValue={
                      !_.isEmpty(_.get(params, "specialtyId", ""))
                        ? faculty.filter(
                            (item) =>
                              item.faculty_id ===
                              Number(_.get(params, "specialtyId", ""))
                          )[0].faculty_name
                        : ""
                    }
                    className="w-full"
                    onChange={(specialtyId) =>
                      handleChangeSpecialty(specialtyId)
                    }
                    name="specialtyId"
                  >
                    <Option value="">--- Chọn học vị ---</Option>
                    {specialtyGroupByAcademic.map((group, key) => {
                      return group.list_specialty_response.map((item) => {
                        return (
                          <Option value={item.specialty_id}>
                            {item.specialty_name}
                          </Option>
                        );
                      });
                    })}
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col lg={8} md={12} sm={12} xs={24}>
              <Row>
                <Col lg={8} md={8} sm={24} xs={24}>
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
            <Col lg={24} md={12} sm={12} xs={24}>
              <div className="search_button">
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                >
                  Tìm kiếm
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="list_doctors">
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 24 },
            { xs: 2, sm: 4, md: 6, lg: 8 },
          ]}
          className="list_doctors_row"
        >
          <Skeleton loading={loading} active />
          <Skeleton loading={loading} active />
          <Skeleton loading={loading} active />
          <Skeleton loading={loading} active />
          {dataWithIndex.map((item, index) => {
            return (
              <Col
                lg={24}
                md={24}
                sm={24}
                xs={24}
                key={index}
                className="doctor"
              >
                <div className="doctor_container">
                  <Row gutter={16}>
                    <Col lg={4} md={6} sm={8} xs={8}>
                      <img className="img_container" src={item.image} alt="" />
                    </Col>
                    <Col lg={8} md={18} sm={16} xs={16}>
                      <div className="doctor_info">
                        <Link
                          to={`${location.pathname}/${item.doctor_id}`}
                          className="doctor_name"
                        >
                          {"Bác sĩ " + item.full_name}
                        </Link>
                        <div className="flex items-center">
                          <Space>
                            <Icon icon={userGraduate} />
                            <p className="doctor_info_item">{item.specialty}</p>
                          </Space>
                        </div>
                        <div className="flex items-center">
                          <Space>
                            <Icon icon={doctorIcon} />
                            <p className="doctor_info_item">{item.faculty}</p>
                          </Space>
                        </div>
                      </div>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                      <div className="doctor_about">
                        <p>{item.about}</p>
                      </div>
                      <Link
                        to={`${location.pathname}/${item.doctor_id}`}
                        className="see_more"
                      >
                        {"Xem thêm >>"}
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <Pagination
        {...pagination}
        onChange={onChange}
        className="flex item-center justify-center pagination"
      />
    </Wrapper>
  );
};

export default PublicDoctor;
