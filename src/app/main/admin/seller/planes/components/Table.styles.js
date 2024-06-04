import styled from '@emotion/styled';

export const HeaderView = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  justify-content: space-between;
`;

export const SubHeaderView = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, max-content);
`;

export const StyledTableContainer = styled.div`
  display: grid;
  margin: auto;
  width: 100%;
  justify-items: center;
`;

export const StyledTable = styled.table`
  border: none;
  margin: auto;
  width: 100%;
  border-radius: 10px;
  border-collapse: separate;
  border-spacing: 0 10px;
  overflow: hidden;
`;

export const StyledTbody = styled.tbody`
  tr {
    td {
      background: #dedede;
      &:first-of-type {
        border-radius: 12px 0px 0px 12px;
      }
      &:last-of-type {
        border-radius: 0px 12px 12px 0px;
        border-right: 1px solid #dedede;
      }

      text-align: center;
      border-top: 1px solid #dedede;
      border-bottom: 1px solid #dedede;
    }
  }
`;
