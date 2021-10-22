import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useResponsiveFontSize from "../../hooks/useResponsiveFontSize";
import { Input, notification } from "antd";
import _ from "lodash";
import { RechargeMoneyError } from "../../constant/error";
import { rechargeMoney } from "../../api/user";
import { useDispatch } from "react-redux";
import { getProfile } from "../../reducers/Customer";
import styled from "styled-components";

const Wrapper = styled.div`
  .ant-input-affix-wrapper {
    border-radius: 5px;
    padding: 4px 11px;
    .ant-input {
      border: none !important;
      padding: 0;
      box-shadow: none !important;
    }
  }
  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-focused {
    border-color: none !important;
    border-right-width: 0 !important;
    outline: 0;
    box-shadow: none !important;
  }
`;

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
          width: "100%",
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const CardForm = ({ customer_id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const dispatch = useDispatch();
  const [money, setMoney] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (payload?.error) {
      notification.error({
        message: "Đã xảy ra lỗi!",
        description: _.get(RechargeMoneyError, `${payload.error.code}`, ""),
      });
    } else if (payload?.paymentMethod) {
      const request = {
        money: _.parseInt(money),
        card_number: payload.paymentMethod.card.last4,
        exprire_date: `${payload.paymentMethod.card.exp_month}/${payload.paymentMethod.card.exp_year}`,
        cvv: payload.paymentMethod.card.three_d_secure_usage.supported,
        customer_id: customer_id,
      };
      const response = await rechargeMoney(request);
      if (response.status === 200) {
        notification.success({
          message: "Nạp tiền thành công!",
          description: `Bạn đã nạp thành công ${_.parseInt(
            money
          )} VND vào tài khoản`,
          duration: 2.5,
          onClose: () => dispatch(getProfile()),
        });
      } else {
        notification.error({
          message: "Nạp tiền không thành công!",
          description: `${response.message}`,
        });
      }
    }
  };

  const handleOnChange = (event) => {
    setMoney(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label style={{ width: "100%" }}>Chi tiết thẻ</label>
      <CardElement options={options} />
      <Wrapper>
        <Input
          type="number"
          name="money"
          onChange={handleOnChange}
          min={0}
          suffix="VND"
        />
      </Wrapper>

      <button type="submit" disabled={!stripe}>
        Nạp tiền
      </button>
    </form>
  );
};

export default CardForm;
