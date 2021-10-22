import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import MessengerCustomerChat from "react-messenger-customer-chat";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Row, Col, Badge, Skeleton } from "antd";
import { getTop3Doctor, getTop3News } from "../../../reducers/Public";
import Slider from "react-slick";
import SliderImg from "../../../component/Slider";
import Footer from "../../../components/PublicFooter";
import background from "../../../assets/image/background.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";
import { Logo } from "../../../assets/image";
import _ from "lodash";
import HeaderDropdown from "../../../component/HeaderDropdown";
import PublicSidebar from "../../../components/PublicSidebar";

AOS.init();
const Wrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;
const Header = styled.div`
  height: 60px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 300px;
  z-index: 39;
  transition: height 0.5s ease 0s, background-color 0.5s ease 0s;
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 5%);

  .main-menu-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    a {
      color: #000000;
      &:hover {
        color: #fec749;
      }
    }
  }

  .login_button {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    color: #ffffff;
    position: relative;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  .no_padding {
    padding: 0 !important;
  }
  .header_link {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    color: #000000;
    position: relative;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    .nav_item {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .nav_item::before {
      content: "";
      width: 0;
      left: 50%;
      height: 2px;
      bottom: 0;
      transform: translateX(-50%);
      background-color: #f6ae36;
      position: absolute;
    }
    .nav_item:hover::before {
      background-color: #f6ae36;
    }
    .nav_item:hover::before {
      width: 80%;
      transition: width 0.5s ease 0s;
    }
    .nav_item {
      .ant-ribbon {
        top: -16px;
      }
      .ant-ribbon.ant-ribbon-placement-end {
        right: -16px;
        border-bottom-right-radius: 0;
      }
    }
    &.selected {
      color: #fec749;
    }
  }

  .logo {
    height: 100%;
    padding: 0 !important;
    justify-content: flex-start;
  }
  @media (max-width: 1440px) {
    padding: 0 150px;
  }
  @media (max-width: 1199px) {
    padding: 0 70px;
  }
  @media (max-width: 1023px) {
    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 992px) {
    padding: 0 50px;
  }
  @media (max-width: 767px) {
    padding: 0 40px;
  }
  @media (max-width: 576px) {
    padding: 0 25px;
  }
`;

const News = styled.div`
  width: 100%;
  padding: 30px 300px 30px;
  .heading_title {
    width: 100%;
    font-size: 26px;
    font-weight: 600;
    line-height: 35px;
    position: relative;
    text-align: center;
    color: #286ba6;
    margin-bottom: 35px;
    padding-bottom: 12px;
    text-transform: capitalize;
    &:before,
    &:after {
      content: "";
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
    }
    &:before {
      bottom: 0;
      height: 1px;
      width: 220px;
      background-color: #c7c6c6;
    }
    &:after {
      height: 3px;
      bottom: -1px;
      width: 100px;
      background-color: #0064af;
    }
  }
  .news_content_container {
    margin-top: 20px;
    .news_content {
      font-size: 16px;
      color: black;
    }
    .news_title {
      font-size: 20px;
      font-weight: 500;
      line-height: 25px;
      position: relative;
      margin-bottom: 5px;
    }
  }

  .img_slider {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
  .img_right {
    width: 100%;
    height: 220px;
    object-fit: cover;
  }
  .news_container_right {
    width: 100%;
    height: 50%;
    .news_content_container {
      margin-top: 10px;
      .news_content {
        font-size: 16px;
        color: black;
      }
      .news_title {
        font-size: 16px;
        font-weight: 500;
        line-height: 32px;
        position: relative;
        margin-bottom: 20px;
      }
    }
  }
  .slick-next,
  .slick-prev {
    width: 40px;
    height: 140px;
    bottom: calc(33.33% - 40px);
    z-index: 2;
    opacity: 1;
    &:before {
      font-size: 40px;
    }
  }
  .slick-next {
    right: 20px;
    top: initial;
  }
  .slick-prev {
    top: initial;
    left: 20px;
  }
  @media (max-width: 1441px) {
    padding: 30px 150px;
  }
  @media (max-width: 1200px) {
    padding: 30px 70px;
  }
  @media (max-width: 1025px) {
    .img_slider {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }
    .img_right {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
  @media (max-width: 992px) {
    padding: 30px 50px;
  }
  @media (max-width: 768px) {
    padding: 30px 40px;
  }
  @media (max-width: 576px) {
    padding: 30px 25px;
  }
`;

const BookDoctor = styled.div`
  width: 100%;
  padding: 30px 300px;

  .image_left {
    padding: 10px;
    .img_fluid {
      width: 100%;
      height: fit-content;
      object-fit: cover;
      border-radius: 20px;
    }
  }
  .content_right {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #286ba6;
    .slogan {
      padding: 30px;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: #7a7a7b 0px 2px 8px;
      transform: translateX(-100px);
      .title {
        width: 100%;
        font-size: 26px;
        font-weight: 600;
        line-height: 35px;
        position: relative;
        text-align: center;
        color: #286ba6;
        margin-bottom: 35px;
        padding-bottom: 12px;
        text-transform: capitalize;
        &:before,
        &:after {
          content: "";
          left: 50%;
          position: absolute;
          transform: translateX(-50%);
        }
        &:before {
          bottom: 0;
          height: 1px;
          width: 220px;
          background-color: #c7c6c6;
        }
        &:after {
          height: 3px;
          bottom: -1px;
          width: 100px;
          background-color: #0064af;
        }
      }
      .content {
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  @media (max-width: 1441px) {
    padding: 30px 150px;
  }
  @media (max-width: 1200px) {
    padding: 30px 70px;
    background: url(${background});
    background-attachment: fixed;
    .ant-row {
      justify-content: center;
    }
    .image_left {
      display: none;
    }
    .content_right {
      .slogan {
        transform: translateX(0);
      }
    }
  }
  @media (max-width: 992px) {
    padding: 30px 50px;
  }
  @media (max-width: 768px) {
    padding: 30px 40px;
  }
  @media (max-width: 576px) {
    padding: 30px 25px;
  }
`;

const Doctor = styled.div`
  width: 100%;
  padding: 30px 300px 100px;

  .heading_title {
    width: 100%;
    font-size: 26px;
    font-weight: 600;
    line-height: 35px;
    position: relative;
    text-align: center;
    color: #286ba6;
    margin-bottom: 35px;
    padding-bottom: 12px;
    text-transform: capitalize;
    &:before,
    &:after {
      content: "";
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
    }
    &:before {
      bottom: 0;
      height: 1px;
      width: 220px;
      background-color: #c7c6c6;
    }
    &:after {
      height: 3px;
      bottom: -1px;
      width: 100px;
      background-color: #0064af;
    }
  }
  .doctor_container {
    text-align: center;
    color: #286ba6;
    margin-bottom: 80px;
    position: relative;
    .pic {
      overflow: hidden;
      .img_fluid {
        /* max-width: 100%;
        height: auto; */
        width: 100%;
        object-fit: cover;
        height: 300px;
      }
    }
    .doctor_info {
      position: absolute;
      bottom: -80px;
      left: 20px;
      right: 20px;
      background: #fff;
      padding: 20px 0;
      color: #433f39;
      box-shadow: 0px 2px 15px rgb(0 0 0 / 10%);
      overflow: hidden;
      transition: max-height 0.5s ease-in-out;
      .doctor_name {
        font-weight: 500;
        margin-bottom: 10px;
        font-size: 18px;
        color: #6c665c;
        position: relative;
        padding-bottom: 10px;
        font-family: "Poppins", sans-serif;
      }
      .doctor_name::after {
        content: "";
        position: absolute;
        display: block;
        width: 50px;
        height: 1px;
        background: #ffcf88;
        bottom: 0;
        left: calc(50% - 25px);
      }
      .doctor_faculty {
        font-style: italic;
        display: block;
        font-size: 13px;
      }
    }
  }
  @media (max-width: 1441px) {
    padding: 30px 150px 100px;
  }
  @media (max-width: 1200px) {
    padding: 30px 70px 100px;
  }
  @media (max-width: 992px) {
    padding: 30px 50px 100px;
    .doctor_container {
      margin-bottom: 110px;
    }
  }
  @media (max-width: 768px) {
    padding: 30px 40px 100px;
  }
  @media (max-width: 576px) {
    padding: 30px 25px 100px;
  }
`;

const SeeMore = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: ${(props) => (props.center ? "center" : "flex-end")};
  margin-top: 20px;
  .see_more {
    padding: 10px 20px;
    color: #ffffff;
    background-color: #f6ae36;
    border-radius: 5px;
    .effect_link {
      color: #ffffff;
      overflow: hidden;
      position: relative;
    }
    /* .effect_link::before {
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      transition: transform 0.6s;
      background: rgba(255, 255, 255, 0.1);
      transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg)
        translate3d(0, -200%, 0);
    }
    .effect_link:hover::before {
      transform: scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1, 45deg)
        translate3d(0, 200%, 0);
    } */
  }
`;

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const getDimensions = (ele) => {
  if (!_.isNull(ele)) {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
      height,
      offsetTop,
      offsetBottom,
    };
  }
  return {
    height: 0,
    offsetTop: 0,
    offsetBottom: 0,
  };
};

const scrollTo = (ele) => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
const Homepage = () => {
  const dispatch = useDispatch();
  const [news, setNews] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const paramNews = {
    page: 1,
    limit: 6,
    sort: "desc",
    order: "is_public",
    isPublic: true,
  };

  const paramDoctors = {
    page: 1,
    limit: 3,
    sort: "asc",
    order: "code",
    facultyId: 2,
    specialtyId: 3,
    isActive: true,
    isPublic: true,
  };
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state) =>
    state.login.isAuthenticated ? state.login.isAuthenticated : false
  );
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(getTop3News({ ...paramNews }));
      setNews(response.listNewsResponses);
      const responseDoctor = await dispatch(getTop3Doctor({ ...paramDoctors }));
      setDoctor(responseDoctor.listDoctorDetailsResponse);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headerRef = useRef(null);
  const newsRef = useRef(null);
  const bookDoctorRef = useRef(null);
  const doctorsRef = useRef(null);
  const scrollToTopRef = useRef(null);

  const [visibleSection, setVisibleSection] = useState();

  const sectionRefs = [
    { section: "ScrollToTop", ref: scrollToTopRef },
    { section: "News", ref: newsRef },
    { section: "BookDoctor", ref: bookDoctorRef },
    { section: "Doctors", ref: doctorsRef },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!_.isNull(headerRef.current)) {
        const { height: headerHeight } = getDimensions(headerRef.current);
        const scrollPosition = window.scrollY + headerHeight;
        // eslint-disable-next-line array-callback-return
        const selected = sectionRefs.find(({ section, ref }) => {
          const ele = ref.current;
          if (ele) {
            const { offsetBottom, offsetTop } = getDimensions(ele);
            return scrollPosition > offsetTop && scrollPosition < offsetBottom;
          }
        });

        if (selected && selected.section !== visibleSection) {
          setVisibleSection(selected.section);
        } else if (!selected && visibleSection) {
          setVisibleSection(undefined);
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleSection]);

  const dataWithIndex = [];
  for (let i = 0; i < news.length; i++) {
    dataWithIndex.push({
      ...news[i],
    });
  }

  const dataDoctorWithIndex = [];
  for (let i = 0; i < doctor.length; i++) {
    dataDoctorWithIndex.push({
      ...doctor[i],
    });
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow className="next_button" />,
    prevArrow: <PrevArrow className="prev_button" />,
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Wrapper>
      <div id="scrollToTop" ref={scrollToTopRef} />
      <Header id="Header" ref={headerRef}>
        <div>
          <PublicSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            path={location.pathname}
            scrollTo={scrollTo}
            scrollToTopRef={scrollToTopRef}
            newsRef={newsRef}
            bookDoctorRef={bookDoctorRef}
            doctorsRef={doctorsRef}
            visibleSection={visibleSection}
          />
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>
          <div
            onClick={() => {
              scrollTo(scrollToTopRef.current);
            }}
            className="header_link logo hidden_responsive"
          >
            <Logo />
          </div>
        </div>
        <div className="main-menu-wrapper">
          <div
            onClick={() => {
              scrollTo(scrollToTopRef.current);
            }}
            className={`header_link hidden_responsive `}
          >
            <span className="nav_item">Trang chủ</span>
          </div>

          <div
            onClick={() => {
              scrollTo(newsRef.current);
            }}
            className={`header_link hidden_responsive  ${
              visibleSection === "News" ? "selected" : ""
            }`}
          >
            <span className="nav_item">Tin tức</span>
          </div>

          <div
            onClick={() => {
              !isAuthenticated
                ? scrollTo(bookDoctorRef.current)
                : history.push(`/customer/booking`);
            }}
            className={`header_link hidden_responsive  ${
              visibleSection === "BookDoctor" ? "selected" : ""
            }`}
          >
            <span className="nav_item">
              <Badge.Ribbon text="Hot" color="red">
                Đặt lịch khám
              </Badge.Ribbon>
            </span>
          </div>

          <div
            onClick={() => {
              scrollTo(doctorsRef.current);
            }}
            className={`header_link hidden_responsive  ${
              visibleSection === "Doctors" ? "selected" : ""
            }`}
          >
            <span className="nav_item">Bác sĩ</span>
          </div>
          {!isAuthenticated && (
            <>
              <div className={`header_link`}>
                <NavLink to="/login">
                  <span className="nav_item">Đăng nhập</span>
                </NavLink>
              </div>
              <div className={`header_link`}>
                <NavLink to="/signup">
                  <span className="nav_item">Đăng ký</span>
                </NavLink>
              </div>
            </>
          )}
          {isAuthenticated && (
            <div className={`header_link no_padding`}>
              <HeaderDropdown />
            </div>
          )}
        </div>
      </Header>

      <SliderImg scrollTo={() => scrollTo(newsRef.current)} />

      <News ref={newsRef} id="News">
        <div
          data-aos="fade-in"
          data-aos-delay="200"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
        >
          <h3 className="heading_title">Tin tức nổi bật</h3>
          <Row gutter={[48, 16]}>
            <Col xl={16} lg={16} md={24} sm={24} xs={24}>
              <Skeleton loading={loading} active paragraph={{ rows: 18 }}>
                <Slider {...settings} className="slider">
                  {dataWithIndex
                    .slice(0, dataWithIndex.length - 2)
                    .map((item, index) => {
                      return (
                        <div key={item.news_id}>
                          <img src={item.image} alt="" className="img_slider" />
                          <NavLink
                            to={`${!isAuthenticated ? "" : "/customer"}/news/${
                              item.news_id
                            }`}
                          >
                            <div className="news_content_container">
                              <h3 className="news_title">{item.title}</h3>
                              <div className="news_content">
                                {item.short_content}
                              </div>
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
                </Slider>
              </Skeleton>
            </Col>
            <Col xl={8} lg={8} md={24} sm={24} xs={24}>
              <div className="news_right">
                {dataWithIndex
                  .slice(dataWithIndex.length - 2, dataWithIndex.length)
                  .map((item, index) => {
                    return (
                      <Skeleton
                        loading={loading}
                        active
                        paragraph={{ rows: 7 }}
                        key={index}
                      >
                        <div
                          key={item.news_id}
                          className="news_container_right"
                        >
                          <img src={item.image} alt="" className="img_right" />
                          <Link
                            to={`${!isAuthenticated ? "" : "/customer"}/news/${
                              item.news_id
                            }`}
                          >
                            <div className="news_content_container">
                              <h3 className="news_title">{item.title}</h3>
                            </div>
                          </Link>
                        </div>
                      </Skeleton>
                    );
                  })}
              </div>
            </Col>
          </Row>

          <SeeMore>
            <div className="see_more">
              <NavLink
                to={`${!isAuthenticated ? "" : "/customer"}/news`}
                className="effect_link"
              >
                Xem thêm
              </NavLink>
            </div>
          </SeeMore>
        </div>
      </News>

      <BookDoctor id="BookDoctor" ref={bookDoctorRef}>
        <Row>
          <Col xl={14} lg={14} md={24} sm={24} xs={24} className="image_left">
            <div
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
            >
              <img src={background} alt="" className="img_fluid" />
            </div>
          </Col>

          <Col
            xl={10}
            lg={12}
            md={16}
            sm={16}
            xs={20}
            className="content_right"
          >
            <div
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
            >
              <div className="slogan">
                <h3 className="title">Đặt lịch khám ngay</h3>
                <p className="content">
                  Hội tụ đầy đủ các trang thiết bị y tế tối tân với đội ngũ bác
                  sĩ hàng đầu. HSSW cam kết đưa đến cho bạn các dịch vụ thiết
                  yếu với chất lượng cao, bảo đảm cho khách hàng có trải nghiệm
                  tốt nhất mà chỉ có ở HSSW cung cấp cho bạn. Vậy nhanh tay đặt
                  lịch khám để trải nghiệm dịch vụ của HSSW đi nào!
                </p>
                {!isAuthenticated && (
                  <SeeMore center={true}>
                    <div className="see_more">
                      <NavLink to={`${"/login"}`} className="effect_link">
                        Đăng nhập / Đăng ký để đặt lịch khám
                      </NavLink>
                    </div>
                  </SeeMore>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </BookDoctor>

      <Doctor ref={doctorsRef} id="Doctors">
        <div
          data-aos="fade-in"
          data-aos-delay="200"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
        >
          <h3 className="heading_title">Đội ngũ chuyên gia</h3>
          <Row gutter={[16, 16]}>
            {dataDoctorWithIndex.map((item, key) => {
              return (
                <Col xl={8} lg={8} md={12} sm={24} xs={24} key={key}>
                  <NavLink
                    to={`${!isAuthenticated ? "" : "/customer"}/doctorpublic/${
                      item.doctor_id
                    }`}
                  >
                    <div className="doctor_container">
                      <div className="pic">
                        <img src={item.image} alt="" className="img_fluid" />
                      </div>
                      <div className="doctor_info">
                        <h4 className="doctor_name">{item.full_name}</h4>
                        <p className="doctor_faculty">{item.faculty}</p>
                        <p className="doctor_specialty">{item.specialty}</p>
                      </div>
                    </div>
                  </NavLink>
                </Col>
              );
            })}
          </Row>

          <SeeMore>
            <div className="see_more">
              <NavLink
                to={`${!isAuthenticated ? "" : "/customer"}/doctorpublic`}
                className="effect_link"
              >
                Xem thêm
              </NavLink>
            </div>
          </SeeMore>
        </div>
      </Doctor>

      <MessengerCustomerChat pageId="100183605699090" appId="189691349016231" />
      <Footer />
    </Wrapper>
  );
};

export default Homepage;
