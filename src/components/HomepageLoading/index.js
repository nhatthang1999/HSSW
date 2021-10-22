import React from "react";
import styled from "styled-components";
import loading from "../../assets/image/loading.gif";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
`;
const HomepageLoading = () => {
  return (
    <Wrapper>
      <img src={loading} alt="" />
    </Wrapper>
  );
};
export default HomepageLoading;
