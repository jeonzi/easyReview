import styled from "styled-components";

export const MainContainer = styled.div`
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0px auto;
  padding: 16px 0px;
`;

export const Review = styled.div`
  margin: 0px 8px 8px;
  width: 400px;
  cursor: pointer;
  &:hover #popup {
    opacity: 1;

    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    transition: opacity 0.35s, transform 0.35s;
    box-sizing: border-box;
  }
`;

export const PhotoContainer = styled.figure`
  height: 350px;
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 10px auto;
  border-style: none;
  border-radius: 10px;
  background-color: white;
`;

export const Photo = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
  vertical-align: middle;
  border-style: none;
  border-radius: 10px;
  backface-visibility: hidden;
  opacity: 0.8;
`;

export const TextContainer = styled.figcaption`
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
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    color: rgba(0, 0, 0, 0);
  }
`;

export const Blockq = styled.blockquote`
  font-family: Georgia, serif;
  font-weight: bold;
  font-size: 2rem;
  line-height: 2.3;
  position: relative;
  padding: 0.5rem;
  margin-block-start: 0.8em;
  margin-block-end: 0.8em;
  margin-inline-start: 37px;
  margin-inline-end: 37px;
  opacity: 0;

  &:before,
  &:after {
    position: absolute;
    width: 3rem;
    height: 3rem;
    opacity: 0.8;
    z-index: 50;
  }

  &:before {
    content: "“";
    color: #ffeded;
    font-size: 5rem;
    left: -4rem;
    top: -2rem;
    opacity: 0.8;
  }
  &:after {
    content: "”";
    color: #ffeded;
    font-size: 5rem;
    right: -4.5rem;
    bottom: 1rem;
  }
`;

export const Contents = styled.div`
  font-family: "East Sea Dokdo", cursive;
  text-align: center;
  color: #fff;
  line-height: 1;
  font-size: 2.3rem;
  letter-spacing: 2px;
  margin-top: 5rem;
  margin-bottom: 0.7rem;
  padding: 0;
  font-weight: lighter;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const ModalContents = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const MImgBox = styled.div`
  min-width: 460px;
  max-width: 470px;
  height: 595px;
  align-items: center;
  justify-content: center;
  flex: 1;

  &:hover #popup2 {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    transition: opacity 0.35s, transform 0.35s;
    box-sizing: border-box;
  }
`;

export const MImgHover = styled.div`
  background-color: rgba(0, 0, 0, 0);
  text-align: left;
  top: 0px;
  left: 0px;
  color: #fff;
  padding: 2rem;
  position: absolute;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  box-sizing: border-box;
  height: 100%;
  min-width: 460px;
  max-width: 470px;
  overflow: hidden;
  border-radius: 10px 0 0 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.85);
    color: rgba(0, 0, 0, 0);
  }
`;

export const ModalImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px 0 0 10px;
  object-fit: fill;
`;

export const ContentsBox = styled.div`
  color: black;
  padding: 0 16px;
  margin-left: 16px;
  height: 580px;
  min-width: 460px;
  box-sizing: border-box;
  border-radius: 5px;
  align-items: center;
  text-align: left;
  display: block;
  flex: 1;
`;

export const MBlockq = styled(Blockq)`
  line-height: 5;
  &:before,
  &:after {
    position: absolute;
    width: 3rem;
    height: 10rem;
    opacity: 0.8;
    z-index: 50;
  }

  &:before {
    content: "“";
    color: #ffeded;
    font-size: 5rem;
    left: -3.2rem;
    opacity: 0.8;
    top: -8rem;
  }
  &:after {
    content: "”";
    color: #ffeded;
    font-size: 5rem;
    right: -3.8rem;
    bottom: -4.5rem;
  }
`;

export const MContents = styled.div`
  font-family: "East Sea Dokdo", cursive;
  text-align: center;
  color: #fff;
  line-height: 1.1;
  font-size: 2.5rem;
  letter-spacing: 2px;
  margin-top: 7rem;
  margin-botom: -1rem;
  font-weight: lighter;
  box-sizing: border-box;
  overflow: visible;
  white-space: normal;
  text-overflow: clip;
  word-break: break-all;
  word-wrap: initial; // word-wrap: 박스 가로 영역 넘친 단어 내에서 임의로 줄바꿈
`;

export const ReviewBox = styled.div`
  width: 560px;
  display: block;
  margin-top: 1.3rem;
`;

export const Subject = styled.div`
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
  padding-left: 0.5rem;
  padding-bottom: 10px;
  padding-top: 15px;
  border-bottom: 1px solid #dbd9d9;
  font-family: "Nanum Gothic", serif;
`;

export const RContents = styled.div`
  font-size: 1.3rem;
  overflow-y: scroll;
  margin: 3px auto;
  height: 342px;
  padding: 8px;
  line-height: 180%;
  border-bottom: 1px solid #dbd9d9;
  letter-spacing: 1px;
  font-family: "Nanum Gothic", serif;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const BookInfo = styled.div`
  min-width: 400px;
  width: 550px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin: 0;
`;

export const ImgContainer = styled.div`
  height: 140px;
  position: relative;
  display: flex;
  flex: 0.8;
  align-items: center;
  justify-content: center;
  line-height: 1.15;
`;

export const BImg = styled.img`
  height: 80%;
  object-fit: fill;
  width: 80%;
  vertical-align: middle;
  border-style: none;
  border-radius: 5px;
`;

export const BookDetail = styled.div`
  background: rgba(0, 0, 0, 0);
  color: black;
  padding: 18px 16px;
  width: 450px;
  height: 135px;
  box-sizing: border-box;
  border-radius: 5px;
  flex: 3.5;
  align-items: center;
  overflow: hidden;
  text-align: left;
`;

export const Title = styled.div`
  width: 450px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 7px;
  font-family: "Nanum Gothic", sans-serif;
`;

export const Author = styled.div`
  font-size: 1.3rem;
  overflow: hidden;
  text-overflow: ellipisis;
  white-space: nowrap;
  margin: 3px auto;
  margin-bottom: 7px;
  font-family: "Nanum Gothic", sans-serif;
`;

export const Publisher = styled.div`
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipisis;
  white-space: nowrap;
  margin: 3px auto;
  font-family: "Nanum Gothic", sans-serif;
`;
