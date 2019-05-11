import React from "react";
import styled from "styled-components";

const BackBlack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
`;

const backdrop = () => <BackBlack />;

export default backdrop;
