import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Row, Col } from "antd";
import { LogoSaleNoti, FacebookIcon } from "../../assets/image";
import { useSelector } from "react-redux";
// import GoogleMapReact from 'google-map-react';

const Wrapper = styled.div`
  width: 100%;
  /* color: #ffffff; */
  background-color: #e9f0f6;
  padding: 30px 300px;
  position: relative;
  .copy_right {
    padding-top: 20px;
    width: 100%;
    color: #000000;
    text-align: center;
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 6px;
    background: linear-gradient(
      94.15deg,
      #b3a078 4.94%,
      #eed7ae 56.61%,
      #beaa82 99.46%
    );
    left: 0;
    top: 0;
  }
  .rowFooter {
    width: 100%;
    .colFooter {
      color: #000;
      .title {
        text-transform: uppercase;
        font-family: Helvetica, Arial, san-serif;
        font-size: 15px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        margin-bottom: 20px;
      }
      .detail {
        font-size: 15px;
        line-height: 35px;
      }
    }
  }

  .footer-social {
    width: 100%;
    max-width: unset;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    display: flex;
  }
  .footer-social_icon {
    display: flex;
    flex-direction: row;
    padding-left: 5px;
  }
  .nav_item {
    color: #1890ff;
  }
  @media (max-width: 1440px) {
    padding: 30px 150px;
  }
  @media (max-width: 1199px) {
    padding: 30px 70px;
  }
  @media (max-width: 1023px) {
    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 992px) {
    padding: 30px 50px;
  }
  @media (max-width: 767px) {
    padding: 30px 40px;
  }
  @media (max-width: 576px) {
    padding: 30px 25px;
  }
`;

const Footer = () => {
  const isAuthenticated = useSelector((state) =>
    state.login.isAuthenticated ? state.login.isAuthenticated : false
  );
  return (
    <Wrapper>
      <Row
        className="rowFooter"
        gutter={[
          { xs: 8, sm: 16, md: 16, lg: 16 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xl={6} lg={6} md={12} sm={12} xs={24}>
          <div className="footer-social">
            <h3 style={{ fontWeight: "500" }}>Theo dõi chúng tôi</h3>
            <div className="footer-social_icon">
              <a href="https://www.facebook.com/Hopital-Service-Website-100183605699090">
                <FacebookIcon />
              </a>
            </div>
          </div>
          <div className="logo">
            <LogoSaleNoti />
          </div>
        </Col>
        <Col xl={4} lg={4} md={12} sm={12} xs={24}>
          <h3 style={{ fontWeight: "500" }}>VỀ CHÚNG TÔI</h3>
          <div className="content">
            <div className="detail">
              <NavLink to={`${!isAuthenticated ? "" : "/customer"}/aboutUs`}>
                <span className="nav_item">Thông tin bệnh viện</span>
              </NavLink>
            </div>
            <div className="detail">
              <NavLink
                to={`${!isAuthenticated ? "" : "/customer"}/doctorpublic`}
              >
                <span className="nav_item">Đội ngũ bác sĩ</span>
              </NavLink>
            </div>
          </div>
        </Col>
        <Col xl={4} lg={4} md={12} sm={12} xs={24}>
          <h3 style={{ fontWeight: "500" }}>KHÁCH HÀNG CẦN BIẾT</h3>
          <div className="content">
            <div className="detail">
              <NavLink to="/">
                <span className="nav_item">Liên hệ</span>
              </NavLink>
            </div>
            <div className="detail">
              <NavLink to={`${!isAuthenticated ? "/" : "/customer/booking"}`}>
                <span className="nav_item">Đặt lịch khám</span>
              </NavLink>
            </div>
            {/* <div className="detail">
              <NavLink to="/">
                <span className="nav_item">Dịch vụ</span>
              </NavLink>
            </div> */}
          </div>
        </Col>
        <Col xl={10} lg={10} md={12} sm={12} xs={24}>
          <div className="map">
            <div style={{ width: "100%" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4855345757956!2d105.52487025120578!3d21.013249985938256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345b465a4e65fb%3A0xaae6040cfabe8fe!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBGUFQ!5e0!3m2!1svi!2s!4v1628790459500!5m2!1svi!2s"
                width="100%"
                height="300"
                title="1"
                style={{ border: "0px" }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </Col>
      </Row>
      <div className="copy_right">
        <p style={{ marginBottom: "0" }}>
          Copyright © 2021 HSSW. All rights reserved
        </p>
      </div>
    </Wrapper>
  );
};

export default Footer;
