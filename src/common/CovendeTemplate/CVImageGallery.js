import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

const ImageStyle = styled.div`
  & .image-gallery-right-nav,
  & .image-gallery-left-nav,
  & .image-gallery-fullscreen-button {
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 50%;
  }

  & .image-gallery-right-nav:hover,
  & .image-gallery-left-nav:hover,
  & .image-gallery-fullscreen-button:hover {
    background-color: #ececec;
  }

  & .image-gallery-right-nav .image-gallery-svg,
  & .image-gallery-left-nav .image-gallery-svg {
    width: 28px;
    height: 28px;
  }

  & .image-gallery-play-button .image-gallery-svg {
    display: none;
  }
  & .image-gallery-thumbnail.active,
  .image-gallery-thumbnail:focus {
    border: 4px solid #00adf6;
  }
  & .image-gallery-thumbnail.active,
  .image-gallery-thumbnail:hover {
    border: 4px solid #00adf6;
  }
`;

/**
 *
 * @param {Object} param0
 * @param {[String]} param0.images
 * @returns
 */
const CVImageGallery = React.memo(MemoCVImageGallery);

function MemoCVImageGallery({ images }) {
  const [src, setsrc] = useState([]);
  useEffect(() => {
    if (JSON.stringify(images) != JSON.stringify(src)) setsrc(images);
  }, [images]);

  return (
    <ImageStyle>
      <ImageGallery
        thumbnailPosition='bottom'
        items={src.map((photo, index) => ({
          original: photo,
          thumbnail: photo
        }))}
      />
    </ImageStyle>
  );
}

export default CVImageGallery;
