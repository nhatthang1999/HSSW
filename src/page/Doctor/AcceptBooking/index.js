import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  acceptBookingByDoctor,
  getListBookPendingByOptionTime,
  setEditBookingContent,
} from "../../../reducers/TimetableManagement";
import { Table, Button, Space, notification } from "antd";
import _ from "lodash";
import BackButton from "../../../component/BackButton";

const { Column } = Table;
const Wrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  /* color: #3483eb; */
  padding: 20px 50px 100px;
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
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  .function_area {
    .ant-btn {
      border-radius: 5px;
    }
    .add_button {
      position: relative;
      bottom: 49px;
      /* width: 90px; */
    }
    .add_button_no_paging {
      position: relative;
      bottom: -12px;
      /* width: 90px; */
    }
    .edit_button {
      width: 90px;
    }
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
`;

const AcceptBooking = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const search = useLocation().search;
  const optionTimeId = new URLSearchParams(search).get("optionTimeId");
  const bookDate = new URLSearchParams(search).get("bookDate");
  const doctorId = new URLSearchParams(search).get("doctorId");

  useEffect(() => {
    const fetchData = async () => {
      const query = {
        optionTimeId: optionTimeId,
        bookDate: bookDate,
        doctorId: doctorId,
      };
      await dispatch(getListBookPendingByOptionTime(query));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listBookPending = useSelector((state) =>
    state.timetableManagement.listBookPending
      ? state.timetableManagement.listBookPending
      : []
  );
  const data = [];
  for (let i = 0; i < listBookPending.length; i++) {
    data.push({
      key: i,
      ...listBookPending[i],
    });
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedPendingBook, setSelectedPendingBook] = useState({});
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedPendingBook(listBookPending[selectedRowKeys]);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleAcceptBooking = async () => {
    setConfirmLoading(true);
    const response = await dispatch(
      acceptBookingByDoctor(selectedPendingBook.book_time_id)
    );
    if (response.status === 200) {
      await notification.success({
        message: "Xác nhận lịch hẹn thành công!",
        duration: 2.5,
      });
      history.replace(`/doctor/timetable?bookDate=${bookDate}`);
      setConfirmLoading(false);
    } else {
      await notification.error({
        message: "Xác nhận lịch hẹn không thành công!",
        description: `${response.message}`,
        duration: 2.5,
      });
    }
  };
  const handleEditBooking = async () => {
    await dispatch(
      setEditBookingContent({
        ...selectedPendingBook,
        optionTimeId: _.parseInt(optionTimeId),
      })
    );
    history.push(`/doctor/timetable/edit?bookDate=${bookDate}`);
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <BackButton />
        <h1>Xác nhận lịch khám</h1>
      </div>
      <div className="accept_area">
        <Table
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          dataSource={data}
        >
          <Column
            title="Ngày tạo"
            dataIndex="created_date"
            key="created_date"
          />
          <Column
            title="Thời gian tạo"
            dataIndex="created_hour"
            key="created_hour"
          />
          <Column
            title="Mã khách hàng"
            dataIndex="customer_code"
            key="customer_code"
          />
          <Column
            title="Mã lịch khám"
            dataIndex="book_doctor_code"
            key="book_doctor_code"
          />
          <Column
            title="Hồ sơ bệnh án"
            key="action"
            render={(text, record) => (
              <Link to={`/doctor/medical?customerCode=${record.customer_code}`}>
                Xem
              </Link>
            )}
          />
          <Column title="Ghi chú" dataIndex="note" key="note" />
        </Table>
      </div>
      <div className="function_area">
        <Space>
          <Button
            disabled={_.isEmpty(selectedPendingBook)}
            onClick={handleAcceptBooking}
            type="primary"
            className={data.length > 0 ? "add_button" : "add_button_no_paging"}
            loading={confirmLoading}
          >
            Xác nhận
          </Button>
          <Button
            disabled={_.isEmpty(selectedPendingBook)}
            onClick={handleEditBooking}
            className={`${
              data.length > 0 ? "add_button" : "add_button_no_paging"
            } edit_button`}
          >
            Sửa
          </Button>
        </Space>
      </div>
    </Wrapper>
  );
};

export default AcceptBooking;
