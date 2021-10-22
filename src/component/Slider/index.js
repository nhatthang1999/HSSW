import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import banner1 from "../../assets/image/slide_1.jpg";
import banner2 from "../../assets/image/slide_2.jpg";

import slide1 from "../../assets/image/slide1.jpg";
import slide2 from "../../assets/image/slide2.jpg";

import Fade from "react-reveal/Fade";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  background-color: rgba(39, 37, 34, 0.8);
  overflow: hidden;
  padding: 0;
  margin-top: 60px;
  .slick-dots {
    bottom: 5px;
    right: calc(50% - 140px);
    position: absolute;
    display: block;
    align-items: center;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: right;
    & > li button:before {
      background: #ffffff;
      content: "";
      width: 20px;
      height: 3px;
    }
  }
  .button_move_down {
    position: absolute;
    /* width: 100%; */
    margin: 0;
    list-style: none;
    text-align: center;
    padding: 0;
    bottom: 15px;
    display: block;
    left: calc(50% - 10px);
    right: calc(50% - 10px);
  }

  .move_down {
    bottom: 0;
    font-size: 0;
    line-height: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #ffffff;
    border: 0;
    outline: none;
    background: transparent;
  }
`;
const CarouselItem = styled.div`
  background: url(${(props) => props.background});
  transition: background 0.5s ease 0s;

  width: 100%;
  height: calc(100vh - 60px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  color: rgb(255, 255, 255);
  .shadow {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
  }
  .carousel_container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    .carousel_content {
      width: 50%;
      height: 50%;
      & > h2 {
        color: rgb(255, 255, 255);
        font-size: 60px;
        margin-bottom: 100px;
        width: 90%;
        max-width: 960px;
        font-weight: 500;
        line-height: 1.5;
        letter-spacing: normal;
        text-transform: uppercase;
      }
      .slide_des > p {
        font-size: 20px;
      }
    }
  }
  @media only screen and (max-width: 1199px) {
  }
  @media only screen and (max-width: 992px) {
    .carousel_container {
      .carousel_content {
        width: 80%;
        & > h2 {
          font-size: 40px;
          margin-bottom: 50px;
        }
        .slide_des > p {
          font-size: 20px;
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
  }
  @media only screen and (max-width: 575px) {
    .carousel_container {
      .carousel_content {
        width: 100%;
        padding: 0 25px;

        & > h2 {
          font-size: 30px;
          margin-bottom: 20px;
        }
        .slide_des > p {
          font-size: 16px;
        }
      }
    }
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
const SliderImg = (props) => {
  const [showSlide, setShowSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow className="next_button" />,
    prevArrow: <PrevArrow className="prev_button" />,
    autoplaySpeed: 4000,
    autoplay: true,
    beforeChange: (current, next) => setShowSlide(next),
    afterChange: (current) => setShowSlide(current),
  };
  const slides = [
    {
      key: 0,
      background: banner1,
      title: "HSSW",
      content: "Content",
      description: (
        <p>
          HSSW là bệnh viện tư nhân thuộc sở hữu của tập đoàn SWP490_G14. Được
          thành lập vào ngày 10/05/2021, HSSW đã lấy sự tin dùng của khách hàng
          với những đóng góp to lớn đánh dấu sự phát triển trong nền y học. Với
          cơ sở vật chất tiên tiến, công nghệ hiện đại, hợp tác cùng đội ngũ
          chuyên gia nước ngoài giàu kinh nghiệm như Mỹ, Nhật, Singapore HSSW
          dường như đã trở thành một biểu tượng cho nền y học Việt.
        </p>
      ),
    },
    {
      key: 1,
      background: banner2,
      title: "Đội ngũ chuyên gia",
      content: "Content",
      description: (
        <p>
          HSSW quy tụ đội ngũ chuyên gia, bác sĩ, dược sĩ và điều dưỡng được đào
          tạo bài bản đến chuyên sâu tại Việt nam và nhiều nước có nền y học
          phát triển như Mỹ, Anh, Pháp... Luôn lấy người bệnh là trung tâm, HSSW
          cam kết mang lại dịch vụ chăm sóc sức khỏe toàn diện và chất lượng cao
          cho khách hàng.
        </p>
      ),
    },
    {
      key: 2,
      background: slide1,
      title: "Người tiên phong",
      content: "Content",
      description: (
        <p>
          Hoạt động không vì mục tiêu lợi nhuận, HSSW luôn tiên phong trong ứng
          dụng các phương pháp điều trị mới nhất thế giới cùng chất lượng dịch
          vụ hoàn hảo để trở thành địa chỉ chăm sóc sức khỏe tiêu chuẩn quốc tế
          tại Việt Nam.
        </p>
      ),
    },
    {
      key: 3,
      background: slide2,
      title: "Trang thiết bị tối tân nhất thế giới",
      content: "Content",
      description: (
        <p>
          Sở hữu không gian khám chữa bệnh văn minh, sang trọng, hiện đại, HSSW
          chú trọng đầu tư đồng bộ hệ thống trang thiết bị hiện đại hàng đầu thế
          giới, hỗ trợ hiệu quả cho việc chẩn đoán và điều trị.
        </p>
      ),
    },
  ];
  return (
    <Wrapper>
      <Slider {...settings} className="slider">
        {slides.map((slide) => {
          return (
            <CarouselItem background={slide.background} key={slide.key}>
              <div className="shadow">
                <Fade bottom when={slide.key === showSlide}>
                  <div className="carousel_container">
                    <div className="carousel_content">
                      <h2 className="slide_title">{slide.title}</h2>
                      {/* <p className="slide_content">{slide.content}</p> */}
                      <div className="slide_des">{slide.description}</div>
                    </div>
                  </div>
                </Fade>
              </div>
            </CarouselItem>
          );
        })}
      </Slider>
      <div className="button_move_down">
        <Button
          icon={<DownOutlined style={{ fontSize: "20px" }} />}
          className="move_down"
          onClick={props.scrollTo}
        ></Button>
      </div>
    </Wrapper>
  );
};

export default SliderImg;
