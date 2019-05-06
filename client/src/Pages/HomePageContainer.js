import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader from "../component/LoaderSpinner/Loader";
import styled from "styled-components";

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
  width: 200px;
  cursor: pointer;
`;

const PhotoContainer = styled.div`
  height: 300px;
  position: relative;
  width: 100%;
`;

const Photo = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
  vertical-align: middle;
  border-style: none;
`;

const TitleContainer = styled.div`
  background: rgba(0, 0, 0, 0.65);
  bottom: 0px;
  color: white;
  padding: 12px 16px;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
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
  return (
    <Query query={READ_REVIEWS}>
      {({ loading, error, data }) => {
        if (loading) return <Loader />;
        if (error) return <div>ERROR!!!!!</div>;
        return (
          <Container>
            {data.reviews.map(review => {
              return (
                <Review>
                  <PhotoContainer key={review.id}>
                    <Photo src={review.image} />
                    <TitleContainer>{review.subject}</TitleContainer>
                  </PhotoContainer>
                </Review>
              );
            })}
          </Container>
        );
      }}
    </Query>
  );
};
export default HomePageContainer;
