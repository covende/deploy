import React from 'react';
import styled from '@emotion/styled';
import ContentLoader from 'react-content-loader';
import { Box } from '@chakra-ui/react';

export const Wrapper = styled.div`
  margin: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 255px calc(100% - 271px);
  width: 100%;
  max-width: 1237px;
  box-sizing: border-box;
`;

export const ItemOfertaSemanal = styled.div`
  padding: 0.65rem;
  margin: 0.65rem;
  display: flex;
  flex-direction: column;
  & span {
    text-align: center;
    display: flex;
    width: 100%;
    justify-content: center;
  }
  & img {
    border-radius: 50%;
    border: 1px solid #e0e0e0;
    width: 60px;
    height: 60px;
  }
`;

export const MyLoaderMedium = (props) => (
  <ContentLoader
    speed={2}
    width={180}
    height={270}
    viewBox='0 0 198 284'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='11' y='13' rx='0' ry='0' width='176' height='176' />
    <rect x='19' y='197' rx='0' ry='0' width='108' height='20' />
    <rect x='155' y='201' rx='0' ry='0' width='30' height='12' />
    <rect x='18' y='221' rx='0' ry='0' width='133' height='24' />
    <rect x='166' y='225' rx='100' ry='100' width='19' height='19' />
    <rect x='18' y='256' rx='0' ry='0' width='47' height='12' />
    <rect x='78' y='256' rx='8' ry='8' width='107' height='17' />
  </ContentLoader>
);

export const MyLoaderLarge = (props) => (
  <ContentLoader
    speed={2}
    width={307}
    height={164}
    viewBox='0 0 307 164'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='16' y='16' rx='5' ry='5' width='128' height='23' />
    <rect x='16' y='45' rx='5' ry='5' width='118' height='21' />
    <rect x='16' y='75' rx='5' ry='5' width='50' height='14' />
    <rect x='16' y='95' rx='5' ry='5' width='43' height='17' />
    <rect x='16' y='123' rx='16' ry='16' width='128' height='21' />
    <rect x='155' y='16' rx='4' ry='4' width='130' height='130' />
  </ContentLoader>
);
