import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";

import Loader from "../component/LoaderSpinner/Loader";
import Backdrop from "../component/Backdrop/Backdrop";

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

const HomePageContainer = () => {
  const [isReview, setIsReview] = useState(false);
  const [rSubject, setRSubject] = useState("");

  const chooseReview = review => {
    setIsReview(true);
    setRSubject(review.subject);
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
                    {isReview && <Backdrop />}
                    {!isReview && (
                      <PhotoContainer>
                        <Photo src={review.image} />
                        <TextContainer>
                          {review.subject}
                          <Contents>{review.contents}</Contents>
                        </TextContainer>
                      </PhotoContainer>
                    )}
                  </Review>
                );
              })}
            </Container>
          );
        }}
      </Query>
    </MainContainer>
  );
};
export default HomePageContainer;
