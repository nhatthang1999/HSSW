import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Collapse, Table, Button, Tooltip, Space } from "antd";
import { useDispatch } from "react-redux";
import {
  getAcceptedBookingByCustomerId,
  getCancelBookingByCustomerId,
  getPendingBookingByCustomerId,
} from "../../../reducers/Customer";
import ConfirmModal from "../../../component/ConfirmModal";
import { cancelBookingDoctor } from "../../../reducers/Booking";
import { Icon } from "@iconify/react";
import outlineFreeCancellation from "@iconify-icons/ic/outline-free-cancellation";
import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";

const { Column } = Table;
const { Panel } = Collapse;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f1f9ff;
  padding: 30px 300px 50px;
  .header {
    display: flex;
    align-items: center;
  }
  h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  .ant-collapse {
    border-radius: 5px;
    margin-bottom: 20px;
    .ant-collapse-header {
      font-weight: 600;
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
  .note {
    word-break: break-word;
    margin-bottom: 0;
  }
  @media (max-width: 1440px) {
    padding: 30px 150px 50px;
  }
  @media (max-width: 1200px) {
    padding: 30px 70px 50px;
  }
  @media (max-width: 992px) {
    padding: 30px 50px 50px;
  }
  @media (max-width: 767px) {
    padding: 30px 40px 50px;

    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 576px) {
    padding: 30px 25px 50px;
  }
`;
const ManageBooking = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState([]);
  const [pending, setPending] = useState([]);
  const [cancel, setCancel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      Promise.all([
        await dispatch(getPendingBookingByCustomerId()),
        await dispatch(getAcceptedBookingByCustomerId()),
        await dispatch(getCancelBookingByCustomerId()),
      ]).then((res) => {
        setPending(res[0].data);
        setAccepted(res[1].data);
        setCancel(res[2].data);
      });
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const { accepted, pending, cancel } = useSelector((state) =>
  //   state.customer.listOfBooking ? state.customer.listOfBooking : {}
  // );
  const [modalShowCancel, setModalShowCancel] = useState(false);
  const [cancelId, setCancelId] = useState();

  const dataCancel = [];
  for (let i = 0; i < cancel.length; i++) {
    dataCancel.push({
      key: i + 1,
      ...cancel[i],
    });
  }

  const dataPending = [];
  for (let i = 0; i < pending.length; i++) {
    dataPending.push({
      key: i + 1,
      ...pending[i],
    });
  }

  const dataAccepted = [];
  for (let i = 0; i < accepted.length; i++) {
    dataAccepted.push({
      key: i + 1,
      ...accepted[i],
    });
  }
  const callbackCancel = async () => {
    await dispatch(cancelBookingDoctor(cancelId));
    fetchData();
  };

  const fetchData = () => {
    Promise.all([
      dispatch(getPendingBookingByCustomerId()),
      dispatch(getAcceptedBookingByCustomerId()),
      dispatch(getCancelBookingByCustomerId()),
    ]).then((res) => {
      setPending(res[0].data);
      setAccepted(res[1].data);
      setCancel(res[2].data);
    });
  };

  return (
    <Wrapper>
      <div className="header">
        <h1>Quản lý lịch đặt khám</h1>
      </div>
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        className="info"
      >
        <Panel header="Lịch khám đang chờ duyệt" key="1">
          <Table
            dataSource={dataPending}
            loading={{
              spinning: loading,
              tip: "Vui lòng đợi...",
              indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />,
            }}
          >
            <Column title="STT" dataIndex="key" key="key" responsive={["lg"]} />
            <Column title="Khoa" dataIndex="faculty" key="faculty" />
            <Column
              title="Học vị"
              dataIndex="specialty"
              key="specialty"
              responsive={["lg"]}
            />
            <Column title="Bác sĩ" dataIndex="doctor_name" key="doctor_name" />
            <Column
              title="Ghi chú"
              dataIndex="note"
              key="note"
              responsive={["xl"]}
              render={(note) => {
                return <p className="note">{note}</p>;
              }}
            />
            <Column
              title="Thời gian"
              dataIndex="optionTime"
              key="optionTime"
              responsive={["xl"]}
            />
            <Column
              key="action"
              width="100px"
              render={(text, record) => (
                <Tooltip title="Hủy lịch khám" placement="top">
                  <Button
                    onClick={() => {
                      setCancelId(record.book_doctor_id);
                      setModalShowCancel(true);
                    }}
                    danger
                    type="link"
                  >
                    <Icon
                      icon={outlineFreeCancellation}
                      style={{ fontSize: "16px" }}
                    />
                  </Button>
                </Tooltip>
              )}
            />
          </Table>
        </Panel>
      </Collapse>
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        className="info"
      >
        <Panel header="Lịch khám đã được chấp nhận" key="1">
          <Table
            dataSource={dataAccepted}
            loading={{
              spinning: loading,
              tip: "Vui lòng đợi...",
              indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />,
            }}
          >
            <Column title="STT" dataIndex="key" key="key" responsive={["lg"]} />
            <Column title="Khoa" dataIndex="faculty" key="faculty" />
            <Column
              title="Học vị"
              dataIndex="specialty"
              key="specialty"
              responsive={["lg"]}
            />
            <Column title="Bác sĩ" dataIndex="doctor_name" key="doctor_name" />
            <Column
              title="Ghi chú"
              dataIndex="note"
              key="note"
              responsive={["xl"]}
              render={(note) => {
                return <p className="note">{note}</p>;
              }}
            />
            <Column
              title="Thời gian"
              dataIndex="optionTime"
              key="optionTime"
              responsive={["xl"]}
            />
            <Column
              key="action"
              width="100px"
              render={(text, record) => (
                <Space>
                  <Tooltip title="Xem chi tiết" placement="top">
                    <Button
                      href={`/customer/paymentHistory/${record.payment_id}`}
                      type="link"
                      icon={<EyeOutlined style={{ fontSize: "16px" }} />}
                      className="d-flex justify-center items-center	"
                    ></Button>
                  </Tooltip>
                  {record.can_cancel && (
                    <Tooltip title="Hủy lịch khám" placement="top">
                      <Button
                        onClick={() => {
                          setCancelId(record.book_doctor_id);
                          setModalShowCancel(true);
                        }}
                        danger
                        type="link"
                        icon={
                          <Icon
                            icon={outlineFreeCancellation}
                            style={{ fontSize: "16px" }}
                          />
                        }
                        className="d-flex justify-center items-center	"
                      ></Button>
                    </Tooltip>
                  )}
                </Space>
              )}
            />
          </Table>
        </Panel>
      </Collapse>
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="right"
        className="info"
      >
        <Panel header="Lịch khám đã hủy" key="1">
          <Table
            dataSource={dataCancel}
            loading={{
              spinning: loading,
              tip: "Vui lòng đợi...",
              indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />,
            }}
          >
            <Column title="STT" dataIndex="key" key="key" responsive={["lg"]} />
            <Column title="Khoa" dataIndex="faculty" key="faculty" />
            <Column
              title="Học vị"
              dataIndex="specialty"
              key="specialty"
              responsive={["lg"]}
            />
            <Column title="Bác sĩ" dataIndex="doctor_name" key="doctor_name" />
            <Column
              title="Ghi chú"
              dataIndex="note"
              key="note"
              responsive={["xl"]}
              render={(note) => {
                return <p className="note">{note}</p>;
              }}
            />
            <Column
              title="Thời gian"
              dataIndex="optionTime"
              key="optionTime"
              responsive={["xl"]}
            />
            <Column
              title="Ngày hủy"
              dataIndex="cancel_date"
              key="cancel_date"
            />
          </Table>
        </Panel>
      </Collapse>
      <ConfirmModal
        visible={modalShowCancel}
        onHide={() => setModalShowCancel(false)}
        title="Xác nhận hủy đặt lịch khám"
        modalText="Bạn có chắc chắn hủy đặt lịch khám này không?"
        callBack={callbackCancel}
      />
    </Wrapper>
  );
};

export default ManageBooking;
