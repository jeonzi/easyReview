import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const globalLinkStyles = css`
  text-decoration: none;
`;

const LinkStyled = styled(NavLink)`
  ${globalLinkStyles}
`;

const LinkStyledButton = styled(LinkStyled)`
  color: white;
  padding: 0.25rem 0.5rem;
  border: none;
  font: inherit;
  font-size: 1.2rem;
  font-weight: bold;
  background: transparent;
  cursor: pointer;
  vertical-align: middle;
  margin: 0;

  &:hover,
  &.active {
    background: #ffffff;
    color: #892971;
    border-radius: 10px;
  }
`;

const Header = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5rem;
  background: #833ab4; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #833ab4,
    #fd1d1d,
    #fcb045
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #833ab4,
    #fd1d1d,
    #fcb045
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  display: flex;
  padding: 0 1.2rem;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 10;
`;

const Logo = styled.div`
  margin-left: 0.1rem;
  font-size: 0.8rem;
  color: white;
`;

const Nav = styled.div`
  margin-left: 0.5rem;
  z-index: 10;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  align-items: center;
`;

const NavItem = styled.li`
  margin: 0 0.2rem;
`;

const mainNavigation = () => (
  <Header>
    <Logo>
      <h1>I READ IT</h1>
    </Logo>
    <Nav>
      <NavList>
        <NavItem>
          <LinkStyledButton to="/main">HOME</LinkStyledButton>
        </NavItem>
        <NavItem>
          <LinkStyledButton to="/post_review">Review</LinkStyledButton>
        </NavItem>
        <NavItem>
          <LinkStyledButton to="/auth">Login</LinkStyledButton>
        </NavItem>
      </NavList>
    </Nav>
  </Header>
);

export default mainNavigation;
