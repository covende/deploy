import { Box, Center } from '@chakra-ui/layout';
import React from 'react';
import { COLORS } from '../CVThemes';

export const imgCache = {
  __cache: {},
  read(src) {
    if (!src) {
      return;
    }

    if (!this.__cache[src]) {
      this.__cache[src] = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.__cache[src] = true;
          resolve(this.__cache[src]);
        };
        // img.onerror = () => {
        //   this.__cache[src] = false;
        //   resolve(false);
        // };
        img.src = src;
        // setTimeout(() => resolve(false), 30000);
      }).then((img) => {
        this.__cache[src] = img == true ? true : null;
      });
    }

    if (this.__cache[src] instanceof Promise) {
      throw this.__cache[src];
    }

    return this.__cache[src];
  },
  clearImg: (src) => {
    delete this.__cache;
  }
};

export const SuspenseImg = ({ alt, src, style, variant }) => {
  let cache = imgCache.read(src) || false;

  if (!cache && variant == 'avatar') {
    src = `https://ui-avatars.com/api/?name=${alt
      .toString()
      .replaceAll(' ', '+')}&size=256&background=${COLORS[
      'lightGray'
    ].replaceAll('#', '')}&color=${COLORS['primary'].replaceAll('#', '')}`;
  }
  if (!cache && variant == 'normal') {
    return (
      <Box
        style={style}
        display='flex'
        justifyContent='center'
        alignItems='center'
        backgroundColor={COLORS['lightGray']}
        color={COLORS['primary']}>
        <Center>{alt}</Center>
      </Box>
    );
  }
  return (
    <img
      // loading='lazy'
      alt={alt}
      src={src}
      style={style}
      onError={(e) => console.log({ load: false, src })}
    />
  );
};
