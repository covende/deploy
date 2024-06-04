import styled from '@emotion/styled';
import { COLORS } from '../CVThemes';

export const DateRangeStyle = styled.div`
  max-width: ${({ maxWidth }) => maxWidth}
  width: 100%;
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius}; 
  & .CalendarDay{
    font-size: 1rem
  }
  & .CalendarDay__selected_span {
    background: ${COLORS['primary'] + 80};
    color: white;
    border: none;
    border-radius: 1rem;
  }
  & .CalendarDay__default{
    border: none;
    border-radius: 1rem;

  }
  & .CalendarDay__selected {
    background: ${COLORS['primary']};
    border: none;
    color: white;
    border-radius: 1rem;
  }
  & .CalendarDay__selected:hover {
    background: ${COLORS['primary']};
    color: white;.CalendarDay__selected_span
  }

  & .CalendarDay__hovered_span:hover,
  & .CalendarDay__hovered_span {
    background: ${COLORS['primary'] + 10};
  }
  & .DateInput_input {
    font-size: ${({ fontSize }) => fontSize || '1rem'};
    font-weight: 400;
    line-height: 1rem;
    padding: 0;
    text-align:center;
    border-radius: ${({ borderRadius }) => borderRadius};
  }
  & .DateInput_input__focused{
    border-bottom: none;
  }
  & .DateRangePickerInput__withBorder{
    border-radius: ${({ borderRadius }) => borderRadius};
    height: ${({ height }) => height};
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
  }
  & .CalendarMonth_table {
    border-collapse: inherit;
    border-spacing: 1px;
  }
  & .DayPickerKeyboardShortcuts_show{
    display: none;
  }
  & .DateRangePicker{
    width: 100%;
  }
  & .DateInput{
    width: auto;
  }
`;
