import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import { debounce } from 'lodash';
import { Box, Flex } from '@chakra-ui/react';
import { chevbronLeft, chevbronRight } from '@/app/assets/icons';

const style = {
  width: '32px',
  minWidth: '32px',
  height: '32px',
  minHeight: '32px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '16px',
  zIndex: 1
};

function CVOverflow({ children }) {
  const container = useRef(null);
  const [hasOverflow, sethasOverflow] = useState(true);
  const [canScrollLeft, setcanScrollLeft] = useState(false);
  const [canScrollRight, setcanScrollRight] = useState(true);

  const checkForOverflow = () => {
    const { scrollWidth, clientWidth } = container.current;
    const Overflow = scrollWidth > clientWidth;
    sethasOverflow(Overflow);
  };
  const checkForScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = container.current;
    setcanScrollLeft(scrollLeft > 0);
    setcanScrollRight(scrollLeft !== scrollWidth - clientWidth);
  };

  const scrollContainerBy = (distance) => {
    container.current.scrollBy({ left: distance, behavior: 'smooth' });
  };

  let debounceCheckForOverflow = debounce(checkForOverflow, 1000);
  let debounceCheckForScrollPosition = debounce(checkForScrollPosition, 200);

  useEffect(() => {
    container.current.addEventListener(
      'scroll',
      debounceCheckForScrollPosition
    );
    checkForOverflow();
    checkForScrollPosition();
  }, [container, children]);
  return (
    <Box marginTop='1rem' rounded='1rem' width='100%'>
      <Flex>
        {canScrollLeft || false ? (
          <Flex
            alignItems='center'
            width='50px'
            // boxShadow='40px 0px 20px -10px rgba(255,255,255,1) inset;
            // -webkit-box-shadow: 40px 0px 20px -10px rgba(255,255,255,1) inset;
            // -moz-box-shadow: 40px 0px 20px -10px rgba(255,255,255,1) inset;'
            marginLeft='0px'
            marginRight='-40px'
            marginTop='5px'
            marginBottom='5px'
            zIndex={1}>
            <Button
              disabled={!(canScrollLeft || false)}
              style={{ ...style, marginLeft: '20px', marginRight: '-20px' }}
              onClick={() => {
                scrollContainerBy(-180);
              }}>
              {chevbronLeft}
            </Button>
          </Flex>
        ) : (
          ''
        )}

        <Flex
          overflow='hidden'
          ref={container}
          alignItems='stretch'
          width='100%'>
          {children}
        </Flex>
        {canScrollRight || false ? (
          <Flex
            width='50px'
            //   boxShadow='-40px 0px 20px -10px rgba(255,255,255,1) inset;
            // -webkit-box-shadow: -40px 0px 20px -10px rgba(255,255,255,1) inset;
            // -moz-box-shadow: -40px 0px 20px -10px rgba(255,255,255,1) inset;'
            alignItems='center'
            marginRight='0px'
            marginLeft='-40px'
            marginTop='5px'
            marginBottom='5px'
            zIndex={1}>
            <Button
              disabled={!(canScrollRight || false)}
              style={{ ...style, marginRight: '0px', marginLeft: '0px' }}
              onClick={() => {
                scrollContainerBy(180);
              }}>
              {chevbronRight}
            </Button>
          </Flex>
        ) : (
          ''
        )}
      </Flex>
    </Box>
  );
}
export default CVOverflow;
