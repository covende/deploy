import styled from '@emotion/styled';
import { COLORS, SCREEN } from '../CVThemes';

export const CVDataTableStyle = styled.div`
  /* & .MuiTableContainer-root {
    max-width: calc(100vw - 120px);
  } */
  & tbody tr,
  & tbody td,
  & thead tr,
  & thead th,
  & tbody > tr > td,
  & tbody > tr > th,
  & thead > tr > td,
  & thead > tr > th {
    border: none;
    padding: 0px;
  }
  & tbody td > div,
  & tbody th > div,
  & thead th > div {
    margin-top: 2px;
    margin-bottom: 2px;
    min-height: 60px;
    height: 100%;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    padding: 0 0.5rem;
  }
  & tbody tr td:first-of-type > div,
  & thead tr th:first-of-type > div {
    border-left: 1px solid #efefef;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    padding-left: 1rem;
  }
  & tbody tr td:last-child > div,
  & thead tr th:last-child > div {
    border-right: 1px solid #efefef;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    padding-right: 1rem;
  }
  & thead tr th > div {
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: #ffffff;
    line-height: 1;
  }
  & thead tr th > div button,
  & tbody tr td > div button {
    padding: 0px;
    height: 1.2rem;
    width: 1.2rem;
    background-color: #ffffff;
    color: #c4c4c4;
  }

  & tbody tr:hover th > div {
    background-color: #00000010;
  }

  & tbody tr:hover th > div .actions {
    color: ${COLORS['primary']};
  }

  & tbody tr:hover th > div .times {
    color: ${COLORS['red']};
  }

  & tbody tr:hover th > div.expanded {
    opacity: 1;
  }

  & thead th > div,
  & thead tr th:last-child > div,
  & thead tr th:first-of-type > div {
    border: none;
  }

  @media (max-width: ${SCREEN.xs.max}px) {
    & table {
      border: 0;
    }

    & table thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    & tbody tr {
      display: block;
      margin-bottom: 0.625em;
    }

    & tbody tr th {
      display: flex;
      font-size: 0.8em;
      text-align: right;
      align-items: center;
      justify-content: space-between;
    }
    & tbody tr td > div,
    & tbody tr th > div {
      border: none;
    }

    & tbody tr th::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
      margin-right: 0.5rem;
    }

    & tbody tr th:last-child {
      border-bottom: 1px solid #c4c4c4;
    }
  }
`;

export const RowStyle = styled.div`
  min-height: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ textAlign }) => textAlign};
  border-top: 1px solid ${({ borderColor }) => borderColor};
  border-bottom: 1px solid ${({ borderColor }) => borderColor};
  border-left: ${({ first, borderColor, selected }) =>
    first ? `10px solid ${selected ? '#00adf6' : borderColor}` : 'inherit'};
  border-right: ${({ last, borderColor }) =>
    last ? `1px solid ${borderColor}` : 'inherit'};
  border-top-left-radius: ${({ first }) => (first ? '10px' : 'inherit')};
  border-bottom-left-radius: ${({ first }) => (first ? '10px' : 'inherit')};
  border-top-right-radius: ${({ last }) => (last ? '10px' : 'inherit')};
  border-bottom-right-radius: ${({ last }) => (last ? '10px' : 'inherit')};
  @media (max-width: ${SCREEN.xs.max}px) {
    border: none;
    width: auto;
    justify-content: center;
    align-items: flex-end;
    border-radius: none;
  }
`;

export const LinkStyles = styled.div`
  & .MuiButtonBase-root,
  & .MuiButton-root &.MuiButton-text {
    padding: 0px;
    min-width: 0px;
  }
  & .Mui-disabled {
    opacity: 0.5;
  }
`;
