import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled-Components
export const MainContainer = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export const InputBox = styled.div`
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
export const InputSearch = styled.input.attrs({
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

export const SearchButton = styled.button`
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

export const ResetButton = styled.button`
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

export const MoreButton = styled.button`
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

export const Container = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0px auto;
  padding: 1rem 1rem;
`;

export const BookWrapper = styled.div`
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

export const PhotoContainer = styled.div`
  height: 135px;
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  line-height: 1.15;
`;

export const Photo = styled.img`
  height: 90%;
  object-fit: fill;
  width: 90%;
  vertical-align: middle;
  border-style: none;
  border-radius: 5px;
`;

export const BookDetail = styled.div`
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

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
`;

export const Author = styled.div`
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipisis;
  white-space: nowrap;
  margin: 3px auto;
`;

export const Publisher = styled.div`
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipisis;
  white-space: nowrap;
  margin: 3px auto;
`;

export const ReviewButton = styled.div`
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

export const WriteReview = styled.div`
  width: 80%
  max-width: 1000px;
  height: 750px;
  margin: 3rem auto;
  padding: 1.5rem 1.5rem;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #f7f7e6;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3),  0 6px 6px rgba(0, 0, 0, 0.23);
`;

export const ReviewHeader = styled.div`
  font-size: 2.15rem;
  padding: 1.2rem;
  font-family: "Nanum Myeongjo", serif;
  font-weight: bold;
  letter-spacing: 20px;
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  margin-right: 0.7rem;
  text-align: left;
  font-weight: bold;
  font-size: 1.33rem;
  font-family: "Nanum Myeongjo", serif;
  letter-spacing: 2px;
`;

export const Input = styled.input`
  margin: 0.5rem 0;
  padding: 0.75rem 0.7rem;
  width: 75%;
  outline: none;
  cursor: text;
  box-shadow: none;
  background-color: #f7f7e6;
  border-left: 0px;
  border-top: 0px;
  border-right: 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  font-size: 1.2rem;
  font-family: "Nanum Myeongjo", serif;
`;

export const FileLabel = styled(Label)`
  font-size: 1.8rem;
  padding: 1rem 2.8rem 0.5rem 1.5rem;
  margin-right: 10px;
  vertical-align: middle;
  background-color: #f7f7e6;
  left: 2.7rem;
  position: relative;
  z-index: 2;
  top: 3px;
  pointer: cursor;
`;

export const FileInput = styled(Input)`
  border: none;
  font-weight: bold;
  overflow: hidden;
  position: relative;
  left: -4.3rem;
  font-size: 1.1rem;
  z-index: 1;
`;

export const InputContents = styled.textarea`
  margin-bottom: 0.5rem 0;
  padding: 0.75rem;
  font-size: 1.2rem;
  width: 75%;
  vertical-align: top;
  line-height: 1.8;
  font-family: "Nanum Myeongjo", serif;
  border-left: 0px;
  border-top: 0px;
  border-right: 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  background-color: #f7f7e6;
  outline: none;
  :focus {
    border: 1px solid #517fe2;
  }
`;

export const PhotoButton = styled.button`
  min-width: 115px;
  font-size: 100%;
  font-weight: bold;
  letter-spacing: 1px;
  overflow: visible;
  line-height: 1.15;
  align-items: flex-start;
  text-align: center;
  padding: 0.5rem 0.5rem;
  margin: 0.5rem 0.2rem;
  cursor: pointer;
  display: block;
  box-sizing: inherit;
  text-transform: none;
  right: 4.2rem;
  position: relative;
  outline: none;
  font-family: "Nanum Myeongjo", serif;
  background-color: #f7f7e6;
`;

export const UploadButton = styled(PhotoButton)`
  border: none;
  font-family: "Nanum Myeongjo", serif;
  text-decoration: underline;
  text-decoration-color: red;
  right: 1rem;
  margin: 0 auto;
  letter-spacing: 2px;
`;

export const UploadLink = styled(Link)`
  text-decoration: none;
`;

export const SubmitReview = styled(ReviewHeader)`
  font-size: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  padding: 1rem 1rem;
`;
