import React, { useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../Backdrop/Backdrop";

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
  top: 8px;
  left: 29.5rem;
  position: relative;
  z-index: 120;
`;

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.5rem;
  outline: none;
  color: #7c7b7b;
`;

const Content = styled.div`
  top: -0.02rem;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
`;

const Modal = ({
  handleArrowKeys,
  open,
  onClose,
  children,
  setModal,
  modal
}) => {
  useEffect(() => {
    console.log(modal);
    const handler = handleArrowKeys(modal, setModal);
    document.addEventListener(`keydown`, handler);
    return () => document.removeEventListener(`keydown`, handler);
  });

  return (
    <React.Fragment>
      <Backdrop open={open} onClick={setModal} />
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalContent>
          <ButtonBox>
            <Button onClick={onClose}>
              <FontAwesomeIcon icon={faEdit} />
            </Button>
            <Button onClick={onClose}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Button onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </ButtonBox>
          <Content>{children}</Content>
        </ModalContent>
      </ModalContainer>
    </React.Fragment>
  );
};

export default Modal;
