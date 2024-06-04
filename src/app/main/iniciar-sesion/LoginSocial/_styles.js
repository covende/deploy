import React from 'react';
import styled from '@emotion/styled';

export const svgFB = (
  <svg
    width='33'
    height='33'
    viewBox='0 0 33 33'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M33 16.5C33 7.38633 25.6137 0 16.5 0C7.38633 0 0 7.38633 0 16.5C0 25.6137 7.38633 33 16.5 33C16.5967 33 16.6934 33 16.79 32.9936V20.1545H13.2451V16.023H16.79V12.9809C16.79 9.45527 18.9428 7.53457 22.0881 7.53457C23.5963 7.53457 24.8918 7.64414 25.2656 7.6957V11.3824H23.1C21.392 11.3824 21.0568 12.1945 21.0568 13.3869V16.0166H25.1496L24.6146 20.148H21.0568V32.3619C27.9533 30.3832 33 24.0346 33 16.5Z'
      fill='#3B5998'
    />
  </svg>
);

export const svgGoogle = (
  <svg
    width='33'
    height='33'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 533.5 544.3'
  >
    <path
      d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
      fill='#4285f4'
    />
    <path
      d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
      fill='#34a853'
    />
    <path
      d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
      fill='#fbbc04'
    />
    <path
      d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
      fill='#ea4335'
    />
  </svg>
);

export const svgLinkedin = (
  <svg
    width='33'
    height='33'
    viewBox='0 0 33 33'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M28.1646 0H4.83539C3.55351 0.00179409 2.32466 0.511811 1.41823 1.41823C0.511811 2.32466 0.00179409 3.55351 0 4.83539L0 28.1646C0.00179409 29.4465 0.511811 30.6753 1.41823 31.5818C2.32466 32.4882 3.55351 32.9982 4.83539 33H28.1646C29.4465 32.9982 30.6753 32.4882 31.5818 31.5818C32.4882 30.6753 32.9982 29.4465 33 28.1646V4.83539C32.9982 3.55351 32.4882 2.32466 31.5818 1.41823C30.6753 0.511811 29.4465 0.00179409 28.1646 0V0ZM11.6646 26.1708H7.79901V12.6073H11.6646V26.1708ZM11.6646 10.7016H7.79901V6.82922H11.6646V10.7016ZM25.2281 26.1708H21.3625V18.4328C21.3625 17.9202 21.1589 17.4286 20.7964 17.0661C20.4339 16.7036 19.9423 16.5 19.4297 16.5C18.9171 16.5 18.4255 16.7036 18.063 17.0661C17.7006 17.4286 17.4969 17.9202 17.4969 18.4328V26.1708H13.5974V12.6073H17.4698V13.3601C18.4803 13.0481 19.1381 12.6344 20.3656 12.6344C21.6812 12.6925 22.9223 13.2613 23.8252 14.2199C24.7281 15.1785 25.2217 16.4515 25.201 17.7682L25.2281 26.1708Z'
      fill='#2A508D'
    />
  </svg>
);

export const LoginSocialContainer = styled.span`
  padding: 8px 16px;
  display: ${(props) => (props.isRow ? 'flex' : 'block')};
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: ${(props) => (props.width ? props.width : 'max-content')};
  border-radius: 18px;
  box-sizing: border-box;
`;

export const LoginSocialTitle = styled.div`
  padding: 8px;
  color: #4d4d4d;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
`;

export const LoginSocialBody = styled.div`
  margin: auto;
  padding: 0px 16px;
  display: flex;
  grid-gap: 16px;
  grid-template-columns: repeat(3, max-content);
  align-items: center;
  justify-content: center;
`;
