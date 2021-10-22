import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  margin-top: 10px;
  .back_button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
`;

const BackButton = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <Wrapper>
      <Tooltip title="Trở về trang trước" placement="right">
        <Button onClick={goBack} className="back_button" shape="circle">
          <ArrowLeftOutlined style={{ fontSize: "16px" }} />
        </Button>
      </Tooltip>
    </Wrapper>
  );
};

export default BackButton;
