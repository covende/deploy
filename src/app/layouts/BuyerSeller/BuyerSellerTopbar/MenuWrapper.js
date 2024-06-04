import styled from '@emotion/styled';
import React, { useState } from 'react';
import MenuButton from './MenuButton';
import MenuNav from './MenuNav';

const HeaderWrapper = styled.header`
  height: calc(100vh - 190px);
  display: flex;
  justify-content: space-between;
  align-items: start;
  position: relative;
  top: 90px;
`;

function MenuWrapper() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <HeaderWrapper>
      <MenuNav open={open} />
      <MenuButton open={open} handleClick={handleClick} />
    </HeaderWrapper>
  );
}

export default MenuWrapper;
