import React from "react";
import ReactToPrint from "react-to-print";
import { Collapse, Descriptions, Table } from "antd";
import "./style.css";
import { Logo } from "../../../../assets/image";

const { Panel } = Collapse;
class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let dataTable = this.props.dataPrint;
    let customerDetail = this.props.customerDetail;
    const dataWithIndex = [];

    for (let i = 0; i < dataTable.list_medical_detail.length; i++) {
      dataWithIndex.push({
        key: i + 1,
        ...dataTable.list_medical_detail[i],
      });
    }

    const columns = [
      {
        title: "Ngày khám",
        dataIndex: "created_date",
        key: "created_date",
        width: "110px",
      },
      {
        title: "Thời gian",
        dataIndex: "created_hour",
        key: "created_hour",
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
        render: (helppenings) => (
          <p style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}>
            {helppenings}
          </p>
        ),
        width: "200px",
      },
      {
        title: "Y lệnh",
        dataIndex: "prescription",
        key: "prescription",
        render: (prescription) => (
          <p style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}>
            {prescription}
          </p>
        ),
        width: "200px",
      },
    ];
    return (
      <div className="print-source">
        <div>
          <div style={{ position: "absolute", top: "0", left: "0" }}>
            <Logo />
          </div>
          <h1 style={{ fontSize: "30px" }}>
            Hospital Supporting Service Website
          </h1>
        </div>
        <h1 style={{ fontSize: "24px" }}>Hồ sơ bệnh án</h1>
        <Collapse
          defaultActiveKey={["1", "2"]}
          // className="info"
          expandIconPosition="right"
          style={{ marginBottom: "16px" }}
        >
          <Panel
            header="Thông tin khách hàng"
            key="1"
            style={{
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            <Descriptions
              bordered
              size="small"
              labelStyle={{ fontSize: "13px", fontWeight: "500" }}
              contentStyle={{ fontSize: "13px" }}
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
          </Panel>
          <Panel
            header="Thông tin đợt khám"
            key="2"
            style={{ fontSize: "16px", fontWeight: "500" }}
          >
            <Descriptions
              bordered
              labelStyle={{ fontSize: "13px", fontWeight: "500" }}
              contentStyle={{ fontSize: "13px" }}
            >
              <Descriptions.Item label="Đợt khám">
                {dataTable.create_date}
              </Descriptions.Item>
              <Descriptions.Item label="Bệnh">
                {dataTable.disease_name}
              </Descriptions.Item>
              <Descriptions.Item label="Ghi chú">
                {dataTable.note}
              </Descriptions.Item>
            </Descriptions>
          </Panel>
        </Collapse>
        <Table
          dataSource={dataWithIndex}
          columns={columns}
          bordered={true}
          pagination={false}
        />
        {/* <p style={{ textAlign: "center", marginTop: "16px" }}>
          Copyright © 2021 HSSW. All rights reserved
        </p> */}
      </div>
    );
  }
}

class PrintData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ComponentToPrint
          dataPrint={this.props?.dataPrint}
          customerDetail={this.props?.customerDetail}
          ref={(el) => (this.componentRef = el)}
        />
        <ReactToPrint
          trigger={() => <button ref={this.props.printRef} />}
          content={() => this.componentRef}
        />
      </div>
    );
  }
}

export default PrintData;
