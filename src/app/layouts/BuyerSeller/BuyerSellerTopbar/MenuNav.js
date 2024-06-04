import { SCREEN } from '@CVTemplate/core/CVThemes';
import styled from '@emotion/styled';
import React from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
const NavbarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: start;
  background: #57575770;
  position: fixed;
  z-index: 10;
  top: 90px;
  right: ${(props) => (props.open ? '0' : '-100%')};
  width: 100%;
 
  transition: right 0.3s linear;
  overflow: auto;

  @media only screen and (min-width: ${SCREEN.xs.max}px) {
    flex-direction: row;
    position: initial;
    height: auto;
    justify-content: start;
    background: transparent;
  }

  a {
    padding: 0.1rem 0.25rem;
    color: grey;
    text-decoration: none;
  }
`;

function MenuNav({ open }) {
  return (
    <NavbarWrapper open={open}>
      <Sidebar />
    </NavbarWrapper>
  );
}

export default MenuNav;
