import styled from '@emotion/styled';

export const SubcategoriesContainer = styled.article`
  color: #000000;

  && .title {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.01em;
  }

  && .content {
    list-style: none;
    position: relative;
    left: 0;
    top: 0;
    background-color: transparent;
    padding: 0px;
    margin-left: -6px;

    li {
      color: #000000;
      visibility: visible;
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      && a {
        background-color: transparent;
      }
    }
  }
`;
