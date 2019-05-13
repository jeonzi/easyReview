import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";

import Loader from "../component/LoaderSpinner/Loader";
import Backdrop from "../component/Backdrop/Backdrop";
import Modal from "../component/Modal/Modal";

const MainContainer = styled.div`
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0px auto;
  padding: 16px 0px;
`;

const Review = styled.div`
  margin: 0px 8px 8px;
  width: 400px;
  cursor: pointer;
`;

const PhotoContainer = styled.figure`
  height: 350px;
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 10px auto;
  border-style: none;
  border-radius: 10px;
  background-color: white;
`;

const Photo = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
  vertical-align: middle;
  border-style: none;
  border-radius: 10px;
  backface-visibility: hidden;
  opacity: 0.8;
`;

const TextContainer = styled.figcaption`
  background-color: rgba(0, 0, 0, 0.1);
  text-align: left;
  top: 0px;
  left: 0px;
  color: #fff;
  padding: 2rem;
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: "Do Hyeon", sans-serif;
  font-size: 2rem;
  letter-spacing: 2px;
  backface-visibility: hidden;
  text-shadow: 4px 2px 2px gray;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
  }
`;

const Contents = styled.div`
  display: block;
  padding: 1rem;
  margin-top: 1rem;
  height: 70%;
  color: rgba(0, 0, 0, 0);
  text-transform: none;
  text-shadow: none;
  font-weight: 500;
  font-size: 1.5rem;
  font-family: "Noto Serif KR", serif;
  &:hover {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    background: rgba(255, 255, 255, 0.8);
    color: #2f3238;
    border-radius: 3px;
  }
`;

const ModalContents = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const MImgBox = styled.div`
  min-width: 460px;
  max-width: 470px;
  height: 580px;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ModalImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  object-fit: fill;
`;

const ContentsBox = styled.div`
  color: black;
  padding: 8px 16px;
  height: 580px;
  min-width: 460px;
  box-sizing: border-box;
  border-radius: 5px;
  align-items: center;
  text-align: left;
  display: block;
  flex: 1;
`;

const ReviewBox = styled.div`
  width: 560px;
  display: block;
  margin-top: 1.3rem;
`;

const Subject = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  overflow: hidden;
  letter-spacing: 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
  padding-left: 0.5rem;
  padding-bottom: 5px;
  border-bottom: 1px solid #bbb;
  font-family: "East Sea Dokdo", cursive;
`;

const RContents = styled.div`
  font-size: 1.4rem;
  overflow-y: auto;
  margin: 3px auto;
  height: 342px;
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  border-bottom: 1px solid #bbb;
  font-family: "Noto Serif KR", serif;
`;

const BookInfo = styled.div`
  min-width: 400px;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin: 0;
`;

const ImgContainer = styled.div`
  height: 150px;
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  line-height: 1.15;
`;

const BImg = styled.img`
  height: 80%;
  object-fit: fill;
  width: 90%;
  vertical-align: middle;
  border-style: none;
  border-radius: 5px;
`;

const BookDetail = styled.div`
  background: rgba(0, 0, 0, 0);
  color: black;
  padding: 16px 16px;
  height: 135px;
  box-sizing: border-box;
  border-radius: 5px;
  flex: 3.5;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 10px;
  font-family: "Nanum Gothic", sans-serif;
`;

const Author = styled.div`
  font-size: 1.3rem;
  overflow: hidden;
  text-overflow: ellipisis;
  white-space: nowrap;
  margin: 3px auto;
  margin-bottom: 10px;
  font-family: "Nanum Gothic", sans-serif;
`;

const Publisher = styled.div`
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipisis;
  white-space: nowrap;
  margin: 3px auto;
  font-family: "Nanum Gothic", sans-serif;
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
        image
        publisher
      }
    }
  }
`;

const HomePageContainer = () => {
  const [isReview, setIsReview] = useState(false);
  const [rSubject, setRSubject] = useState("");
  const [rImage, setRImage] = useState("");
  const [rContents, setRContents] = useState("");
  const [bTitle, setBTitle] = useState("");
  const [bAuthor, setBAuthor] = useState("");
  const [bImage, setBImage] = useState("");
  const [bPub, setBPub] = useState("");

  const chooseReview = review => {
    setIsReview(true);
    setRSubject(review.subject);
    setRImage(review.image);
    setRContents(review.contents);
    setBTitle(review.book.title.replace(/\(.*\)/, ""));
    setBAuthor(review.book.author);
    setBImage(review.book.image);
    setBPub(review.book.publisher);
  };

  const closeModal = () => {
    setIsReview(false);
  };

  console.log(isReview, rSubject);

  return (
    <MainContainer>
      <Query query={READ_REVIEWS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <div>ERROR!!!!!</div>;
          return (
            <Container>
              {data.reviews.map(review => {
                return (
                  <Review
                    key={review.id}
                    onClick={() => {
                      chooseReview(review);
                    }}
                  >
                    <PhotoContainer>
                      <Photo src={review.image} />
                      <TextContainer>
                        {review.subject}
                        <Contents>{review.contents}</Contents>
                      </TextContainer>
                    </PhotoContainer>
                  </Review>
                );
              })}
            </Container>
          );
        }}
      </Query>
      {isReview && <Backdrop />}
      {isReview && (
        <Modal onClose={closeModal}>
          <ModalContents>
            <MImgBox>
              <ModalImg src={rImage} />
            </MImgBox>
            <ContentsBox>
              <ReviewBox>
                <Subject>{rSubject}</Subject>
                <RContents>{rContents}</RContents>
              </ReviewBox>
              <BookInfo>
                <ImgContainer>
                  <BImg src={bImage} />
                </ImgContainer>
                <BookDetail>
                  <Title>{bTitle}</Title>
                  <Author>{bAuthor}</Author>
                  <Publisher>{bPub}</Publisher>
                </BookDetail>
              </BookInfo>
            </ContentsBox>
          </ModalContents>
        </Modal>
      )}
    </MainContainer>
  );
};
export default HomePageContainer;
