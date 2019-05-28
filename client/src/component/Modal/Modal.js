import React, { useEffect } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../Backdrop/Backdrop";

const DEL_REVIEW = gql`
  mutation delReview($rId: String!) {
    delReview(rId: $rId)
  }
`;

const READ_REVIEWS = gql`
  query reviews {
    reviews {
      id
      subject
      contents
      image
      book {
        title
        author
      }
    }
  }
`;

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
  z-index: 100;
  border-radius: 15px;
  box-shadow: -17px -9px 39px 2px rgba(255, 255, 255, 0.5);
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
  rId,
  handleArrowKeys,
  open,
  onClose,
  children,
  setModal,
  modal
}) => {
  useEffect(() => {
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
            <Mutation
              mutation={DEL_REVIEW}
              variables={{ rId: rId }}
              awaitRefetchQueries
              refetchQueries={[{ query: READ_REVIEWS }]}
            >
              {(delReview, { loading, error }) => {
                if (loading) return <div>Deleting</div>;
                if (error) return <div>ERROR</div>;
                return (
                  <Button onClick={delReview}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                );
              }}
            </Mutation>
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
