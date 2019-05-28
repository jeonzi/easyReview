import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import * as styles from "./Styles/HomePageContainer";
import Loader from "../component/LoaderSpinner/Loader";
import Modal from "../component/Modal/Modal";

const READ_REVIEWS = gql`
  query reviews {
    reviews {
      id
      subject
      phrase
      contents
      image
      book {
        title
        author
        image
        publisher
      }
    }
  }
`;

let handleArrowKeys;

const HomePageContainer = () => {
  const [isReview, setIsReview] = useState(false);
  const [rSubject, setRSubject] = useState("");
  const [rImage, setRImage] = useState("");
  const [rIndex, setRIndex] = useState();
  const [rContents, setRContents] = useState("");
  const [rPhrase, setRPhrase] = useState("");
  const [bTitle, setBTitle] = useState("");
  const [bAuthor, setBAuthor] = useState("");
  const [bImage, setBImage] = useState("");
  const [bPub, setBPub] = useState("");
  const [modal, setModal] = useState();
  const [rId, setRId] = useState("");

  const chooseReview = (review, index) => {
    setIsReview(true);
    setRSubject(review.subject);
    setRImage(review.image);
    setRContents(review.contents);
    setBTitle(review.book.title.replace(/\(.*\)/, ""));
    setBAuthor(review.book.author);
    setBImage(review.book.image);
    setBPub(review.book.publisher);
    setRIndex(index);
    setRId(review.id);
    setRPhrase(review.phrase);
  };

  const closeModal = () => {
    setIsReview(false);
  };

  console.log(modal);

  return (
    <styles.MainContainer>
      <Query query={READ_REVIEWS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <div>ERROR!!!!!</div>;
          const reviews = data.reviews;
          console.log(reviews);
          return (
            <styles.Container>
              {
                (handleArrowKeys = (modal, setModal) => e => {
                  console.log(e.key);
                  if (e.key === "ArrowRight") setModal(modal + 1);
                  else if (e.key === "ArrowLeft") setModal(modal - 1);
                  // else if (e.key === "Escape") setIsReview(false);
                  chooseReview(reviews[modal], modal);
                  console.log(reviews);
                })
              }
              {reviews.map((review, index) => {
                return (
                  <styles.Review
                    key={review.id}
                    onClick={() => {
                      chooseReview(review, index);
                    }}
                  >
                    <styles.PhotoContainer onClick={() => setModal(index)}>
                      <styles.Photo src={review.image} />
                      <styles.TextContainer>
                        <styles.Blockq id="popup">
                          <styles.Contents>{review.phrase}</styles.Contents>
                        </styles.Blockq>
                      </styles.TextContainer>
                    </styles.PhotoContainer>
                  </styles.Review>
                );
              })}
            </styles.Container>
          );
        }}
      </Query>
      {isReview && (
        <Modal
          {...{
            rId,
            handleArrowKeys,
            onClose: closeModal,
            open: rIndex === modal,
            modal,
            setModal
          }}
        >
          <styles.ModalContents onClick={e => e.stopPropagation()}>
            <styles.MImgBox>
              <styles.ModalImg id="hide" src={rImage} />
              <styles.MImgHover>
                <styles.MBlockq id="popup2">
                  <styles.MContents>{rPhrase}</styles.MContents>
                </styles.MBlockq>
              </styles.MImgHover>
            </styles.MImgBox>
            <styles.ContentsBox>
              <styles.ReviewBox>
                <styles.Subject>{rSubject}</styles.Subject>
                <styles.RContents>{rContents}</styles.RContents>
              </styles.ReviewBox>
              <styles.BookInfo>
                <styles.ImgContainer>
                  <styles.BImg src={bImage} />
                </styles.ImgContainer>
                <styles.BookDetail>
                  <styles.Title>{bTitle}</styles.Title>
                  <styles.Author>{bAuthor}</styles.Author>
                  <styles.Publisher>{bPub}</styles.Publisher>
                </styles.BookDetail>
              </styles.BookInfo>
            </styles.ContentsBox>
          </styles.ModalContents>
        </Modal>
      )}
    </styles.MainContainer>
  );
};
export default HomePageContainer;
