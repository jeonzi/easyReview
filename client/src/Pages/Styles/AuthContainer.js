import styled from "styled-components";

// Styled-components
export const MainContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  padding: 0 16px;
  text-align: center;
  display: inline-block;
`;

export const SwitchAuth = styled.div`
  mrgin: 0 auto;
  padding: 10px 0px;
  text-align: center;
`;

export const LoginForm = styled.div`
  margin: 0 auto;
  max-width: 750px;
  padding: 40px 0px 0px 0px;
  text-align: center;
  box-sizing: border-box;
`;

export const AuthStatus = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 6px;
`;

export const Button = styled.button`
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

export const InputDiv = styled.div`
  display: block;
`;

export const Input = styled.input`
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

export const Line = styled.hr`
  color: #f1f3f5;
  width: 80%;
`;
