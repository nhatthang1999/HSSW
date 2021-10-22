import React, { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
  // useSelector
} from "react-redux";
import { useParams } from "react-router-dom";
// import _ from "lodash";
import styled from "styled-components";
import { Row, Col, Divider, Collapse, Space } from "antd";
import { getDetailOfDoctor } from "../../../../reducers/adminManagement/DoctorManagement";
import {
  getAllFaculty,
  getAllSpecialtyGroupByAcademicForAdmin,
} from "../../../../reducers/Public";
import DoctorHeader from "../../../../assets/image/doctor_header.jpg";
import _ from "lodash";
import BackButton from "../../../../component/BackButton";
import NumberFormat from "react-number-format";
const { Panel } = Collapse;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f1f9ff;

  padding: 20px 300px 100px;

  .searchDoctor {
    min-width: 80px;
    max-width: 200px;
  }

  .search_area {
    margin-bottom: 32px;
    .search_button {
      display: flex;
      margin-top: 16px;
      justify-content: flex-end;
    }
  }
  .header {
    padding: 70px 0 30px;
  }
  h1 {
    font-size: 28px;
    font-weight: 700;
    margin: 20px 0 50px 0;
    text-align: start;
    color: #286ba6;
  }
  .ant-descriptions-item-label {
    font-weight: bold;
  }
  .ant-descriptions-item-container {
  }
  .nav_link {
    color: #fff;
    margin-left: 10px;
  }

  /* .p.solid {
    border-style: solid;
  } */
  .doctor_about {
    white-space: pre-line;
    word-wrap: break-word;
  }
  .ant-collapse {
    margin-bottom: 20px;
    border-radius: 5px;
    .ant-collapse-header {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
    }
  }
  @media (max-width: 1440px) {
    padding: 20px 150px;
  }
  @media (max-width: 1199px) {
    padding: 20px 70px;
  }

  @media (max-width: 992px) {
    padding: 20px 50px;
    .doctor {
      .doctor_about {
        margin: 20px 0px;
      }
    }
  }
  @media (max-width: 767px) {
    padding: 20px 40px;
    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 576px) {
    padding: 20px 25px;
  }
`;

const BackButtonContainer = styled.div`
  width: 100%;
  padding: 20px 300px 20px;
  background-color: #f1f9ff;

  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  @media (max-width: 1440px) {
    padding: 20px 150px;
  }
  @media (max-width: 1199px) {
    padding: 20px 70px;
  }

  @media (max-width: 992px) {
    padding: 20px 50px;
    .doctor {
      .doctor_about {
        margin: 20px 0px;
      }
    }
  }
  @media (max-width: 767px) {
    padding: 20px 40px;
    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 576px) {
    padding: 20px 25px;
  }
`;

const Header = styled.div`
  width: 100%;
  max-height: 300px;
  padding: 20px 300px 20px;
  background: url(${DoctorHeader}) no-repeat 50% 50% / cover;
  border-bottom: 1px solid #e7eaec;
  .header {
    .img_container {
      width: 100%;
      max-width: 200px;
      height: auto;
      border-radius: 5px;
      border: 1px solid #e7eaec;
    }
    h1 {
      color: #4a4a4a;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 5px;
    }
  }

  @media (max-width: 1440px) {
    padding: 20px 150px;
  }
  @media (max-width: 1199px) {
    padding: 20px 70px;
  }

  @media (max-width: 992px) {
    padding: 20px 50px;
    .doctor {
      .doctor_about {
        margin: 20px 0px;
      }
    }
  }
  @media (max-width: 767px) {
    padding: 20px 40px;
    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 576px) {
    padding: 20px 25px;
  }
`;

const DetailDoctorPublic = () => {
  const [doctorDetail, setDoctorDetail] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getDetailOfDoctor(id));
      dispatch(getAllFaculty());
      dispatch(getAllSpecialtyGroupByAcademicForAdmin());
      setDoctorDetail(response);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const specialtyGroupByAcademic = useSelector((state) =>
    state.homePublic?.specialtyGroupByAcademic
      ? state.homePublic?.specialtyGroupByAcademic
      : []
  );

  const getSpecialty = () => {
    let specialty = [];
    if (!_.isEmpty(specialtyGroupByAcademic)) {
      specialtyGroupByAcademic.forEach((element) => {
        element?.list_specialty_response.forEach((ele) => {
          specialty.push(ele);
        });
      });
    }
    const doctorSpecialtyId = doctorDetail?.list_specialty_id;
    let doctorSpecialty = [];
    if (!_.isEmpty(doctorSpecialtyId)) {
      specialty.forEach((element) => {
        doctorSpecialtyId.forEach((id) => {
          if (id === element.specialty_id) {
            doctorSpecialty.push(element.specialty_name);
          }
        });
      });
    }
    return _.join(doctorSpecialty, ", ");
  };

  return (
    <>
      <BackButtonContainer>
        <BackButton />
      </BackButtonContainer>
      <Header>
        <div className="header">
          <Row gutter={[16]}>
            <Col lg={4} md={8} sm={12} xs={12}>
              <img src={doctorDetail.image} alt="" className="img_container" />
            </Col>
            <Col lg={20} md={16} sm={12} xs={12}>
              <h1>{`${getSpecialty()}, Bác sĩ ${doctorDetail.full_name}`}</h1>
            </Col>
          </Row>
        </div>
      </Header>
      <Wrapper>
        <Divider orientation="right">Thông tin chi tiết</Divider>
        <Row gutter={[16]}>
          <Col lg={8} xs={24}>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Giới thiệu" key="1">
                <div className="doctor_about">
                  <p>{doctorDetail.about}</p>
                </div>
              </Panel>
            </Collapse>
          </Col>
          <Col lg={8} xs={24}>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Giải thưởng" key="1">
                <div className="doctor_about">
                  <p>{doctorDetail.awards}</p>
                </div>
              </Panel>
            </Collapse>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Kinh nghiệm" key="1">
                <div className="doctor_about">
                  <p>{doctorDetail.experience}</p>
                </div>
              </Panel>
            </Collapse>
          </Col>
          <Col lg={8} xs={24}>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Học vị" key="1">
                <div className="doctor_about">{getSpecialty()}</div>
              </Panel>
            </Collapse>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Khoa" key="1">
                <div className="doctor_about">
                  {doctorDetail?.faculty?.faculty_name}
                </div>
              </Panel>
            </Collapse>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Giá khám" key="1">
                <div className="doctor_about">
                  <Space>
                    <NumberFormat
                      value={doctorDetail?.price}
                      displayType={"text"}
                      thousandSeparator={true}
                    />
                    VND
                  </Space>
                </div>
              </Panel>
            </Collapse>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Quá trình đào tạo" key="1">
                <div className="doctor_about">
                  <p>{doctorDetail.training_process}</p>
                </div>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </Wrapper>
    </>
  );
};

export default DetailDoctorPublic;
