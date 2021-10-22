import { Badge, Card } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { getNotification } from "../../../reducers/TimetableManagement";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 50px 30px;
  .header {
    h1 {
      font-size: 30px;
      font-weight: bold;
      text-align: left;
      padding-bottom: 20px;
      margin-bottom: 0;
      color: #286ba6;
    }
  }
  @media only screen and (max-width: 1199px) {
  }
  @media only screen and (max-width: 767px) {
  }
  @media only screen and (max-width: 575px) {
  }
`;

const Notification = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.login.user);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getNotification(id));
      setNotification(response);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // useEffect(() => {
  //   let interval;
  //   interval = setInterval(() => {
  //     console.log("In setInterval");
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div>
        <Card
          title="Thông báo"
          extra={<NavLink to="/doctor/calendar">Xem thêm</NavLink>}
          style={{ width: 300 }}
        >
          {notification?.pending > 0 && (
            <Badge
              status="warning"
              text={`Lịch đang chờ duyệt: ${notification?.pending}`}
            />
          )}
          {notification?.acceptedToday > 0 && (
            <Badge
              status="success"
              text={`Lịch đã chấp nhận ngày hôm nay: ${notification?.acceptedToday}`}
            />
          )}
        </Card>
      </div>
    </Wrapper>
  );
};

export default Notification;
