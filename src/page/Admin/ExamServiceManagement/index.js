import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Input,
  Table,
  Row,
  Col,
  Descriptions,
  Select,
  Typography,
  message,
  notification,
  Tooltip,
} from "antd";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import { DOCTOR } from "../../../constant/role";
import { getAuthorization } from "../../../reducers/Login";
import {
  SearchOutlined,
  EyeOutlined,
  PlusOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddServiceCartModal from "../../../component/AddServiceCartModal";
import {
  deleteServiceCart,
  getServiceCartsBySearch,
} from "../../../reducers/ExamServiceManagement";
import ConfirmModal from "../../../component/ConfirmModal";
import { checkObjectSearch } from "../../../common";
const { Option } = Select;
const { Text } = Typography;

const Wrapper = styled.div`
  width: 100%;
  background-color: #f1f9ff;
  padding: 30px 50px 100px;
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
  .ant-picker {
    width: 100%;
  }
  .ant-select-selector {
    border-radius: 5px !important;
  }
  .ant-input {
    width: 100%;
    border-radius: 5px;
  }
  .search_area {
    margin-bottom: 20px;
    .search_button_area {
      display: flex;
      justify-content: flex-end;
      .search_button {
        border-radius: 5px;
      }
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
  @media only screen and (max-width: 1199px) {
  }
  @media only screen and (max-width: 767px) {
    .ant-descriptions-item {
      padding-bottom: 16px;
      display: flex;
      justify-content: flex-start;
    }
    .search_button {
      margin-top: 39px;
    }
  }
  @media only screen and (max-width: 575px) {
    .search_button {
      margin-top: 0;
    }
    .search_area {
      .search_button_area {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

const ExamServiceManament = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const search = location.search;
  const params = Object.fromEntries(new URLSearchParams(search));
  const [serviceCarts, setServiceCarts] = useState([]);
  const [authorization, setAuthorization] = useState({});

  const [paramsSearch, setParamsSearch] = useState({
    page: 1,
    limit: 10,
    sort: "desc",
    order: "create_date",
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
        getServiceCartsBySearch({ ...paramsSearch, ...params })
      );
      setServiceCarts(response.list_cart_responses);
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
      const res = await dispatch(getAuthorization());
      setAuthorization(res);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputValues, setInputValues] = useState(
    _.omit(params, ["page", "limit", "sort", "order"])
  );

  const dataWithIndex = [];

  for (let i = 0; i < serviceCarts.length; i++) {
    dataWithIndex.push({
      key: (pagination.current - 1) * pagination.pageSize + i + 1,
      ...serviceCarts[i],
    });
  }

  const handleChange = async (pagination, filters, sorter) => {
    setLoading(true);
    setParamsSearch({
      ...paramsSearch,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.order === "ascend" ? "asc" : "desc",
      order: !_.isUndefined(sorter.order) ? sorter.field : "create_date",
    });

    const params1 = new URLSearchParams({
      ...params,
      page: pagination.current,
      limit: pagination.pageSize,
      sort: sorter.order === "ascend" ? "asc" : "desc",
      order: !_.isUndefined(sorter.order) ? sorter.field : "create_date",
    });

    history.push(`${location.pathname}?${params1.toString()}`);
    setPagination({
      ...pagination,
      current: pagination.current,
    });
    const response = await dispatch(
      getServiceCartsBySearch({
        ...params,
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sorter.order === "ascend" ? "asc" : "desc",
        order: !_.isUndefined(sorter.order) ? sorter.field : "create_date",
      })
    );
    setServiceCarts(response.list_cart_responses);

    setPagination({
      ...pagination,
      total: response.totalItem,
    });
    setLoading(false);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Ngày",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "Đợt khám",
      dataIndex: "dot_kham",
      key: "dot_kham",
      sorter: true,
    },
    {
      title: "Mã dịch vụ khám",
      dataIndex: "cart_code",
      key: "cart_code",
      responsive: ["lg"],
    },

    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
      sorter: true,
    },
    {
      title: "Mã khách hàng",
      dataIndex: "customer_code",
      key: "customer_code",
    },
    {
      title: "Mã hồ sơ",
      dataIndex: "medical_record_code",
      key: "medical_record_code",
      responsive: ["lg"],
    },
    {
      title: "Trạng thái",
      dataIndex: "is_pay",
      key: "is_pay",
      // sorter: true,
      render: (status) => (
        <>
          {status ? (
            <Text type="success">Đã thanh toán</Text>
          ) : (
            <Text type="danger">Chưa thanh toán</Text>
          )}
        </>
      ),
    },
    {
      key: "action",
      render: (text, record) => (
        <Tooltip title="Xem chi tiết" placement="top">
          <Link to={`${location.pathname}/${record.cart_id}`}>
            <EyeOutlined />
          </Link>
        </Tooltip>
      ),
    },
    {
      key: "delete",
      render: (text, record) =>
        !record.is_pay &&
        authorization.role === DOCTOR && (
          <Tooltip title="Xóa" placement="top">
            <Button
              type="link"
              onClick={() => {
                setDeleteId(record.cart_id);
                setShowDelete(true);
              }}
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>
        ),
    },
  ];

  const [showAddNew, setShowAddNew] = useState(false);

  const handleFetchData = async () => {
    setLoading(true);
    const response = await dispatch(
      getServiceCartsBySearch({ ...paramsSearch, ...params })
    );
    setServiceCarts(response.list_cart_responses);
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

  const handleSearch = async () => {
    if (checkObjectSearch(inputValues)) {
      setServiceCarts([]);
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

      const response = await dispatch(getServiceCartsBySearch(params));
      setPagination({
        ...pagination,
        current: 1,
        total: response.totalItem,
      });
      setServiceCarts(response.list_cart_responses);
      setLoading(false);
    }
  };

  const handleChangeStatus = (status) => {
    setInputValues({ ...inputValues, isPay: status });
  };

  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const callbackFunctionDelete = async () => {
    await message.loading("Hành động đang được thực hiện...", 2.5);
    const response = await dispatch(
      deleteServiceCart({
        cartId: deleteId,
      })
    );
    if (response.status === 200) {
      await notification.success({
        message: "Xóa danh sách dịch vụ khám thành công!",
        duration: 2.5,
      });
      handleFetchData();
    } else if (response.status === 400) {
      await notification.error({
        message: "Xóa danh sách dịch vụ khám thất bại!",
        description: `${response.message}`,
        duration: 2.5,
      });
    }
  };

  return (
    <Wrapper className="px-4 sm:px-6 lg:px-8">
      <div className="header">
        <h1>Quản lý dịch vụ khám</h1>
        <div className="search_area">
          <Row gutter={[32, 16]}>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Tên khách hàng"></Descriptions.Item>
                  </Descriptions>
                </Col>

                <Col lg={16} md={16} sm={24} xs={24}>
                  <Input
                    name="customerName"
                    onChange={handleOnChange}
                    defaultValue={_.get(params, "customerName", "")}
                  />
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Mã khách hàng"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <Input
                    name="customerCode"
                    onChange={handleOnChange}
                    defaultValue={_.get(params, "customerCode", "")}
                  />
                </Col>
              </Row>
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <Row>
                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  xs={24}
                  className="d-flex align-items-center"
                >
                  <Descriptions>
                    <Descriptions.Item label="Trạng thái"></Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col lg={16} md={16} sm={24} xs={24}>
                  <Select
                    className="w-full"
                    onChange={(status) => handleChangeStatus(status)}
                    defaultValue={
                      _.get(params, "isPay", "") === "true"
                        ? true
                        : _.get(params, "isPay", "") === "false"
                        ? false
                        : ""
                    }
                  >
                    <Option value="">- Chọn trạng thái để lọc -</Option>
                    <Option value={true}>Đã thanh toán</Option>
                    <Option value={false}>Chưa thanh toán</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col
              xl={24}
              lg={12}
              md={12}
              sm={12}
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
      />

      {authorization.role === DOCTOR && (
        <Tooltip title="Thêm danh sách dịch vụ" placement="right">
          <Button
            type="primary"
            icon={<PlusOutlined style={{ fontSize: "16px" }} />}
            className={
              dataWithIndex.length > 0 ? "add_button" : "add_button_no_paging"
            }
            onClick={() => setShowAddNew(true)}
          ></Button>
        </Tooltip>
      )}
      <AddServiceCartModal
        visible={showAddNew}
        onHide={() => setShowAddNew(false)}
        // afterClose={handleFetchData}
      />
      <ConfirmModal
        visible={showDelete}
        onHide={() => setShowDelete(false)}
        title="Xác nhận xóa danh sách dịch vụ khám"
        modalText="Bạn có chắc chắn xóa danh sách dịch vụ khám này không?"
        callBack={callbackFunctionDelete}
      />
    </Wrapper>
  );
};

export default ExamServiceManament;
