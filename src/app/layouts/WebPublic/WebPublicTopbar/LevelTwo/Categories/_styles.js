import styled from '@emotion/styled';

export const NavCollapsingContentContainer = styled.li`
  // position: absolute;
  margin: 0px;
  padding: 24px;
  top: 0;
  right: 0;
  display: ${({ visible }) => (visible ? 'grid' : 'none')};
  grid-template-columns: auto 280px 130px;
  max-width: calc(100% - 320px);
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100vh;
  background: #f7f7f7;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  pointer-events: none;
`;
