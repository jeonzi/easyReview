import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { uploadPic } from "./uploadUserPicTolBB";
import { Link } from "react-router-dom";
import Loader from "./component/LoaderSpinner/Loader";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Styled-Components
const InputBox = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
  box-sizing: border-box;
  position: relative;
  :focus {
    border: none;
    border-color: white;
  }
`;
const InputSearch = styled.input.attrs({
  type: "text",
  placeholder: "Book Title"
})`
  padding: 0.75rem 1.5rem;
  width: 80%;
  font-family: fa5-proxima-nova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 100%;
  border-width: 0.125rem;
  border-color: #f1f3f5;
  outline-offset: -2px;
  border-style: solid;
  background-color: #f1f3f5;
  cursor: text;
  border-radius: 999px;
  z-index: 1;
  position: relative;
  :focus {
    border-color: #5089de;
    border-radius: 999px;
    outline: none;
  }
`;

const SearchButton = styled.button`
  font-size: 100%;
  overflow: visible;
  line-height: 1.15;
  align-items: flex-start;
  text-align: center;
  padding: 0.75rem 0;
  cursor: pointer;
  border: none;
  background-color: #f1f3f5;
  display: block;
  box-sizing: inherit;
  text-transform: none;
  align-items: flex-start;
  position: relative;
  z-index: 2;
  left: -2.7rem;
`;

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0px auto;
  padding: 16px 0px;
`;

const BookWrapper = styled.div`
  margin: 0px 8px 8px;
  width: 416.695px;
  cursor: pointer;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  border: 1px solid #bbb;
  border-radius: 5px;
`;

const PhotoContainer = styled.div`
  height: 135px;
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
`;

const Photo = styled.img`
  height: 95%;
  object-fit: fill;
  width: 95%;
  vertical-align: middle;
  border-style: none;
  border-radius: 5px;
`;

const BookDetail = styled.div`
  background: white;
  color: black;
  padding: 12px 16px;
  height: 135px;
  box-sizing: border-box;
  border-radius: 5px;
  flex: 3.2;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AuthPub = styled.span`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipisis;
  white-space: nowrap;
`;
// Apollo Query
const SEARCH_BOOKS = gql`
  query searchBooks($title: String!) {
    searchBooks(title: $title) {
      title
      author
      id
      isbn
      image
      publisher
    }
  }
`;

const ADD_SEARCH_BOOKS = gql`
  mutation addSearchBooks($title: String!) {
    addSearchBooks(title: $title) {
      id
    }
  }
`;

const ADD_REVIEW = gql`
  mutation addReview(
    $book_id: String!
    $subject: String!
    $contents: String!
    $image: String!
  ) {
    addReview(
      book_id: $book_id
      subject: $subject
      contents: $contents
      image: $image
    ) {
      subject
      contents
      image
      book {
        id
      }
    }
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

const PostReviewContainer = ({ history }) => {
  const [title, setTitle] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isBook, setIsBook] = useState(false);
  const titleInput = useRef();
  const [bookId, setBookId] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const subjectInput = useRef();
  const contentsInput = useRef();
  const [isReview, setIsReview] = useState(false);
  const [subject, setSubject] = useState("");
  const [contents, setContents] = useState("");

  const search = e => {
    e.preventDefault();
    if (titleInput.current.value.length > 0) {
      setIsSearching(true);
      setTitle(titleInput.current.value);
    } else {
      setIsSearching(false);
    }
  };

  const resetSearch = () => {
    setIsBook(false);
    titleInput.current.value = "";
    titleInput.current.disabled = false;
  };

  const chooseBook = book => {
    setIsSearching(false);
    titleInput.current.value = book.title;
    titleInput.current.disabled = true;
    setIsBook(true);
    setBookId(book.id);
  };

  const getImageFile = async e => {
    setImage(e.target.files[0]);
  };

  const uploadImageFile = async () => {
    const imageUrl = await uploadPic(image);
    setImageUrl(imageUrl);
  };

  const getReview = async () => {
    if (subjectInput.current.value.length > 0) {
      setIsReview(true);
      setSubject(subjectInput.current.value);
      setContents(contentsInput.current.value);
    } else {
      setIsReview(false);
    }
  };

  console.log(imageUrl, bookId);
  console.log(subject, contents);
  // console.log(isReview);

  return (
    <div>
      <form onSubmit={search}>
        <InputBox>
          <InputSearch ref={titleInput} />
          {!isBook && (
            <SearchButton type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </SearchButton>
          )}
          {isBook && <button onClick={resetSearch}>더 보기</button>}
        </InputBox>
      </form>
      {isBook && (
        <div>
          <form onChange={getReview}>
            <div>
              <label htmlFor="subject">독후감 제목</label>
              <input type="text" ref={subjectInput} />
            </div>
            <div>
              <label htmlFor="contents">내용</label>
              <textarea
                name="review"
                id="mola"
                cols="60"
                rows="10"
                ref={contentsInput}
              />
            </div>
          </form>
          <input type="file" onChange={getImageFile} />
          <button onClick={uploadImageFile}>사진 올리기</button>
          {isReview && (
            <Mutation
              mutation={ADD_REVIEW}
              variables={{
                subject: subject,
                book_id: bookId,
                contents: contents,
                image: imageUrl
              }}
              onCompleted={() => {
                history.push("/main");
              }}
              refetchQueries={[{ query: READ_REVIEWS }]}
            >
              {(addReview, { loading, error }) => {
                if (loading) return <Loader />;
                if (error) return <div>에러다아아아아아아!!!!!!</div>;
                return (
                  <Link to="/main">
                    <button onClick={addReview}>등록</button>
                  </Link>
                );
              }}
            </Mutation>
          )}
        </div>
      )}
      {isSearching && (
        <Query query={SEARCH_BOOKS} variables={{ title }}>
          {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error) return <div>Something happened!!!</div>;
            return (
              <Container>
                {data.searchBooks.map(book => {
                  return (
                    <BookWrapper key={book.id}>
                      <PhotoContainer
                        onClick={() => {
                          chooseBook(book);
                        }}
                      >
                        <Photo src={book.image} />
                      </PhotoContainer>
                      <BookDetail>
                        <Title>{book.title}</Title>
                        <br />
                        <AuthPub>
                          {book.author} / {book.publisher}
                        </AuthPub>
                      </BookDetail>
                    </BookWrapper>
                  );
                })}
                <Mutation
                  mutation={ADD_SEARCH_BOOKS}
                  variables={{ title }}
                  refetchQueries={[
                    {
                      query: SEARCH_BOOKS,
                      variables: { title }
                    }
                  ]}
                  awaitRefetchQueries
                >
                  {(addSearchBooks, { loading, error }) => {
                    if (loading) return <Loader />;
                    if (error) return <div>Error</div>;
                    return (
                      <div>
                        <button onClick={addSearchBooks}>더 보기</button>
                      </div>
                    );
                  }}
                </Mutation>
                {data.searchBooks.length === 0 && (
                  <div>해당 책이 없습니다.</div>
                )}
              </Container>
            );
          }}
        </Query>
      )}
    </div>
  );
};

export default PostReviewContainer;
