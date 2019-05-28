import React, { useState, useRef } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { uploadPic } from "../uploadUserPicTolBB";
import Loader from "../component/LoaderSpinner/Loader";
import * as styles from "./Styles/postReviewContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPencilAlt,
  faTimesCircle,
  faAngleDoubleRight,
  faImage
} from "@fortawesome/free-solid-svg-icons";

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
    $phrase: String!
    $contents: String!
    $image: String!
  ) {
    addReview(
      book_id: $book_id
      subject: $subject
      contents: $contents
      phrase: $phrase
      image: $image
    ) {
      subject
      contents
      phrase
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
      phrase
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
  const phraseInput = useRef();
  const [rPhrase, setRPhrase] = useState("");

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
      setRPhrase(phraseInput.current.value);
    } else {
      setIsReview(false);
    }
  };

  console.log(imageUrl, bookId);
  console.log(image);
  console.log(isReview);
  // console.log(typeof image);
  // console.log(subject, contents);
  // console.log(isReview);

  return (
    <styles.MainContainer>
      <form onSubmit={search}>
        {/* Naver Book API와 연동해서 리뷰 작성할 책(제목으로) 검색하기 */}
        <styles.InputBox>
          <styles.InputSearch ref={titleInput} />
          {!isBook && ( // 선택한 책이 없을 때는 검색 아이콘
            <styles.SearchButton type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </styles.SearchButton>
          )}
          {isBook && ( // 책을 선택한 경우 X 버튼으로 바뀜
            <styles.ResetButton onClick={resetSearch}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </styles.ResetButton>
          )}
        </styles.InputBox>
      </form>

      {/* 리뷰 작성할 책을 선택할 경우 보여지는 리뷰 작성 Form */}
      {isBook && (
        <styles.WriteReview>
          <styles.ReviewHeader>독후감</styles.ReviewHeader>
          <form onChange={getReview}>
            <styles.InputBox>
              <styles.Label htmlFor="subject">제목 :</styles.Label>
              <styles.Input
                type="text"
                placeholder="독후감 제목을 입력해주세요"
                id="subject"
                ref={subjectInput}
              />
            </styles.InputBox>
            <styles.InputBox>
              <styles.Label htmlFor="phrase">문장 :</styles.Label>
              <styles.Input
                type="text"
                placeholder="인상적이었던 한 문장을 넣어주세요"
                id="phrase"
                ref={phraseInput}
              />
            </styles.InputBox>
            <styles.InputBox>
              <styles.Label htmlFor="contents">내용 :</styles.Label>
              <styles.InputContents
                name="review"
                id="contents"
                rows="10"
                ref={contentsInput}
              />
            </styles.InputBox>
          </form>
          <styles.InputBox>
            <styles.FileLabel for="photo">
              <FontAwesomeIcon icon={faImage} />
            </styles.FileLabel>
            <styles.FileInput type="file" id="photo" onChange={getImageFile} />
            <styles.PhotoButton onClick={uploadImageFile}>
              사진 올리기
            </styles.PhotoButton>
          </styles.InputBox>

          {/* 작성한 리뷰를 DB에 저장해주는 mutation: Apollo 클라이언트가 GraphQL과 쉽게 연결해준다 */}
          <styles.SubmitReview>
            <Mutation
              mutation={ADD_REVIEW}
              variables={{
                subject: subject,
                phrase: rPhrase,
                book_id: bookId,
                contents: contents,
                image: imageUrl
              }}
              onCompleted={() => {
                // Mutaion이 완료되면 결과가 /main 페이지로 넘어간다
                history.push("/main");
              }}
              refetchQueries={[{ query: READ_REVIEWS }]}
              // mutaion 작동 후 READ_REVIEWS 쿼리를 자동으로 실행해준다 --> 새로 작성한 리뷰가 main 페이지에서 새로고침 하지 않아도 바로 보임
            >
              {(addReview, { loading, error }) => {
                if (loading) return <Loader />;
                if (error) return <div>에러다아아아아아아!!!!!!</div>;
                return (
                  <styles.UploadLink to="/main">
                    <styles.UploadButton onClick={addReview}>
                      제출하기
                    </styles.UploadButton>
                  </styles.UploadLink>
                );
              }}
            </Mutation>
          </styles.SubmitReview>
        </styles.WriteReview>
      )}

      {/* 책을 NaverApi와 DB속 책 검색 결과를 반화해준다. */}
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
              <styles.Container>
                {data.searchBooks.map(book => {
                  let imageUrl = book.image;
                  if (book.image === "") {
                    imageUrl = "https://www.gapines.org/images/books.jpg";
                  }
                  return (
                    <styles.BookWrapper key={book.id}>
                      <styles.PhotoContainer
                        onClick={() => {
                          chooseBook(book);
                        }}
                      >
                        {/* <Photo src={book.image} /> */}
                        <styles.Photo
                          src={imageUrl}
                          onError={e => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://www.gapines.org/images/books.jpg";
                          }}
                        />
                      </styles.PhotoContainer>
                      <styles.BookDetail>
                        <styles.Title>{book.title}</styles.Title>
                        <styles.Author>{book.author}</styles.Author>
                        <styles.Publisher>{book.publisher}</styles.Publisher>
                        <styles.ReviewButton
                          onClick={() => {
                            chooseBook(book);
                          }}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                          &nbsp;리뷰 쓰기
                        </styles.ReviewButton>
                      </styles.BookDetail>
                    </styles.BookWrapper>
                  );
                })}

                {/* 검색 결과 원하는 결과가 없을 경우, 다시 naver api에서 찾아 검색 결과를 DB에 저장 */}
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
                        <styles.Container>
                          <Loader />
                        </styles.Container>
                      );
                    if (error) return <div>Error</div>;
                    return (
                      <styles.Container>
                        <styles.MoreButton onClick={addSearchBooks}>
                          더 보기&nbsp;
                          <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </styles.MoreButton>
                      </styles.Container>
                    );
                  }}
                </Mutation>
                {data.searchBooks.length === 0 && (
                  <div>해당 책이 없습니다.</div>
                )}
              </styles.Container>
            );
          }}
        </Query>
      )}
    </styles.MainContainer>
  );
};

export default PostReviewContainer;
