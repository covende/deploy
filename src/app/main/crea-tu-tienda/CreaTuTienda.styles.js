import { Label } from '@/common/components/Label/_styles';
import { SCREEN } from '@CVTemplate/core/CVThemes';
import styled from '@emotion/styled';
import { Box } from '@material-ui/core';
import React from 'react';

export const StyledForm = styled.form`
  margin: auto;
  width: 100%;
`;
export const ContentPage = styled.div`
  width: 100vw;
  height: fit-content;
  min-height: calc(100vh - 135px);
  background-color: #f2f2f2;
  box-sizing: border-box;
`;

export const Opciones = styled.div`
  & .MuiTypography-body1 {
    font-family: 'Poppins', Roboto, sans-serif;
    //font-size: 0.75rem;
    line-height: 0.75rem;
  }
  & .MuiFormGroup-root {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const Alternativas = styled.div`
  & .MuiTypography-root {
  }
  & .MuiFormControlLabel-label {
    font-family: 'Poppins', Roboto, sans-serif;
    //font-size: 0.75rem;
    line-height: 0.75rem;
  }
`;

export const Title = ({ children }) => {
  let textAlign = window.screen.width < SCREEN.sm.min ? 'left' : 'right';
  let justifyContent = window.screen.width < SCREEN.sm.min ? 'start' : 'end';
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}>
      <Label
        marginRight='5px'
        width='100%'
        display='flex'
        justifyContent={justifyContent}
        alignItems='center'
        textAlign={textAlign}>
        {children}
      </Label>
    </Box>
  );
};

export const iconsCreditCard = (
  <svg
    width='208'
    height='38'
    viewBox='0 0 208 38'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    xlink='http://www.w3.org/1999/xlink'>
    <rect width='208' height='38' fill='url(#pattern0)' />
    <defs>
      <pattern
        id='pattern0'
        patternContentUnits='objectBoundingBox'
        width='1'
        height='1'>
        <use href='#image0_4864:4002' transform='scale(0.00480769 0.0263158)' />
      </pattern>
      <image
        id='image0_4864:4002'
        width='208'
        height='38'
        href='data:image/png;base64,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'
      />
    </defs>
  </svg>
);

export const iconHrGreh = (
  <svg
    width='15'
    height='442'
    viewBox='0 0 10 442'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_d_4863:4257)'>
      <line x1='4.52246' y1='434' x2='4.52246' y2='0.989746' stroke='#ABABAB' />
    </g>
    <defs>
      <filter
        id='filter0_d_4863:4257'
        x='0.0224609'
        y='0.989746'
        width='9'
        height='441.01'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'>
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy='4' />
        <feGaussianBlur stdDeviation='2' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
        />
        <feBlend
          mode='normal'
          in2='BackgroundImageFix'
          result='effect1_dropShadow_4863:4257'
        />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_dropShadow_4863:4257'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);
