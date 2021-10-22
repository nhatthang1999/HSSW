import { Col, Descriptions, Row, Space, Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CardForm from "../../../component/CardForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NumberFormat from "react-number-format";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const { TabPane } = Tabs;

const Wrapper = styled.div`
  width: 100%;
  background-color: #f1f9ff;
  padding: 30px 100px 50px;
  min-height: 100vh;
  button {
    white-space: nowrap;
    border: 0;
    outline: 0;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    color: #fff;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    background-color: #6772e5;
    text-decoration: none;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
    margin-top: 10px;
  }

  button:hover {
    color: #fff;
    cursor: pointer;
    background-color: #7795f8;
    transform: translateY(-1px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
  label {
    color: #6b7c93;
    font-weight: 300;
    letter-spacing: 0.025em;
  }
  input,
  .StripeElement {
    display: block;
    margin: 10px 0 20px 0;
    padding: 10px 14px;
    font-size: 1em;
    font-family: "Source Code Pro", monospace;
    box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
      rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
    border: 0;
    outline: 0;
    border-radius: 4px;
    background: white;
    width: 100%;
  }

  input::placeholder {
    color: #aab7c4;
  }

  input:focus,
  .StripeElement--focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
      rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
  }

  .StripeElement.IdealBankElement,
  .StripeElement.FpxBankElement,
  .StripeElement.PaymentRequestButton {
    padding: 0;
  }

  .StripeElement.PaymentRequestButton {
    height: 40px;
  }
  h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0;
    padding-bottom: 20px;
    color: #286ba6;
  }
  .info_container {
    border: 1px solid hsla(0, 0%, 100%, 0);
    clear: both;
    padding: 20px;
    position: relative;
    transition: box-shadow 0.2s, border 0.1s;
    border: 1px solid rgba(0, 0, 0, 0.14);
    border-radius: 5px;
    box-shadow: 4px 8px 20px rgb(0 0 0 / 5%);
    background: #ffffff;
    min-height: 320px;
  }
  @media (max-width: 1200px) {
    padding: 30px 70px;
  }
  @media (max-width: 992px) {
    padding: 30px 50px;
  }
  @media (max-width: 767px) {
    padding: 30px 40px;
    .hidden_responsive {
      display: none !important;
    }
  }
  @media (max-width: 576px) {
    padding: 30px 25px;
  }
`;
const Wallet = () => {
  const { wallet = 0, customer_id = 0 } = useSelector(
    (state) => state.customer.customerDetail
  );

  return (
    <Wrapper>
      <div className="header">
        <h1>Ví của tôi</h1>
      </div>
      <Row className="flex justify-center">
        <Col xxl={8} lg={12} md={16} sm={20} xs={24}>
          <Row className="flex justify-center info_container">
            <Col span={24}>
              <Tabs animated>
                <TabPane tab="Ví của tôi" key="1">
                  <Descriptions>
                    <Descriptions.Item label="Số dư tài khoản">
                      {/* <FormattedNumber
                        value={wallet}
                        // eslint-disable-next-line react/style-prop-object
                        style="currency"
                        currency="VND"
                      /> */}
                      <Space>
                        <NumberFormat
                          value={wallet}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                        <span>{"VND"}</span>
                      </Space>
                    </Descriptions.Item>
                  </Descriptions>
                </TabPane>
                <TabPane tab="Nạp tiền vào ví" key="2">
                  <Elements stripe={stripePromise}>
                    <CardForm customer_id={customer_id} />
                  </Elements>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Wallet;
