/* eslint-disable array-callback-return */
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCalendarData } from "../../../reducers/TimetableManagement";

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
    .time_during {
      margin-bottom: 0;
      padding-bottom: 15px;
      font-size: 18px;
      font-weight: 500;
    }
  }
  .calendar_area {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px;
    .day_of_week {
      padding-right: 5px;
      text-align: right;
      p {
        margin-bottom: 0;
      }
    }
    .day_of_month {
      text-align: right;
      p {
        margin-bottom: 0;
      }
    }
    .day_content {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
    }
    .day_grid_item_container {
      background-color: #ffffff;
      width: 100%;
      height: 130px;
      border-top: 2px solid #f0f0f0;
      padding: 5px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .selected {
      color: #1890ff;
      background: #e6f7ff;
      &:hover {
        background: #e6f7ff;
      }
    }
    .start_date {
      border-top: 2px solid #1890ff;
    }
  }
`;

const CalendarForDoctor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedDay, setSelectDay] = useState(0);
  const [calendarData, setCalendarData] = useState([]);

  const { id } = useSelector((state) => state.login.user);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getCalendarData(id));
      let itcDate = [];
      response.forEach((element) => {
        itcDate.push({
          ...element,
          itcDate: moment(element?.date, "DD/MM/YYYY"),
        });
      });

      setCalendarData(itcDate);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const dayOfWeekArray = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <h1>Lịch làm việc</h1>
        <p className="time_during">
          Từ ngày {_.get(_.head(calendarData), "date", "")} đến ngày{" "}
          {_.get(_.last(calendarData), "date", "")}
        </p>
      </div>
      <div className="calendar_area">
        {calendarData.map((element, index) => {
          if (index < 7) {
            return (
              <div className="day_of_week" key={index}>
                <p className="">
                  {_.get(dayOfWeekArray, `${[moment(element.itcDate).day()]}`)}
                </p>
              </div>
            );
          }
        })}
        {calendarData.map((element, index) => {
          return (
            <div
              className={classNames({
                " day_grid_item_container": true,
                start_date: index === 0,
                selected: index === selectedDay,
              })}
              key={index}
              onClick={() => setSelectDay(index)}
              onDoubleClick={() => {
                history.push(`/doctor/timetable?bookDate=${element?.date}`);
              }}
            >
              <p className="day_of_month">{element?.date}</p>
              <div className="day_content">
                {element?.bookIsPending > 0 && (
                  <Badge
                    status="warning"
                    text={`Đang chờ duyệt: ${element?.bookIsPending}`}
                  />
                )}
                {element?.bookIsComfirm > 0 && (
                  <Badge
                    status="success"
                    text={`Đã chấp nhận: ${element?.bookIsComfirm}`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default CalendarForDoctor;
