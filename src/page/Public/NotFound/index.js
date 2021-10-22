import { Button, Result } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { getAuthorization } from "../../../reducers/Login";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const NotFound = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [role, setRole] = useState();
  useEffect(() => {
    const authorize = async () => {
      const response = await dispatch(getAuthorization());
      if (_.isUndefined(response?.role)) setRole("");
      else setRole(response.role);
    };

    authorize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại!"
        extra={
          <Button type="primary" onClick={() => history.replace(`/${role}`)}>
            Trở về trang chủ
          </Button>
        }
      />
    </Wrapper>
  );
};

export default NotFound;
