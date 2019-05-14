import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const ModalContainer = styled.div`
  text-align: center;
  width: 90%;
  position: fixed;
  z-index: 100;
  top: 20vh;
`;

const ModalContent = styled.div`
  margin: 0 auto;
  width: 100%;
  width: 1072px;
  background: white;
  height: 595px;
  left: 10vw;
  box-shadow: 0 2px 8x rgba(242, 239, 239, 0.26);
  z-index: 100;
  border-radius: 15px;
`;

const ButtonBox = styled.div`
  display: inline;
  padding: 1rem;
  top: 10px;
  left: 29rem;
  position: relative;
  z-index: 120;
`;

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.5rem;
  outline: none;
`;

const Content = styled.div`
  top: -0.02rem;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
`;

const modal = props => (
  <ModalContainer>
    <ModalContent>
      <ButtonBox>
        <Button onClick={props.onClose}>
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button onClick={props.onClose}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
        <Button onClick={props.onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </ButtonBox>
      <Content>{props.children}</Content>
    </ModalContent>
  </ModalContainer>
);

export default modal;
