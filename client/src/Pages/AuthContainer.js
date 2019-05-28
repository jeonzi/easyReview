import React, { useState, useRef } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faUser, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

import * as styles from "./Styles/AuthContainer";
import Loader from "../component/LoaderSpinner/Loader";

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
    <styles.MainContainer>
      <styles.LoginForm>
        <styles.AuthStatus>
          {isLogin ? "로그인" : "회원 가입"}
        </styles.AuthStatus>
        {!isLogin && (
          <form onChange={signUpInfo}>
            <styles.InputDiv>
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <styles.Input
                type="name"
                id="username"
                placeholder="Your name"
                ref={userNameInput}
              />
            </styles.InputDiv>
            <styles.InputDiv>
              <span>
                <FontAwesomeIcon icon={faAt} />
              </span>
              <styles.Input
                type="email"
                id="e-mail"
                placeholder="Your email address"
                ref={emailInput}
              />
            </styles.InputDiv>
            <styles.InputDiv>
              <span>
                <FontAwesomeIcon icon={faUnlockAlt} />
              </span>
              <styles.Input
                type="password"
                placeholder="Your password"
                ref={passwordInput}
              />
            </styles.InputDiv>
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
                return <styles.Button onClick={createUser}>가입</styles.Button>;
              }}
            </Mutation>
            <styles.Line />
            <styles.SwitchAuth>
              <styles.Button onClick={() => setIsLogin(true)}>
                로그인하기
              </styles.Button>
            </styles.SwitchAuth>
          </form>
        )}
        {isLogin && (
          <div>
            <form>
              <styles.InputDiv>
                <span>
                  <FontAwesomeIcon icon={faAt} />
                </span>
                {/* <label htmlFor="e-mail">E-mail</label> */}
                <styles.Input
                  placeholder="User email"
                  type="email"
                  id="e-mail"
                  ref={emailInput}
                />
              </styles.InputDiv>
              <styles.InputDiv>
                <span>
                  <FontAwesomeIcon icon={faUnlockAlt} />
                </span>
                <styles.Input
                  type="password"
                  placeholder="User password"
                  ref={passwordInput}
                />
              </styles.InputDiv>
              <div>
                <styles.Button onClick={getUserInfo}>로그인</styles.Button>
              </div>
            </form>
            <styles.Line />
            <styles.SwitchAuth>
              <styles.Button onClick={() => setIsLogin(false)}>
                가입하기
              </styles.Button>
            </styles.SwitchAuth>
            <Query
              query={LOGIN_USER}
              variables={{ email: email, password: password }}
              onCompleted={() => history.push("/main")}
            >
              {({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) return <div />;
                return localStorage.setItem("token", data.loginUser);
              }}
            </Query>
          </div>
        )}
      </styles.LoginForm>
    </styles.MainContainer>
  );
};

export default AuthContainer;
