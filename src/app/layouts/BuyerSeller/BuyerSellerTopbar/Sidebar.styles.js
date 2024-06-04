import styled from '@emotion/styled';
import themeCovende from '@/themeCovende';

export const MenuBarItem = styled.div`
  background: ${({ color, selected }) => (selected ? color : 'transparent')};
  color: ${({ color, selected }) => (selected ? 'white' : '#004772')};
  border-radius: 0.85rem;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  padding: 0.25rem;

  &:hover {
    svg path {
      fill: initial;
    }
    background: ${({ color }) => color + '20'};
    color: initial;
    box-shadow: -2px 3px 7px 2px ${({ color }) => color}4d;
  }

  span {
    font-weight: 600;
    font-size: 9px;
    line-height: 10px;
  }

  svg {
    path {
      fill: ${({ color, selected }) => (selected ? 'white' : '#004772')};
    }
  }
`;

export const MenuBarList = styled.div`
  margin-top: 14px;
  margin-left: 32px;
  padding: 10px;
  background: #ffffff;
  border-radius: 20px;
  box-sizing: border-box;
  min-width: 70px;
  min-height: 453px;
  display: grid;
  grid-gap: 0.85rem;
`;

export const MenuConcave = styled.div`
  background: ${({ color }) => color};
  width: 16px;
  height: 100vh;
  max-height: 468px;
  border-radius: 0px 0px 20px 0px;
  position: absolute;
  top: 81px;

  &:before {
    position: relative;
    display: inline-block;
    content: '';
    top: -1px;
    left: 15px;
    width: 17px;
    height: 17px;
    background: radial-gradient(
      circle at bottom right,
      transparent 16px,
      ${({ color }) => color} 0px
    );
  }
`;

export const MenuConcaveContainer = styled.div`
  display: flex;
`;

export const MenuSwitchUsers = styled.div`
  height: 41px;
  width: 136px;
  background: ${({ color }) => color};
  border-radius: 0px 30px 30px 0px;
  box-sizing: border-box;
  padding: 8px;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  color: #ffffff;
  cursor: pointer;
  ${({ selected }) => `
   ${
     selected
       ? `
   width: 100%;
   font-size: 18px;
   line-height: 27px;
   `
       : ''
   };
  `};
  &:hover {
    width: 100%;
    font-size: 18px;
    line-height: 27px;
  }
`;

export const MenuBarContainer = styled.div`
  position: relative;
  height: auto;
  width: 190px;
  background: transparent;
`;
