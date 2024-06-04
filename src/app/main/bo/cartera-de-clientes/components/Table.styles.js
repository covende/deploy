import styled from '@emotion/styled';
import themeCovende from '@/themeCovende';

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
    &:hover td:first-of-type {
      border-left: 15px solid
        ${({ color }) => themeCovende.palette[color || 'default'].main};
    }
    td {
      &:first-of-type {
        border-radius: 12px 0px 0px 12px;
        border-left: 15px solid #dedede;
      }
      &:last-of-type {
        border-radius: 0px 12px 12px 0px;
        border-right: 1px solid #dedede;
      }

      text-align: center;
      height: 48px;
      border-top: 1px solid #dedede;
      border-bottom: 1px solid #dedede;
    }
  }

  tr:nth-of-type(even) td {
    background-color: ${({ color }) =>
      themeCovende.palette[color || 'default'].main}08;
  }

  tr:not(:last-of-type) {
    border-bottom: 2px solid #e5e5e5;
  }
`;

export const ArrowUp = styled.div`
  width: 12px;
  height: 8px;
  background: #004772;
  clippath: polygon(0% 0%, 100% 0%, 50% 100%);
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  border-top: 2px solid #004772;
`;

export const ArrowDown = styled.div`
  width: 12px;
  height: 8px;
  background: #00adf6;
  clippath: polygon(50% 0%, 0% 100%, 100% 100%);
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  border-top: 2px solid #00adf6;
`;

export const StylePagination = styled.div`
  padding: 5px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(3, max-content);
  justify-content: space-between;
  width: 100%;
  color: #888;
  text-align: right;
  border-radius: 10px;
  box-sizing: border-box;
`;

export const CheckBox = styled.label`
  margin: auto;
  display: block;
  position: relative;
  width: 18px;
  height: 18px;
  font-size: 22px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 19px;
    width: 19px;
    background-color: #eee;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 4px;
  }

  &:hover input ~ .checkmark {
    background-color: #ccc;
    border: 1px solid #c4c4c4;
    box-sizing: border-box;
    border-radius: 4px;
  }

  input:checked ~ .checkmark {
    background-color: ${({ color }) =>
      themeCovende.palette[color || 'default'].main};
    box-shadow: inset 0 0 0 2px #ffffff,
      0 0 0 1px ${({ color }) => themeCovende.palette[color || 'default'].main};
    box-sizing: border-box;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }
`;

export const StyledButton = styled.button`
  margin: 0px 4px;
  border: 1px solid #aaa;
  border-radius: 5px;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.03);
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  outline: none;
  -webkit-transition: all 0.1s linear;
  transition: all 0.1s linear;

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: linear-gradient(to bottom, #ffffff 0%, #f7f7f7 100%);
  background-repeat: no-repeat, repeat;

  ::-moz-focus-inner {
    border: 0;
  }

  &::-ms-expand {
    display: none;
  }

  &:hover {
    border-color: #888;
  }
`;

export const StyledSelect = styled.select`
  display: block;
  margin: 0px 4px;
  padding: 2px 24px 4px 8px;
  line-height: 18px;
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #444;
  width: max-content;
  max-width: 100%;
  box-sizing: border-box;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.03);
  border-radius: 0.3em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%, #f7f7f7 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;

  &::-ms-expand {
    display: none;
  }

  &:hover {
    border-color: #888;
  }

  option {
    font-weight: normal;
  }
`;

export const StyledInput = styled.input`
  display: block;
  margin: 0px 4px;
  padding: 0px;
  color: #37a6df;
  line-height: 18px;
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  text-align: center;
  width: max-content;
  max-width: 100%;
  box-sizing: border-box;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.03);
  border-radius: 0.3em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;

  &::-ms-expand {
    display: none;
  }

  &:hover {
    border-color: #888;
  }
`;

export const InputSearch = styled.input`
  margin-bottom: 16px;
  padding-left: 12px;
  width: 208px;
  height: 28px;
  font-size: 16px;
  border: 1px solid #00adf6;
  box-sizing: border-box;
  border-radius: 10px;
  outline: none;
`;
