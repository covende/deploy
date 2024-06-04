import styled from '@emotion/styled';

export const BoxContainer = styled.div`
  padding: 8px 0px 0px 0px;
  width: 100%;
  background: #fff;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 9px rgb(0 0 0 / 25%);

  & .react-datepicker {
    border: none;
  }

  & .react-datepicker .react-datepicker__month-container {
    margin-right: 10px;
    margin-left: 10px;
    border: 0.5px solid #939393;
    box-sizing: border-box;
    border-radius: 5px;
  }

  & .react-datepicker__day--in-range,
  .react-datepicker__day--in-range:hover {
    background-color: #00adf6;
  }

  & .react-datepicker__navigation--previous {
  }
`;
