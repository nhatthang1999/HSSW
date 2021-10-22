import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Col,
  Row,
  Result,
  Tooltip,
  notification,
  Space,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  findDoctorsByFacultyAndName,
  getAllFacultyForCustomer,
  getAllSpecialtyGroupByAcademicForCustomer,
  getOptionTimeTable,
  getScheduleDoctorByDoctorId,
  requestBookingDoctor,
  // setIsDoneSearching,
} from "../../../reducers/Booking";
import Slider from "react-slick";
import classNames from "classnames";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import BillModal from "./BillModal";

const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 100px 50px;
  min-height: 100vh;
  background-color: #f1f9ff;

  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    color: #286ba6;
    padding-bottom: 20px;
    margin-bottom: 0;
  }
  .ant-picker {
    width: 100%;
  }
  .option_button {
    width: 100%;
    height: 100%;
  }
  .selected_option {
    background: #07e1f5;
  }
  .option_container {
    padding: 0 0 10px 10px;
  }
  .busy {
    background: #808080;
    cursor: not-allowed;
  }

  p {
    font-size: 15px;
    font-weight: bold;
  }
  .search_button {
    border-radius: 5px;
    width: 105px;
  }
  .confirm_button {
    border-radius: 5px;
  }
  .button_submit {
    border-radius: 5px;
  }
  .button_cancel {
    border-radius: 5px;
    width: 105px;
  }
  .send_cancel {
    display: flex;
    justify-content: flex-end;
  }
  .avatar {
    margin-bottom: 20px;
  }
  .slick-arrow {
    background-color: #b3b3b3;
    border-radius: 50%;
  }
  .title_result {
    text-align: center;
    p {
      font-size: 20px;
      margin-bottom: 40px;
    }
  }
  .no_result {
    font-weight: bold;
  }
  .info_container {
    border: 1px solid hsla(0, 0%, 100%, 0);
    clear: both;
    padding: 20px;
    position: relative;
    transition: box-shadow 0.2s, border 0.1s;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 10px;
    box-shadow: 4px 8px 20px rgb(0 0 0 / 5%);
    /* min-height: 100vh; */
    width: 100%;
    background: #ffffff;
  }
  .slick-prev {
    position: absolute;
    top: -10px;
    left: calc(100% - 60px);
  }
  .slick-next {
    position: absolute;
    top: -10px;
    right: 8px;
  }
  @media (max-width: 1200px) {
    padding: 30px 70px 50px;
  }
  @media (max-width: 992px) {
    padding: 30px 50px 50px;
  }
  @media (max-width: 767px) {
    padding: 30px 40px 50px;
  }
  @media (max-width: 576px) {
    padding: 30px 25px 50px;
    .send_cancel {
      margin-top: 20px;
    }
    .bill_area {
      display: flex;
      justify-content: flex-end;
    }
    .choose_time {
      margin-left: -8px;
    }
  }
`;

const SlideItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  .slider_div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
  }
  .selected_div {
    color: #1877f2;
  }
  .img_container {
    width: 100%;
    height: 250px;
    border-radius: 5px;
    object-fit: cover;
    & img {
      width: 100%;
      height: 100%;
    }
  }
`;
const getSpecialty = (specialtyGroupByAcademic, doctorDetail) => {
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
const CustomerSlideItem = ({
  item,
  handleSelectDoctor,
  selectedDoctorId,
  specialtyGroupByAcademic,
}) => {
  return (
    <SlideItemWrapper>
      <div
        key={item.doctor_id}
        className={classNames({
          slider_div: true,
          selected_div: selectedDoctorId === item.doctor_id,
        })}
        onClick={() => {
          handleSelectDoctor(item.doctor_id);
        }}
      >
        <img src={item.image} alt="" className="img_container" />
        <span>{item.full_name}</span>
        <span>{getSpecialty(specialtyGroupByAcademic, item)}</span>
      </div>
    </SlideItemWrapper>
  );
};
const BookingDoctor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [numberOfSlide, setNumberOfSlide] = useState(3);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: numberOfSlide,
    slidesToScroll: numberOfSlide,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const fetchData = () => {
      dispatch(getAllFacultyForCustomer());
      dispatch(getOptionTimeTable());
      dispatch(getAllSpecialtyGroupByAcademicForCustomer());
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const faculties = useSelector((state) =>
    state.booking.faculty ? state.booking.faculty : []
  );
  const dataSearch = useSelector((state) =>
    state.booking.dataSearch ? state.booking.dataSearch : []
  );

  // const isDoneSearching = useSelector((state) =>
  //   state.booking.isDoneSearching ? state.booking.isDoneSearching : false
  // );

  const [isDoneSearching, setIsDoneSearching] = useState(false);

  const { customer_id } = useSelector((state) =>
    state.customer.customerDetail ? state.customer.customerDetail : {}
  );

  const [inputValues, setInputValues] = useState({ note: "" });

  const handleOnChangeFaculty = (value) => {
    setInputValues({ ...inputValues, faculty_id: value });
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const handleDateChange = (date) => {
    setInputValues({
      ...inputValues,
      booking_day: moment(date).format("DD/MM/YYYY"),
    });
  };

  const handleSearch = async () => {
    const { faculty_id, doctor_name } = inputValues;
    if (!_.isUndefined(faculty_id)) {
      const response = await dispatch(
        findDoctorsByFacultyAndName(faculty_id, doctor_name)
      );
      setIsDoneSearching(true);
      if (response.length < 3) {
        setNumberOfSlide(1);
      } else setNumberOfSlide(3);
      setSelectedDoctor();
      setSelectedDoctorId();
      setSelectedOption();
    }
  };

  const scheduleDoctorTable = useSelector((state) =>
    state.booking.scheduleDoctorTable ? state.booking.scheduleDoctorTable : []
  );

  const specialtyGroupByAcademic = useSelector((state) =>
    state.booking.specialtyGroupByAcademic
      ? state.booking.specialtyGroupByAcademic
      : []
  );
  const [selectedOption, setSelectedOption] = useState();
  const [selectedOptionContent, setSelectedOptionContent] = useState({});

  const handleChooseOption = (id) => {
    if (selectedOption === id) setSelectedOption();
    else setSelectedOption(id);
  };

  const [selectedDoctor, setSelectedDoctor] = useState();

  const [selectedDoctorId, setSelectedDoctorId] = useState();

  const handleSelectDoctor = async (item, id) => {
    if (selectedDoctorId === id) {
      setSelectedDoctor();
      setSelectedDoctorId();
      dispatch(getOptionTimeTable());
    } else {
      setSelectedDoctor(item);
      setSelectedDoctorId(id);
      const request = {
        doctor_id: id,
        book_date: inputValues.booking_day,
      };
      //get data for optiontimetable today
      await dispatch(getScheduleDoctorByDoctorId(request));
    }
  };

  const handleSubmit = async () => {
    const data = {
      doctor_id: selectedDoctorId,
      customer_id: customer_id,
      book_date: inputValues.booking_day,
      list_option_time_id: [selectedOption],
      note: inputValues.note,
    };
    if (_.isUndefined(selectedDoctorId)) {
      notification.error({
        message: "Bạn đặt lịch hẹn không thành công!",
        description: "Bạn chưa chọn bác sĩ! ",
        duration: 2.5,
      });
    } else if (_.isUndefined(selectedOption)) {
      notification.error({
        message: "Bạn đặt lịch hẹn không thành công!",
        description: "Bạn chưa chọn thời gian!",
        duration: 2.5,
      });
    } else {
      const response = await dispatch(requestBookingDoctor(data));
      if (response.status === 200) {
        notification.success({
          message: "Bạn đã đặt lịch hẹn thành công!",
          description:
            "Vui lòng đợi xác nhận của bác sĩ. Bạn có thể kiểm tra trạng thái ở trong lịch sử đặt lịch khám! Trang sẽ tự động chuyển hướng sang quản lý đặt lịch khám sau 3 giây.",
          duration: 2.5,
        });
        setTimeout(async () => {
          history.replace("/customer/manageBooking");
        }, 3000);
      } else {
        notification.error({
          message: "Bạn đặt lịch hẹn không thành công!",
          description: `${response.message}`,
          duration: 2.5,
        });
      }
    }
  };
  const goHomePage = () => {
    history.push("/customer");
  };

  const [visibleBill, setVisibleBill] = useState(false);

  return (
    <Wrapper>
      <div className="header">
        <h1>Đặt lịch khám</h1>
      </div>
      <Row className="flex justify-center">
        <Col xxl={12} lg={18} md={24} sm={24} xs={24}>
          <Row className="flex justify-center info_container">
            <Col span={24}>
              <Form method="post">
                <div className="booking_area">
                  <Row gutter={32}>
                    <Col lg={8} md={8} sm={8} xs={24}>
                      <p>Ngày đặt lịch khám</p>
                    </Col>
                    <Col lg={16} md={16} sm={16} xs={24}>
                      <Form.Item
                        name="booking_day"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn hoặc điền ngày đặt lịch!",
                          },
                        ]}
                      >
                        <DatePicker
                          format="DD/MM/YYYY"
                          name="booking_day"
                          placeholder="DD/MM/YYYY"
                          onChange={handleDateChange}
                          disabledDate={(current) => {
                            return current && current < moment().endOf("day");
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={32}>
                    <Col lg={8} md={8} sm={8} xs={24}>
                      <p>Khoa</p>
                    </Col>
                    <Col lg={16} md={16} sm={16} xs={24}>
                      <Form.Item
                        // label="Khoa"
                        name="faculty_id"
                        rules={[
                          { required: true, message: "Vui lòng chọn khoa!" },
                        ]}
                      >
                        <Select
                          className="faculty_dropdown"
                          placeholder="Chọn khoa"
                          onChange={handleOnChangeFaculty}
                        >
                          {faculties.map((faculty, key) => (
                            <Option key={key} value={faculty.faculty_id}>
                              {faculty.faculty_name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={32}>
                    <Col lg={8} md={8} sm={8} xs={24}>
                      <p>Tên Bác sĩ</p>
                    </Col>
                    <Col lg={16} md={16} sm={16} xs={24}>
                      <Form.Item
                        // label="Khoa"
                        name="doctor_name"
                      >
                        <Input name="doctor_name" onChange={handleOnChange} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="flex justify-end">
                    <Button
                      className="search_button"
                      onClick={handleSearch}
                      htmlType="submit"
                      type="primary"
                    >
                      Tìm kiếm
                    </Button>
                  </div>
                </div>
              </Form>
              <Form method="post">
                <div className="search_result">
                  <div className="title_result">
                    <p>Kết quả tìm kiếm </p>
                  </div>
                  {!isDoneSearching || dataSearch.length === 0 ? (
                    <Result
                      className="no_result"
                      status="warning"
                      title="Không có kết quả"
                    />
                  ) : (
                    <>
                      <Row gutter={32}>
                        <Col lg={8} md={8} sm={8} xs={24}>
                          <p>Chọn Bác sĩ</p>
                        </Col>
                        <Col lg={16} md={16} sm={16} xs={24}>
                          <Form.Item
                            // label="Khoa"
                            name="choose_doctor"
                          >
                            <Slider {...settings} className="slider">
                              {dataSearch.map((item, index) => {
                                return (
                                  <CustomerSlideItem
                                    item={item}
                                    handleSelectDoctor={() =>
                                      handleSelectDoctor(item, item.doctor_id)
                                    }
                                    selectedDoctorId={selectedDoctorId}
                                    key={index}
                                    specialtyGroupByAcademic={
                                      specialtyGroupByAcademic
                                    }
                                  />
                                );
                              })}
                            </Slider>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={8} md={8} sm={8} xs={24}>
                          <p>Chọn thời gian</p>
                        </Col>

                        <Col lg={16} md={16} sm={16} xs={24}>
                          <Form.Item
                            // label="Khoa"
                            className="choose_time"
                          >
                            <Row>
                              {scheduleDoctorTable.map((col, key) => {
                                if (col.status === 2) {
                                  return (
                                    <Col
                                      lg={6}
                                      md={6}
                                      sm={6}
                                      xs={8}
                                      key={key}
                                      className="option_container"
                                    >
                                      <Tooltip
                                        placement="bottom"
                                        title="Thời gian này đã có người đặt chỗ"
                                      >
                                        <Button
                                          className={classNames({
                                            option_button: true,
                                            busy: col.status === 2,
                                          })}
                                        >
                                          {col.option_time_name}
                                        </Button>
                                      </Tooltip>
                                    </Col>
                                  );
                                }
                                return (
                                  <Col
                                    lg={6}
                                    md={6}
                                    sm={6}
                                    xs={8}
                                    key={key}
                                    className="option_container"
                                  >
                                    <Button
                                      className={classNames({
                                        option_button: true,
                                        selected_option:
                                          selectedOption === col.option_time_id,
                                      })}
                                      onClick={() => {
                                        handleChooseOption(col.option_time_id);
                                        setSelectedOptionContent(col);
                                      }}
                                    >
                                      {col.option_time_name}
                                    </Button>
                                  </Col>
                                );
                              })}
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={32}>
                        <Col lg={8} md={8} sm={8} xs={24}>
                          <p>Ghi chú</p>
                        </Col>
                        <Col lg={16} md={16} sm={16} xs={24}>
                          <Form.Item>
                            <Input.TextArea
                              rows={8}
                              name="note"
                              onChange={handleOnChange}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={32}>
                        <Col lg={8} md={8} sm={8} xs={24} className="bill_area">
                          <Button
                            onClick={() => setVisibleBill(true)}
                            className="confirm_button"
                          >
                            Xem hóa đơn xác nhận
                          </Button>
                        </Col>
                        <Col lg={16} md={16} sm={16} xs={24}>
                          <div className="send_cancel">
                            <Space>
                              <Button
                                onClick={goHomePage}
                                className="button_cancel"
                              >
                                Hủy
                              </Button>
                              <Button
                                onClick={handleSubmit}
                                htmlType="submit"
                                className="button_submit"
                                type="primary"
                              >
                                Gửi yêu cầu
                              </Button>
                            </Space>
                          </div>
                        </Col>
                      </Row>
                    </>
                  )}
                </div>
              </Form>
              <BillModal
                visible={visibleBill}
                onHide={() => setVisibleBill(false)}
                doctor={selectedDoctor}
                book_date={inputValues.booking_day}
                note={inputValues.note}
                selected_time={selectedOptionContent.option_time_name}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default BookingDoctor;
