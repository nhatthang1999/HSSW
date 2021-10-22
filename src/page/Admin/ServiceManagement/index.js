import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import _ from "lodash";
import {
  Table,
  Input,
  Button,
  Row,
  Col,
  Tooltip,
  Descriptions,
  Space,
  notification,
} from "antd";
import { useHistory, useLocation } from "react-router-dom";
import ConfirmModal from "../../../component/ConfirmModal";
import AddServiceModal from "../../../component/AddServiceModal";
import EditServiceModal from "../../../component/EditServiceModal";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import NumberFormat from "react-number-format";
import { checkObjectSearch } from "../../../common";
import { LoadingOutlined } from "@ant-design/icons";
import {
  deleteServiceForAdmin,
  getServicesBySearch,
} from "../../../reducers/adminManagement/ServiceManagement";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: #f1f9ff;
  padding: 30px 50px 100px;
  .search_area {
    margin-bottom: 20px;
    .search_button {
      border-radius: 5px;
    }
  }
  .ant-input {
    width: 100%;
    border-radius: 5px;
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
    font-weight: bold;
    text-align: left;
    padding-bottom: 20px;
    margin-bottom: 0;
    color: #286ba6;
  }

  .ant-descriptions-item {
    padding-bottom: 0;
    display: flex;
    justify-content: flex-end;
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
    border-radius: 5px;
  }

  @media only screen and (max-width: 575px) {
    .ant-descriptions-item {
      padding-bottom: 14px;
      justify-content: flex-start;
    }
    .search_button {
      margin-top: 0;
    }
    .search_button_area {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const ServiceManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));

  const [services, setServices] = useState([]);

  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    limit: 10,
    sort: "asc",
    order: "name",
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    showSizeChanger: true,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(
        getServicesBySearch({ ...paramsSearch, ...params })
      );
      setServices(_.get(response, "listServiceResponse", []));
      setPagination({
        ...pagination,
        total: _.get(response, "totalItem", 1),
        current:
          !_.isUndefined(params.page) && !_.isNaN(_.parseInt(params.page))
            ? _.parseInt(params.page)
            : pagination.current,
        pageSize:
          !_.isUndefined(params.limit) && !_.isNaN(_.parseInt(params.limit))
            ? _.parseInt(params.limit)
            : pagination.pageSize,
      });
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);

  const [editItem, setEditItem] = useState({});

  const [deleteId, setDeleteId] = useState();

  const [inputValues, setInputValues] = useState(
    _.omit(params, ["page", "limit", "sort", "order"])
  );

  const dataWithIndex = [];

  for (let i = 0; i < services.length; i++) {
    dataWithIndex.push({
      key: (pagination.current - 1) * pagination.pageSize + i + 1,
      ...services[i],
    });
  }
  const [contentSorter, setContentSorter] = useState("");

  const handleChange = async (pagination, filters, sorter) => {
    setLoading(true);

    setParamsSearch({
      ...paramsSearch,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.order === "descend" ? "desc" : "asc",
      order: "name",
    });

    setContentSorter(
      sorter.order === "descend" ? "Sắp xếp giảm dần" : "Sắp xếp tăng dần"
    );

    const params1 = new URLSearchParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.order === "descend" ? "desc" : "asc",
      order: "name",
    });

    history.push(`${location.pathname}?${params1.toString()}`);
    setPagination({
      ...pagination,
      current: pagination.current,
    });
    const response = await dispatch(
      getServicesBySearch({
        ...params,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sorter.order === "descend" ? "desc" : "asc",
        order: "name",
      })
    );
    setServices(response.listServiceResponse);
    setPagination({
      ...pagination,
      total: response.totalItem,
    });
    setLoading(false);
  };

  const handleFetchData = async () => {
    const response = await dispatch(
      getServicesBySearch({ ...paramsSearch, ...params })
    );
    setServices(response.listServiceResponse);
    setPagination({ ...pagination, total: response.totalItem });
  };

  const callbackFunctionDelete = async () => {
    await notification.success({
      message: "Xóa dịch vụ thành công!",
      duration: 2.5,
    });
    dispatch(deleteServiceForAdmin(deleteId));
    handleFetchData();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: "60px",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "service_name",
      key: "service_name",
      sorter: true,
      // ellipsis: {
      //   showTitle: false,
      // },
      // render: (service_name) => (
      //   <Tooltip placement="topLeft" title={service_name}>
      //     {service_name}
      //   </Tooltip>
      // ),
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Khối lượng",
      dataIndex: "mass",
      key: "mass",
    },

    {
      title: "Đơn giá",
      dataIndex: "price",
      render: (price) => (
        <NumberFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
        />
      ),
      key: "price",
    },
    {
      key: "edit",
      render: (text, record) => (
        <Space>
          <Tooltip title="Sửa" placement="topLeft">
            <Button
              type="primary"
              onClick={() => {
                setEditItem(record);
                setModalShowEdit(true);
              }}
              icon={<EditOutlined />}
            ></Button>
          </Tooltip>
          <Tooltip title="Xóa" placement="topLeft">
            <Button
              type="primary"
              onClick={() => {
                setDeleteId([record.service_id]);
                setModalShowDelete(true);
              }}
              icon={<DeleteOutlined />}
              danger
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSearch = async () => {
    if (checkObjectSearch(inputValues)) {
      setServices([]);
      setPagination({
        ...pagination,
        current: 1,
        total: 0,
      });
      await notification.error({
        message: "Yêu cầu phải nhập tiêu chí tìm kiếm!",
        duration: 2.5,
      });
    } else {
      setLoading(true);
      const params = {
        ...paramsSearch,
        ...inputValues,
        page: 1,
      };
      const params1 = new URLSearchParams({
        ...params,
      });

      history.push(`${location.pathname}?${params1.toString()}`);

      const response = await dispatch(getServicesBySearch(params));
      setPagination({
        ...pagination,
        current: 1,
        total: response.totalItem,
      });
      setServices(response.listServiceResponse);
      setLoading(false);
    }
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <h1>Quản lý Dịch vụ</h1>
        <div className="search_area">
          <Row gutter={[32, 16]}>
            <Col xl={8} lg={12} md={12} sm={16} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={8}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Tên dịch vụ"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={16} xs={24}>
                  <Input
                    name="serviceName"
                    onChange={handleOnChange}
                    defaultValue={_.get(params, "serviceName", "")}
                    autoComplete="off"
                  />
                </Col>
              </Row>
            </Col>
            <Col
              xl={8}
              lg={12}
              md={12}
              sm={8}
              xs={24}
              className="search_button_area"
            >
              {/* <Tooltip title="Ấn vào đây để tìm kiếm" placement="right"> */}
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                className="search_button"
              >
                {/* <SearchOutlined /> */}
                Tìm kiếm
              </Button>
              {/* </Tooltip> */}
            </Col>
          </Row>
        </div>
      </div>

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
        showSorterTooltip={{
          title: `${contentSorter}`,
        }}
      />
      <Tooltip title="Thêm Dịch vụ" placement="right">
        <Button
          type="primary"
          icon={<PlusOutlined style={{ fontSize: "16px" }} />}
          onClick={() => setModalShowAdd(true)}
          className={
            dataWithIndex.length > 0 ? "add_button" : "add_button_no_paging"
          }
        ></Button>
      </Tooltip>
      <AddServiceModal
        visible={modalShowAdd}
        onHide={() => setModalShowAdd(false)}
        afterClose={handleFetchData}
      />

      <EditServiceModal
        visible={modalShowEdit}
        onHide={() => setModalShowEdit(false)}
        item={editItem}
        afterClose={handleFetchData}
      />

      <ConfirmModal
        visible={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
        title="Xác nhận xóa dịch vụ"
        modalText="Bạn có chắc chắn xóa dịch vụ này không?"
        callBack={callbackFunctionDelete}
      />
    </Wrapper>
  );
};

export default ServiceManagement;
