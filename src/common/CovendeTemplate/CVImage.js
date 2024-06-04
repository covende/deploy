import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CVImageAvatar from './CVImage/CVImageAvatar';
import CVImageNormal from './CVImage/CVImageNormal';

/**
 *
 * @param {Object} param0
 * @param {('normal' | 'avatar')} param0.variant
 * @param {String} param0.image
 * @param {String} param0.name
 * @param {String} param0.borderRadius
 * @param {String} param0.width
 * @param {String} param0.height
 * @param {String} param0.link
 * @returns
 */
function CVImage({
  variant = 'normal',
  image,
  name = 'Image',
  borderRadius,
  width = '100%',
  height = '100%',
  link = '#!',
  cursor = 'pointer',
  isDisabled = false
}) {
  const [src, setsrc] = useState(null);
  useEffect(() => {
    if (image != src) setsrc(image);
  }, [image]);

  const history = useHistory();
  const goto = () => {
    if (link != '#!') {
      if (link.includes('http')) {
        history.location = link;
      } else {
        history.push(link);
      }
    }
  };
  let variants = {
    normal: (
      <CVImageNormal
        image={src}
        name={name}
        style={{ height, width, borderRadius: borderRadius || '0.25rem' }}
      />
    ),
    avatar: (
      <CVImageAvatar
        image={src}
        name={name}
        style={{ height, width, borderRadius: borderRadius || '50%' }}
      />
    )
  };

  return (
    <Box>
      <Box
        width={width}
        height={height}
        cursor={cursor}
        onClick={() => goto()}
        display='flex'
        alignItems='center'
        justifyContent='center'
        {...(isDisabled ? { pointerEvents: 'none' } : {})}>
        {variants[variant]}
      </Box>
    </Box>
  );
}

export default CVImage;
