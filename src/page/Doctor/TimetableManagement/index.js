import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getDetailOfDoctor,
  getListBookComfirmByOptionTime,
  getOptionTimeTable,
  getScheduleDoctorByDoctorId,
} from "../../../reducers/TimetableManagement";
import {
  Descriptions,
  Form,
  Row,
  Col,
  DatePicker,
  Button,
  Spin,
  Divider,
  Tooltip,
  Space,
} from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import AddByDoctorModal from "./AddByDoctorModal";

const Wrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  /* color: #3483eb; */
  padding: 30px 50px 100px;

  h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  .doctor_info {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #252426;
  }
  .ant-picker {
    width: 100%;
    border-radius: 5px;
  }
  .search_function_area {
    margin-bottom: 20px;
  }
  .option_button {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .option_container {
    padding: 0 16px 16px 0;
  }
  .ant-divider-horizontal {
    margin: 0;
  }
  .status_time_free {
    width: 100%;
    height: 100%;
    border: 1px solid #000000;
    background: #ffffff;
  }
  .status_time_pending {
    width: 100%;
    height: 100%;
    border: 1px solid #000000;
    background: #07e1f5;
  }
  .status_time_busy {
    width: 100%;
    height: 100%;
    border: 1px solid #000000;
    background: #808080;
  }
  .pending {
    background: #07e1f5;
  }
  .busy {
    background: #808080;
    cursor: not-allowed;
  }
  .choosing {
    /* border: 3px solid #a3eff7; */
    border-color: #007ef5;
    font-weight: 500;
  }
  .add_by_doctor {
    display: flex;
    justify-content: flex-end;
    .ant-btn {
      border-radius: 5px;
    }
  }
  @media only screen and (max-width: 992px) {
    .timetable_area {
      margin-right: -16px;
    }
  }
`;

const TooltipContentWrapper = styled.div`
  /* background: #ffffff; */
  color: #ffffff;
  h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
`;

const TooltipContent = ({ content }) => {
  return (
    <TooltipContentWrapper>
      <h4>Lịch khám</h4>
      <Row gutter={16}>
        <Col span={24}>Mã khách hàng: {content?.customer_code}</Col>
        <Col span={24}>Mã lịch khám: {content?.book_doctor_code}</Col>
        <Col span={24}>
          <Space>
            Hồ sơ bệnh án:{" "}
            <Link to={`/doctor/medical?customerCode=${content?.customer_code}`}>
              Xem
            </Link>
          </Space>
        </Col>
      </Row>
      <div>Ghi chú: {content?.note}</div>
      <div>Ca khám đang có: {_.join(content?.list_name_option_time, ",")}</div>
    </TooltipContentWrapper>
  );
};

const TimeTableManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [form] = Form.useForm();
  const { id } = useSelector((state) =>
    state.login.user ? state.login.user : {}
  );
  const search = useLocation().search;
  const bookDate = new URLSearchParams(search).get("bookDate");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      //get doctorDetail for doctor information
      await dispatch(getDetailOfDoctor(id));
      //get optiontimetable to display
      await dispatch(getOptionTimeTable());
      //set defaultvalue for form (search_day)
      form.setFieldsValue({
        search_day: bookDate ? moment(bookDate, "DD/MM/YYYY") : moment(),
      });
      //set request data for today
      const request = {
        doctor_id: id,
        book_date: bookDate ? bookDate : moment().format("DD/MM/YYYY"),
      };
      //get data for optiontimetable today
      await dispatch(getScheduleDoctorByDoctorId(request));
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doctorDetail = useSelector((state) =>
    state.timetableManagement.doctorDetail
      ? state.timetableManagement.doctorDetail
      : []
  );
  const scheduleDoctorTable = useSelector((state) =>
    state.timetableManagement.scheduleDoctorTable
      ? state.timetableManagement.scheduleDoctorTable
      : []
  );
  const [searchDate, setSearchDate] = useState(
    bookDate ? bookDate : moment().format("DD/MM/YYYY")
  );
  const handleDateChange = async (date) => {
    if (!_.isNull(date)) {
      setSearchDate(moment(date).format("DD/MM/YYYY"));
      const request = {
        doctor_id: id,
        book_date: moment(date).format("DD/MM/YYYY"),
      };
      await dispatch(getScheduleDoctorByDoctorId(request));
      history.push(
        `${location.pathname}?bookDate=${moment(date).format("DD/MM/YYYY")}`
      );
    }
  };

  const [hoverContent, setHoverContent] = useState({});

  const handleHoverConfirmed = async (col) => {
    if (col.status === 2) {
      const request = {
        doctorId: id,
        bookDate: searchDate,
        optionTimeId: col.option_time_id,
      };
      const response = await dispatch(getListBookComfirmByOptionTime(request));
      setHoverContent(response);
    }
  };

  const [addByDoctorList, setAddByDoctorList] = useState([]);

  const handleClickFree = (id) => {
    let temp = [];
    if (_.indexOf(addByDoctorList, id) !== -1) {
      temp = _.xor(addByDoctorList, [id]);
      setAddByDoctorList(temp);
    } else {
      temp = [...addByDoctorList, id];
      setAddByDoctorList(temp);
    }
  };

  const [visibleAdd, setVisibleAdd] = useState(false);

  const [listOptionTimeAdd, setListOptionTimeAdd] = useState([]);

  const handleAddByDoctor = () => {
    let temp = [];
    for (let i = 0; i < scheduleDoctorTable.length; i++) {
      if (
        _.indexOf(
          addByDoctorList,
          _.get(scheduleDoctorTable, `[${i}].option_time_id`, "")
        ) !== -1
      ) {
        temp.push(_.get(scheduleDoctorTable, `[${i}].option_time_name`, ""));
      }
    }
    setListOptionTimeAdd(temp);
    setVisibleAdd(true);
  };
  const callbackAddByDoctor = async () => {
    const request = {
      doctor_id: id,
      book_date: searchDate,
    };
    //get data for optiontimetable today
    await dispatch(getScheduleDoctorByDoctorId(request));
    setListOptionTimeAdd([]);
    setAddByDoctorList([]);
  };
  const compareBetweenDates = (startDate, endDate) => {
    let currDate = moment(startDate).startOf("day");
    let lastDate = moment(endDate, "DD/MM/YYYY").startOf("day");
    return currDate.diff(lastDate) <= 0;
  };
  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <h1>Quản lý Thời gian biểu</h1>
      </div>
      <div className="doctor_info">
        <Descriptions title="Thông tin bác sĩ">
          <Descriptions.Item label="Tên bác sĩ">
            {doctorDetail.full_name}
          </Descriptions.Item>
          <Descriptions.Item label="Mã bác sĩ">
            {doctorDetail.code}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
        tip="Vui lòng đợi..."
        spinning={loading}
      >
        <Form method="post" form={form}>
          <div className="search_function_area">
            <Row gutter={32}>
              <Col lg={8} md={12} sm={12} xs={24}>
                <p style={{ fontWeight: "600" }}>Ngày:</p>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col lg={8} md={12} sm={12} xs={24}>
                <Form.Item
                  // label="Ngày đặt lịch khám"
                  name="search_day"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn hoặc điền ngày tìm kiếm!",
                    },
                  ]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    name="search_day"
                    placeholder="DD/MM/YYYY"
                    onChange={handleDateChange}
                  />
                </Form.Item>
              </Col>
              <Col lg={16} md={12} sm={12} xs={24} className="add_by_doctor">
                <Button
                  onClick={handleAddByDoctor}
                  disabled={addByDoctorList.length === 0}
                >
                  Thêm lịch khám
                </Button>
              </Col>
            </Row>
          </div>
          <div className="timetable_area">
            <Row gutter={32}>
              <Col lg={16} md={24} sm={24} xs={24}>
                <Form.Item
                  // label="Khoa"
                  name="choose_time"
                >
                  <Row>
                    {scheduleDoctorTable.map((col, key) => {
                      if (col.status === null || col.status === 0) {
                        return (
                          <Col
                            lg={4}
                            md={6}
                            sm={6}
                            xs={8}
                            key={key}
                            className="option_container"
                          >
                            <Button
                              className={classNames({
                                option_button: true,
                                choosing:
                                  _.indexOf(
                                    addByDoctorList,
                                    col.option_time_id
                                  ) !== -1,
                              })}
                              onClick={() =>
                                handleClickFree(col.option_time_id)
                              }
                            >
                              {col.option_time_name}
                            </Button>
                          </Col>
                        );
                      } else if (
                        col.status === 1 &&
                        compareBetweenDates(moment(), searchDate)
                      ) {
                        return (
                          <Col
                            lg={4}
                            md={6}
                            sm={6}
                            xs={8}
                            key={key}
                            className="option_container"
                          >
                            <Button
                              className={classNames({
                                option_button: true,
                                pending: col.status === 1,
                              })}
                            >
                              <NavLink
                                to={`${location.pathname}/accept?optionTimeId=${col.option_time_id}&bookDate=${searchDate}&doctorId=${id}`}
                              >
                                {col.option_time_name}
                              </NavLink>
                            </Button>
                          </Col>
                        );
                      }
                      return (
                        <Col
                          lg={4}
                          md={6}
                          sm={6}
                          xs={8}
                          key={key}
                          className="option_container"
                        >
                          <Tooltip
                            placement="bottom"
                            title={<TooltipContent content={hoverContent} />}
                          >
                            <Button
                              className={classNames({
                                option_button: true,
                                busy: col.status === 2,
                              })}
                              onMouseEnter={() => handleHoverConfirmed(col)}
                              // disabled={true}
                            >
                              {col.option_time_name}
                            </Button>
                          </Tooltip>
                        </Col>
                      );
                    })}
                  </Row>
                </Form.Item>
              </Col>
              <Col lg={8} md={8} sm={8} xs={24}>
                <Divider orientation="left">Ghi chú</Divider>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <div className="status_time_free"></div>
                  </Col>
                  <Col span={16}>Thời gian rảnh</Col>
                  <Col span={8}>
                    <div className="status_time_busy"></div>
                  </Col>
                  <Col span={16}>Đã có người đặt</Col>
                  <Col span={8}>
                    <div className="status_time_pending"></div>
                  </Col>
                  <Col span={16}>Đang có người chờ</Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      </Spin>
      <AddByDoctorModal
        visible={visibleAdd}
        onHide={() => setVisibleAdd(false)}
        doctor_id={doctorDetail.doctor_id}
        book_date={searchDate}
        selected_time={listOptionTimeAdd}
        list_option_time_id={addByDoctorList}
        afterClose={callbackAddByDoctor}
      />
    </Wrapper>
  );
};
export default TimeTableManagement;
