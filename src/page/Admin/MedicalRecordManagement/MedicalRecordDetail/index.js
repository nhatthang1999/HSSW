import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { getListDetailByMedicalRecordId } from "../../../../reducers/MedicalRecordManagement";
import { Button, Descriptions, Table, Collapse, Skeleton, Tooltip } from "antd";
import AddMedicalHappening from "../../../../component/AddMedicalHappening";
import { getAuthorization } from "../../../../reducers/Login";
import { DOCTOR } from "../../../../constant/role";
import BackButton from "../../../../component/BackButton";
import EditMedicalHappening from "../../../../component/EditMedicalHappening";
import _ from "lodash";
import { LoadingOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { getCustomerDetail } from "../../../../api/customerManagement";
const { Panel } = Collapse;

const Wrapper = styled.div`
  width: 100%;
  /* color: #3483eb; */
  padding: 20px 50px 100px;
  background-color: #f1f9ff;
  .header {
    text-align: left;
  }
  .ant-btn {
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    &.add_button {
      position: relative;
      bottom: 49px;
    }
    &.add_button_no_paging {
      position: relative;
      bottom: -12px;
    }
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }
  .back_button {
    background: #1890ff;
    color: #ffffff;
    position: relative;
    top: 0;
  }
  .info {
    margin-bottom: 20px;
  }
  .ant-collapse {
    border-radius: 5px;
    .ant-collapse-header {
      font-weight: 600;
      font-size: 20px;
    }
    .ant-descriptions-item-label {
      font-weight: 500;
    }
  }
  .note {
    word-break: break-word;
    white-space: pre-line;

    /* overflow-wrap: break-word; */
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
  .ant-select-selector {
    border-radius: 5px !important;
  }
`;
const MedicalRecordDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const location = useLocation();

  const search = location.search;

  const params = Object.fromEntries(new URLSearchParams(search));

  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    limit: 10,
    sort: "desc",
    medicalRecordId: id,
  });
  const [authorization, setAuthorization] = useState({});

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    showSizeChanger: true,
    total: 0,
  });

  const [medicalRecordDetail, setMedicalRecordDetail] = useState({});
  const [customerDetail, setCustomerDetail] = useState({});
  const [list_medical_detail, setList_medical_detail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setLoadingInfo(true);
      //get list detail
      const response = await dispatch(
        getListDetailByMedicalRecordId({
          ...paramsSearch,
          ...params,
        })
      );
      setMedicalRecordDetail(response);
      setList_medical_detail(response.list_medical_detail);
      //get customer detail
      const { customer_id } = response;
      const { data } = await getCustomerDetail(customer_id);
      setCustomerDetail(data);
      //set paging
      setPagination({
        ...pagination,
        total: response.totalItem,
        current: !_.isUndefined(params.page)
          ? _.parseInt(params.page)
          : pagination.current,
        pageSize: !_.isUndefined(params.limit)
          ? _.parseInt(params.limit)
          : pagination.pageSize,
      });
      //get author
      const res = await dispatch(getAuthorization());
      setAuthorization(res);
      setLoading(false);
      setLoadingInfo(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataWithIndex = [];

  for (let i = 0; i < list_medical_detail.length; i++) {
    dataWithIndex.push({
      key: (pagination.current - 1) * pagination.pageSize + i + 1,
      ...list_medical_detail[i],
    });
  }
  const [showAddNew, setShowAddNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Ngày khám",
      dataIndex: "created_date",
      key: "created_date",
    },
    {
      title: "Thời gian",
      dataIndex: "created_hour",
      key: "created_hour",
    },
    {
      title: "Mã bác sĩ",
      dataIndex: "doctor_code",
      key: "doctor_code",
    },
    {
      title: "Tên bác sĩ",
      dataIndex: "doctor_name",
      key: "doctor_name",
    },
    {
      title: "Diễn biến",
      dataIndex: "helppenings",
      key: "helppenings",
      render: (helppenings) => <p className="note">{helppenings}</p>,
    },
    {
      title: "Y lệnh",
      dataIndex: "prescription",
      key: "prescription",
      render: (prescription) => <p className="note">{prescription}</p>,
    },
    {
      key: "edit",
      render: (text, record) =>
        authorization.role === DOCTOR && (
          <Tooltip title="Sửa" placement="top">
            <Button
              type="link"
              onClick={() => {
                setEditItem(record);
                setShowEdit(true);
              }}
            >
              <EditOutlined />
            </Button>
          </Tooltip>
        ),
    },
  ];

  const handleFetchData = async () => {
    setLoading(true);

    const response = await dispatch(
      getListDetailByMedicalRecordId({
        ...paramsSearch,
        page: pagination.current,
        limit: pagination.pageSize,
      })
    );
    setMedicalRecordDetail(response);
    setList_medical_detail(response.list_medical_detail);
    setPagination({
      ...pagination,
      total: response.totalItem,
      current: !_.isUndefined(params.page)
        ? _.parseInt(params.page)
        : pagination.current,
      pageSize: !_.isUndefined(params.limit)
        ? _.parseInt(params.limit)
        : pagination.pageSize,
    });
    setLoading(false);
  };

  const handleChange = async (pagination, filters, sorter) => {
    setLoading(true);
    setParamsSearch({
      ...paramsSearch,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.order === "ascend" ? "asc" : "desc",
    });

    const params1 = new URLSearchParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
    });

    history.replace(`${location.pathname}?${params1.toString()}`);

    setPagination({
      ...pagination,
      current: pagination.current,
    });

    const response = await dispatch(
      getListDetailByMedicalRecordId({
        ...paramsSearch,
        page: pagination.current,
        limit: pagination.pageSize,
      })
    );
    setMedicalRecordDetail(response);
    setList_medical_detail(response.list_medical_detail);

    setPagination({
      ...pagination,
      total: response.totalItem,
    });
    setLoading(false);
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <BackButton />
        <h1>Hồ sơ bệnh án</h1>
      </div>
      <Collapse
        defaultActiveKey={["1", "2"]}
        expandIconPosition="right"
        className="info"
      >
        <Panel header="Thông tin khách hàng" key="1">
          <Skeleton active loading={loadingInfo}>
            <Descriptions
              bordered
              column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="Mã khách hàng">
                {customerDetail.code}
              </Descriptions.Item>
              <Descriptions.Item label="Họ tên">
                {customerDetail.full_name}
              </Descriptions.Item>
              <Descriptions.Item label="Giới tính">
                {customerDetail.sex ? "Nam" : "Nữ"}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                {customerDetail.birth_day}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {customerDetail.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {customerDetail.address}
              </Descriptions.Item>
              <Descriptions.Item label="Nhóm máu">
                {customerDetail.blood}
              </Descriptions.Item>
              <Descriptions.Item label="Tiền sử bệnh án">
                {customerDetail.medicalHistory}
              </Descriptions.Item>
            </Descriptions>
          </Skeleton>
        </Panel>
        <Panel header="Thông tin đợt khám" key="2">
          <Skeleton active loading={loadingInfo}>
            <Descriptions
              bordered
              column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            >
              <Descriptions.Item label="Đợt khám">
                {medicalRecordDetail.create_date}
              </Descriptions.Item>
              <Descriptions.Item label="Bệnh">
                {medicalRecordDetail.disease_name}
              </Descriptions.Item>
              <Descriptions.Item label="Ghi chú">
                {medicalRecordDetail.note}
              </Descriptions.Item>
            </Descriptions>
          </Skeleton>
        </Panel>
      </Collapse>
      <Table
        dataSource={dataWithIndex}
        columns={columns}
        onChange={handleChange}
        pagination={pagination}
        loading={{
          spinning: loading,
          tip: "Vui lòng đợi...",
          indicator: <LoadingOutlined style={{ fontSize: 24 }} spin />,
        }}
      />
      {authorization.role === DOCTOR && (
        <Tooltip title="Thêm diễn biến" placement="right">
          <Button
            className={
              dataWithIndex.length > 0 ? "add_button" : "add_button_no_paging"
            }
            onClick={() => setShowAddNew(true)}
            type="primary"
            icon={<PlusOutlined style={{ fontSize: "16px" }} />}
          ></Button>
        </Tooltip>
      )}
      <AddMedicalHappening
        visible={showAddNew}
        onHide={() => setShowAddNew(false)}
        afterClose={handleFetchData}
        doctor_id={authorization.role === DOCTOR && authorization.id}
        medical_record_id={medicalRecordDetail.medical_record_id}
      />
      <EditMedicalHappening
        visible={showEdit}
        onHide={() => setShowEdit(false)}
        afterClose={handleFetchData}
        item={editItem}
        doctor_id={authorization.role === DOCTOR && authorization.id}
      />
    </Wrapper>
  );
};

export default MedicalRecordDetail;
