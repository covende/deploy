import React from 'react';
import ContentLoader from 'react-content-loader';

export const MyLoader = (props) => (
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
