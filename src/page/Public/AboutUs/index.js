import Text from "antd/lib/typography/Text";
import React from "react";
import styled from "styled-components";
import background1 from "../../../assets/image/slide_1.jpg";
import dau from "../../../assets/image/duck.jpg";
import quang from "../../../assets/image/qtee.jpg";
import thang from "../../../assets/image/thangnek.jpg";
import phat from "../../../assets/image/fat.jpg";
import trang from "../../../assets/image/trang.jpg";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 30px 300px 100px;
  .header {
    h1 {
      font-size: 30px;
      font-weight: 700;
      text-align: start;
      color: #286ba6;
      margin-bottom: 0;
      padding-bottom: 20px;
      font-style: italic;
    }
  }
  h2 {
    font-size: 18px;
    font-weight: 500;
    color: #286ba6;
  }
  ul {
    list-style: disc;
    list-style-position: inside;
  }
  .about {
    padding: 0 20px;
  }
  .team {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;

    .team_container {
      .pic {
        display: flex;
        justify-content: center;
        img {
          height: 200px;
          border-radius: 50%;
        }
      }
      .doctor_info {
        h4 {
          position: relative;
          padding-top: 20px;
          text-align: center;
        }
      }
    }
  }
  @media (max-width: 1440px) {
    padding: 30px 150px 50px;
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

const Banner = styled.div`
  width: 100%;
  max-height: 800px;
  min-height: 600px;
  height: auto;
  background: url(${background1});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  position: relative;
  .content_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    z-index: 2;
    flex-direction: column;
    h1 {
      font-size: 50px;
      color: #fff;
    }
    p {
      font-size: 20px;
      font-style: italic;
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const AboutUs = () => {
  const team = [
    {
      name: "Minh Đức",
      img: dau,
    },
    {
      name: "Ngọc Quang",
      img: quang,
    },
    {
      name: "Nhật Thắng",
      img: thang,
    },
    {
      name: "Hữu Phát",
      img: phat,
    },
    {
      name: "Trang Nguyễn",
      img: trang,
    },
  ];
  return (
    <>
      <Banner>
        <div className="content_wrapper">
          <h1>Giới thiệu</h1>
          <p>Chăm sóc bằng tài năng, y đức và sự thấu cảm</p>
        </div>
      </Banner>
      <Wrapper>
        <div className="header">
          <h1>Thông tin bệnh viện</h1>
        </div>
        <div className="content">
          <h2>Hệ thống Y tế HSSW</h2>
          <div className="about">
            <p>
              HSSW là Hệ thống Y tế phi lợi nhuận do SWP409-G14 - Tập đoàn kinh
              tế tư nhân hàng đầu Việt Nam đầu tư phát triển với sứ mệnh “Chăm
              sóc bằng tài năng, y đức và sự thấu cảm".
            </p>
            <p>
              Ra đời năm 2012, HSSW hiện có 7 bệnh viện đa khoa đi vào hoạt động
              và xây dựng chiến lược phát triển với 10 bệnh viện trên cả nước
              vào năm 2020. Với cơ sở vật chất vượt trội; đội ngũ chuyên gia,
              bác sĩ đầu ngành; liên tục ứng dụng các phương pháp điều trị mới
              nhất thế giới cùng chất lượng dịch vụ hoàn hảo, đến nay HSSW đã
              trở thành địa chỉ chăm sóc sức khỏe tiêu chuẩn quốc tế tại Việt
              Nam.
            </p>
            <p>
              Trong những năm qua, HSSW không ngừng phấn đấu để khẳng định sứ
              mệnh lớn lao mà mình theo đuổi bằng việc trở thành Hệ thống Y tế
              tư nhân
              <Text strong> DUY NHẤT</Text> ở Việt Nam:
            </p>
            <ul>
              <li>Hoạt động không vì mục tiêu lợi nhuận.</li>
              <li>
                Có 2 bệnh viện đạt <Text strong>tiêu chuẩn JCI</Text>- tiêu
                chuẩn an toàn khắt khe nhất thế giới.
              </li>
              <li>
                Có định hướng đầu tư bài bản vào công tác nghiên cứu và khoa học
                công nghệ để nâng cao chất lượng khám chữa bệnh.
              </li>
            </ul>
            <p>
              Trên đà phát triển, HSSW đã được cấu trúc thành 3 hợp phần gắn kết
              chặt chẽ:
            </p>
            <ul>
              <li>Chuỗi bệnh viện</li>
              <li>Các Viện nghiên cứu</li>
              <li>Hệ thống đào tạo (phối hợp cùng Trường Đại học Oxford).</li>
            </ul>
            <p>
              Song song với việc phát triển chuỗi bệnh viện, các Viện nghiên cứu
              chuyên sâu trong Hệ thống đã và đang được thành lập như “Viện
              nghiên cứu Tế bào gốc và công nghệ gen”, “Viện nghiên cứu Ung
              thư”... Đây cũng là mô hình chuẩn mà các hệ thống y tế hàng đầu
              thế giới đầu tư xây dựng, tạo nền móng vững chắc để HSSW tiếp tục
              phát triển mạnh mẽ và tiệm cận các quốc gia phát triển trong khu
              vực về trên thế giới.
            </p>
          </div>

          <h2>Tầm nhìn</h2>
          <div className="about">
            <p>
              HSSW cam kết phát triển hệ thống y tế hàn lâm vươn tầm quốc tế
              thông qua những nghiên cứu đột phá, nhằm mang lại chất lượng điều
              trị xuất sắc và dịch vụ chăm sóc hoàn hảo.
            </p>
          </div>

          <h2>Sứ mệnh</h2>
          <div className="about">
            <p>
              <Text strong>Chăm sóc bằng tài năng, y đức và sự thấu cảm.</Text>
            </p>
          </div>

          <h2>Giá trị cốt lõi</h2>
          <div className="about">
            <p>
              4 chữ <Text strong>C - A - R - E </Text> với ý nghĩa:
            </p>
            <ul>
              <li>
                <Text strong>Creativity – Sự sáng tạo </Text>: Không ngừng sáng
                tạo và đổi mới nhằm mang lại các giải pháp tốt nhất cho người
                bệnh.
              </li>
              <li>
                <Text strong>Accountability – Trách nhiệm</Text> : Chịu trách
                nhiệm cao nhất với bệnh nhân và người nhà của họ về y đức, kỹ
                năng, tri thức và các tiêu chuẩn chuyên môn tại HSSW.
              </li>
              <li>
                <Text strong>Reliability – Sự tin cậy</Text> : Cam kết chỉ làm
                những điều tốt nhất cho bệnh nhân, mang lại độ tin cậy cao nhất
                cho cộng đồng.
              </li>
              <li>
                <Text strong>Excellence – Sự hoàn hảo</Text> : Hướng tới chất
                lượng dịch vụ cao nhất và quy trình khám chữa bệnh tốt nhất.
              </li>
            </ul>
          </div>

          <h2>Hoạt động phi lợi nhuận</h2>
          <div className="about">
            <p>
              Tất cả các bệnh viện HSSW thường xuyên triển khai chương trình
              phẫu thuật từ thiện và chương trình trợ giá, giúp chữa trị thành
              công và mang tới cuộc sống tốt đẹp cho hàng nghìn người bệnh trên
              khắp cả nước. Ngoài ra, các bệnh viện đã thực hiện các chương
              trình sàng lọc bệnh miễn phí và nhiều hoạt động xã hội vì cộng
              đồng.
            </p>
          </div>
        </div>
        <div className="header">
          <h1>Về chúng tôi</h1>
        </div>

        <div className="team">
          {team.map((item, key) => {
            return (
              <div className="team_container" key={key}>
                <div className="pic">
                  <img src={item.img} alt="" className="img_fluid" />
                </div>
                <div className="doctor_info">
                  <h4 className="doctor_name">{item.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </Wrapper>
    </>
  );
};

export default AboutUs;
