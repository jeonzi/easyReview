import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { uploadPic } from "../uploadUserPicTolBB";
import { Link } from "react-router-dom";
import Loader from "../component/LoaderSpinner/Loader";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPencilAlt,
  faTimesCircle,
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";

// Styled-Components
const MainContainer = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const InputBox = styled.div`
  margin: 0 auto;
  position: relative;
  max-width: 1000px;
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
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding: 0.6rem 1.2rem;
  width: 75%;
  font-size: 100%;
  font-weight: bold;
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
    border-color: #2c82be;
    border-radius: 999px;
    outline: none;
    box-shadow: 0 0 5px rgba(66, 175, 247, 1);
  }
`;

const SearchButton = styled.button`
  font-size: 100%;
  overflow: visible;
  line-height: 1.15;
  align-items: flex-start;
  text-align: center;
  padding: 0.5rem 0;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border: none;
  background-color: #f1f3f5;
  display: block;
  box-sizing: inherit;
  text-transform: none;
  position: relative;
  z-index: 2;
  left: -2.7rem;
  outline: none;
`;

const ResetButton = styled.button`
  font-size: 100%;
  overflow: visible;
  line-height: 1.15;
  align-items: flex-start;
  text-align: center;
  padding: 0.5rem 0;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border: none;
  background-color: #f1f3f5;
  display: block;
  box-sizing: inherit;
  text-transform: none;
  position: relative;
  z-index: 3;
  left: -2.7rem;
  outline: none;
`;

const MoreButton = styled.button`
  font-size: 100%;
  font-weight: bold;
  letter-spacing: 1px;
  overflow: visible;
  line-height: 1.15;
  align-items: flex-start;
  text-align: center;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  border: none;
  background-color: white;
  display: block;
  box-sizing: inherit;
  text-transform: none;
  position: relative;
  outline: none;
`;

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0px auto;
  padding: 1rem 1rem;
`;

const BookWrapper = styled.div`
  margin: 0.8rem;
  min-width: 400px;
  width: 400px;
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
  justify-content: center;
  line-height: 1.15;
`;

const Photo = styled.img`
  height: 90%;
  object-fit: fill;
  width: 90%;
  vertical-align: middle;
  border-style: none;
  border-radius: 5px;
`;

const BookDetail = styled.div`
  background: rgba(0, 0, 0, 0);
  color: black;
  padding: 8px 16px;
  height: 135px;
  box-sizing: border-box;
  border-radius: 5px;
  flex: 3.2;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
`;

const Author = styled.div`
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipisis;
  white-space: nowrap;
  margin: 3px auto;
`;

const Publisher = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipisis;
  white-space: nowrap;
  margin: 3px auto;
`;

const ReviewButton = styled.div`
  font-size: 90%;
  color: #87818c;
  overflow: visible;
  line-height: 1.15;
  padding: 0.75rem 0;
  cursor: pointer;
  border: none;
  background-color: #fff;
  display: block;
  text-align: right;
  position: relative;
`;

const WriteReview = styled.div`
  width: 80%
  padding: 1.5rem 1.5rem;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #898888;
  border-radius: 5px;
  position: absolute;
  left: 9%;
`;

const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  margin-right: 0.7rem;
  text-align: left;
`;

const Input = styled.input`
  margin: 0.5rem 0;
  padding: 0.75rem 0.7rem;
  width: 75%;
  font-size: 100%;
  border-right: 0px;
  border-top: 0px;
  boder-left: 0px;
  border: none;
  ouutline: none;
  cursor: text;
  box-shadow: none;
`;

const InputContents = styled.textarea`
  margin-bottom: 0.5rem 0;
  padding: 0.75rem;
  font-size: 100%;
  width: 75%;
  height: 75%;
  vertical-align: top;
  font-family: "Nanum Gothic Coding", monospace;
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
  console.log(image);
  // console.log(typeof image);
  // console.log(subject, contents);
  // console.log(isReview);

  return (
    <MainContainer>
      <form onSubmit={search}>
        <InputBox>
          <InputSearch ref={titleInput} />
          {!isBook && (
            <SearchButton type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </SearchButton>
          )}
          {isBook && (
            <ResetButton onClick={resetSearch}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </ResetButton>
          )}
        </InputBox>
      </form>
      {isBook && (
        <WriteReview>
          <form onChange={getReview}>
            <InputBox>
              <Label htmlFor="subject">제목 :</Label>
              <Input
                type="text"
                placeholder="Review title"
                id="subject"
                ref={subjectInput}
              />
            </InputBox>
            <InputBox>
              <Label htmlFor="phrase">글귀 :</Label>
              <Input
                type="text"
                placeholder="Impressive phrases"
                id="phrase"
                disabled
              />
            </InputBox>
            <InputBox>
              <Label htmlFor="contents">내용 :</Label>
              <InputContents
                name="review"
                id="contents"
                rows="10"
                ref={contentsInput}
              />
            </InputBox>
          </form>
          <InputBox>
            <Input type="file" onChange={getImageFile} />
            <button onClick={uploadImageFile}>사진 업로드</button>
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
          </InputBox>
        </WriteReview>
      )}
      {isSearching && (
        <Query
          query={SEARCH_BOOKS}
          variables={{ title }}
          notifyOnNetworkStatusChange
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error) return <div>Something happened!!!</div>;
            return (
              <Container>
                {data.searchBooks.map(book => {
                  let imageUrl = book.image;
                  if (book.image === "") {
                    imageUrl = "https://www.gapines.org/images/books.jpg";
                  }
                  return (
                    <BookWrapper key={book.id}>
                      <PhotoContainer
                        onClick={() => {
                          chooseBook(book);
                        }}
                      >
                        {/* <Photo src={book.image} /> */}
                        <Photo
                          src={imageUrl}
                          onError={e => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://www.gapines.org/images/books.jpg";
                          }}
                        />
                      </PhotoContainer>
                      <BookDetail>
                        <Title>{book.title}</Title>
                        <Author>{book.author}</Author>
                        <Publisher>{book.publisher}</Publisher>
                        <ReviewButton
                          onClick={() => {
                            chooseBook(book);
                          }}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                          &nbsp;리뷰 쓰기
                        </ReviewButton>
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
                    if (loading)
                      return (
                        <Container>
                          <Loader />
                        </Container>
                      );
                    if (error) return <div>Error</div>;
                    return (
                      <Container>
                        <MoreButton onClick={addSearchBooks}>
                          더 보기&nbsp;
                          <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </MoreButton>
                      </Container>
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
    </MainContainer>
  );
};

export default PostReviewContainer;
