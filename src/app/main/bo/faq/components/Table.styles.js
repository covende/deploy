import styled from '@emotion/styled';
import themeCovende from '@/themeCovende';
export const HeaderView = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  justify-content: right;
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

export const StyledThead = styled.thead`
  margin-bottom: 10px;
  background: ${({ color }) => themeCovende.palette[color || 'primary'].main};
  color: ${({ color }) =>
    themeCovende.palette[color || 'default'].contrastText};
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  text-align: center;

  tr:first-of-type {
    th:first-of-type {
      border-top-left-radius: 10px;
    }
    th:last-of-type {
      border-top-right-radius: 10px;
    }
  }

  tr:last-of-type {
    th:first-of-type {
      border-bottom-left-radius: 10px;
    }
    th:last-of-type {
      border-bottom-right-radius: 10px;
    }
  }
`;

export const StyledTh = styled.th`
  padding: 5px 8px;
  height: 28px;
`;

export const StyledTd = styled.td`
  min-width: max-content;
  padding: 8px;
  background: white;
`;

export const StyledTbody = styled.tbody`
  tr {
    td {
      &:first-of-type {
        border-radius: 12px 0px 0px 12px;
        border-left: 15px solid #00adf6;
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

export const InputSearch = styled.input`
  margin-bottom: 16px;
  padding-left: 12px;
  width: 200px;
  height: 28px;
  font-size: 16px;
  border: 1px solid #00adf6;
  box-sizing: border-box;
  border-radius: ${({borderRadius})=> borderRadius ? `${borderRadius}` : '10px'};
  outline: none;
  position: absolute;
  z-index: 1;
  right: 20%;
  left: 75%;
  top: 150px;
`;
