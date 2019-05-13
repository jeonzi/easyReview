import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const ModalContent = styled.div`
  max-width: 980px;
  width: 80%;
  background: white;
  top: 20vh;
  left: 20%;
  position: fixed;
  z-index: 100;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 2px 8x rgba(242, 239, 239, 0.26);
`;

const ButtonBox = styled.div`
  position: absolute;
  height: 20px;
  top: 5px;
  right: 5px;
  display: inline;
`;

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.5rem;
  outline: none;
`;

const Content = styled.div``;

const modal = props => (
  <ModalContent>
    <Content>{props.children}</Content>
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
  </ModalContent>
);

export default modal;
