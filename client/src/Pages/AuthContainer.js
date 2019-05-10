import React, { useState, useRef } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Loader from "../component/LoaderSpinner/Loader";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faUser, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

// Styled-components
const MainContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
  text-align: center;
  display: inline-block;
`;

const SwitchAuth = styled.div`
  mrgin: 0 auto;
  padding: 10px 0px;
  text-align: center;
`;

const LoginForm = styled.div`
  margin: 0 auto;
  max-width: 750px;
  padding: 40px 0px 0px 0px;
  text-align: center;
  box-sizing: border-box;
`;

const AuthStatus = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 6px;
`;

const Button = styled.button`
  cursor: pointer;
  margin: 8px 0;
  height: 48px;
  width: 80%;
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: white;
  background-color: #2b9cca;
  border: none;
  border-radius: 3px;
`;

const InputDiv = styled.div`
  display: block;
`;

const Input = styled.input`
  margin: 0.7rem 0;
  margin-left: 1rem;
  padding: 1rem 0.7rem;
  width: 72%;
  font-size: 100%;
  font-weight: bold;
  letter-spacing: 2px;
  border-right: 0px;
  border-top: 0px;
  boder-left: 0px;
  border: 0;
  border-bottom: 1px solid #2b8bc2;
  ouutline: none;
  cursor: text;
  box-shadow: none;
  border-radius: 3px;
  background-color: #e8f0fe;
`;

const Line = styled.hr`
  color: #f1f3f5;
  width: 80%;
`;

const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

const AuthContainer = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();
  const userNameInput = useRef();

  const getUserInfo = e => {
    e.preventDefault();
    if (emailInput.current.value.length > 0) {
      setEmail(emailInput.current.value);
      setPassword(passwordInput.current.value);
    } else {
      setIsLogin(false);
    }
  };

  const signUpInfo = async () => {
    setUsername(userNameInput.current.value);
    setEmail(emailInput.current.value);
    setPassword(passwordInput.current.value);
  };

  console.log(email, password, username);

  return (
    <MainContainer>
      <LoginForm>
        <AuthStatus>{isLogin ? "로그인" : "회원 가입"}</AuthStatus>
        {!isLogin && (
          <form onChange={signUpInfo}>
            <InputDiv>
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <Input
                type="name"
                id="username"
                placeholder="Your name"
                ref={userNameInput}
              />
            </InputDiv>
            <InputDiv>
              <span>
                <FontAwesomeIcon icon={faAt} />
              </span>
              <Input
                type="email"
                id="e-mail"
                placeholder="Your email address"
                ref={emailInput}
              />
            </InputDiv>
            <InputDiv>
              <span>
                <FontAwesomeIcon icon={faUnlockAlt} />
              </span>
              <Input
                type="password"
                placeholder="Your password"
                ref={passwordInput}
              />
            </InputDiv>
            <Mutation
              mutation={CREATE_USER}
              variables={{
                email: email,
                username: username,
                password: password
              }}
              onCompleted={() => history.push("/auth")}
            >
              {(createUser, { loading, error }) => {
                if (loading) return <Loader />;
                if (error) return <div>다시 시도해 주십시오.</div>;
                return <Button onClick={createUser}>가입</Button>;
              }}
            </Mutation>
            <Line />
            <SwitchAuth>
              <Button onClick={() => setIsLogin(true)}>로그인하기</Button>
            </SwitchAuth>
          </form>
        )}
        {isLogin && (
          <div>
            <form>
              <InputDiv>
                <span>
                  <FontAwesomeIcon icon={faAt} />
                </span>
                {/* <label htmlFor="e-mail">E-mail</label> */}
                <Input
                  placeholder="User email"
                  type="email"
                  id="e-mail"
                  ref={emailInput}
                />
              </InputDiv>
              <InputDiv>
                <span>
                  <FontAwesomeIcon icon={faUnlockAlt} />
                </span>
                <Input
                  type="password"
                  placeholder="User password"
                  ref={passwordInput}
                />
              </InputDiv>
              <div>
                <Button onClick={getUserInfo}>로그인</Button>
              </div>
            </form>
            <Line />
            <SwitchAuth>
              <Button onClick={() => setIsLogin(false)}>가입하기</Button>
            </SwitchAuth>
            <Query
              query={LOGIN_USER}
              variables={{ email: email, password: password }}
              onCompleted={() => history.push("/main")}
            >
              {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return <div />;
                return <div>로그인 성공 {data.loginUser}</div>;
              }}
            </Query>
          </div>
        )}
      </LoginForm>
    </MainContainer>
  );
};

export default AuthContainer;
