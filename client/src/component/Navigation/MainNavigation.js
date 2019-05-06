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
    color: #364da2;
    border-radius: 10px;
  }
`;

const Header = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 3.5rem;
  background-image: linear-gradient(
    60deg,
    #3d3393 0%,
    #2b76b9 37%,
    #2cacd1 65%,
    #35eb93 100%
  );
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
  margin-left: 0.3rem;
  z-index: 10;
  font-size: 0.6rem;
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
      <h1>AllREAD_I</h1>
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
