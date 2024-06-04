import styled from '@emotion/styled';

export const Main = styled.main`
  padding-bottom: 15px;
  padding-top: 15px;
`;

export const Breadcumbs = styled.div`
  padding: 8px 0px;
  background-color: #ffffff;
`;

export const BreadcumbsList = styled.ul`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(4, max-content);
  align-items: center;
  justify-content: flex-start;
  margin: 0px;
`;

export const BreadcumbsItem = styled.li`
  font-size: 12px;
  font-family: 'Poppins';
  margin-right: 25px;
  list-style: none;
  color: #004772;
`;
