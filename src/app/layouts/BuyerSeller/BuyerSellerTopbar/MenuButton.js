import { SCREEN } from '@CVTemplate/core/CVThemes';
import styled from '@emotion/styled';
import React from 'react';

const MenuButtonWrapper = styled.button`
  border: none;
  z-index: 10;
  right: 0;
  top: 90px;
  position: fixed;
  padding: 0.5rem;
  border-radius: 0 0 0 1rem;
  background-color: white;
  @media only screen and (min-width: ${SCREEN.xs.max}px) {
    display: none;
  }
`;

function MenuButton({ open, handleClick }) {
  return !open ? (
    <MenuButtonWrapper onClick={handleClick}>
      <svg viewBox='0 0 100 80' width='30' height='30' fill='#2962ff'>
        <rect width='90' height='10' />
        <rect y='30' width='80' height='10' />
        <rect y='60' width='70' height='10' />
      </svg>
    </MenuButtonWrapper>
  ) : (
    <MenuButtonWrapper onClick={handleClick}>
      <svg
        className='svg-icon'
        width='30'
        height='30'
        viewBox='0 0 20 20'
        fill='#2962ff'>
        <path d='M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z' />
      </svg>
    </MenuButtonWrapper>
  );
}

export default MenuButton;
