import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import styled from '@emotion/styled';

export const MenuBarStyle = styled.div`
  font-size: 1.1rem;
  width: 100%;
  height: 3.5rem;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: ${({ selected }) =>
    !selected ? COLORS['primary'] : 'white'};
  color: ${({ selected }) => (!selected ? 'white' : COLORS['primary'])};
  & .svg-icon {
    background-color: ${({ selected }) =>
      !selected ? 'white' : COLORS['primary']};
  }
  &:hover {
    background-color: white;
    text-decoration: none;
    color: ${COLORS['primary']};
    .svg-icon {
      background-color: ${COLORS['primary']};
    }
    .svg-icon-private {
      fill: ${COLORS['primary']};
    }
  }
`;

export const MenuItemStyle = styled.div`
  font-size: 1rem;
  display: flex;
  width: 100%;
  align-items: center;
  &:hover {
    color: ${COLORS['primary']};
  }
`;
