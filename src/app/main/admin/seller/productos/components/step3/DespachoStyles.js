import styled from '@emotion/styled';

export const TableDespacho = styled.div`
  & tbody tr,
  & tbody td,
  & thead tr,
  & thead th {
    border: none;
    padding: 0px;
  }
  & tbody td > div,
  & thead th > div {
    margin-top: 2px;
    margin-bottom: 2px;
    height: 2rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
  }
  & tbody tr td:first-of-type > div,
  & thead tr th:first-of-type > div {
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    padding-left: 1rem;
  }
  & tbody tr td:last-child > div,
  & thead tr th:last-child > div {
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    padding-right: 1rem;
  }
  & thead tr th > div {
    background-color: #004772;
    text-align: center;
    color: white;
  }
  & tbody tr td > div {
    background-color: rgba(0, 173, 246, 0.2);
    text-align: center;
  }
  & thead tr th > div button,
  & tbody tr td > div button {
    padding: 0px;
    height: 1.2rem;
    width: 1.2rem;
    background-color: #ffffff;
    color: #c4c4c4;
  }
`;
