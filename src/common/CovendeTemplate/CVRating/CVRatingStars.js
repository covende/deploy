import styled from '@emotion/styled';
import React from 'react';
import { Rating } from '@material-ui/lab';
import { v4 } from 'uuid';

const RatingStyle = styled.div`
  & .MuiRating-root {
    color: ${({ color }) => (color ? color : '#ff5454')};
    font-size: ${({ height }) => (height ? height : '1.5rem')};
  }
  & .MuiRating-root .MuiRating-decimal {
    margin: ${({ marginStar }) => (marginStar ? marginStar : '0px')};
  }
`;

function CVRatingStars({
  color = '#ff5454',
  height = '1.5rem',
  puntuation = 2.5,
  precision = 0.1,
  readOnly = true,
  onChange = () => {},
  marginStar = '0px'
}) {
  return (
    <RatingStyle
      height={height}
      color={color}
      key={v4()}
      marginStar={marginStar}>
      <Rating
        key={v4()}
        onChange={(e) => onChange(eval(e.target.value))}
        name='half-rating-read'
        value={puntuation}
        precision={precision}
        readOnly={readOnly}
      />
    </RatingStyle>
  );
}

export default CVRatingStars;
