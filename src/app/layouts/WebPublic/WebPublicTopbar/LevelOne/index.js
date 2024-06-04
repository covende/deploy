import React, { useEffect, useRef, useState } from 'react';
import { Container, Flex, Box, Show, Hide, Spacer } from '@chakra-ui/react';
import { svgCovende } from '@/app/assets/images/SVG';
import NavWishList from './NavWishList';
import NavOrders from './NavOrders';
import NavCart from './NavCart';
import NavUser from './NavUser';
import { Link, useHistory } from 'react-router-dom';
import { CVInput } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Grid } from '@material-ui/core';
import NavSearch from './NavSearch';
import styled from '@emotion/styled';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { getLoggedInUser } from '@/app/helpers/authUtils';

const SearchStyle = styled.div`
  height: 100%;
  width: 100%;
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline,
  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${COLORS['primary']};
  }
`;

function TopbarLevelOne(props) {
  const [search, setsearch] = useState('');
  const [result, setresult] = useState(false);
  const [resultin, setresultin] = useState(false);
  const space = useRef(null);
  const history = useHistory();

  if (!props.auth.user) props.auth.user = getLoggedInUser();

  return (
    <Container
      // padding='3px 48px'
      py={{ base: '2px', md: '3px' }}
      px={{ base: '2px', sm: '6px', md: '48px' }}
      maxWidth='100%'
      width='100%'
      backgroundColor='#ffffff'
      boxSizing='border-box'
      flexWrap='wrap'
      zIndex='50'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={2} xl={2}>
          <Flex height='100%'>
            <Spacer />
            <Link to='/'>
              <Box maxHeight='40px' height='100%' width='50%' maxWidth='100%'>
                {svgCovende}
              </Box>
            </Link>
            <Spacer />
          </Flex>
        </Grid>

        <Grid item xs={12} sm={8} md={6} xl={7}>
          <Hide below='md'>
            <SearchStyle>
              <Flex
                position='relative'
                flexDirection='column'
                height='100%'
                justifyContent='center'
                ref={(ref) => (space.current = ref)}>
                <CVInput
                  placeholder='Busca productos al por mayor y menor'
                  borderRadius={
                    result && search != '' ? '1rem 1rem 0 0' : '1rem'
                  }
                  value={search}
                  width='100%'
                  iconFind={true}
                  iconBorderRadius={
                    result && search != '' ? '0 1rem 0 0' : '0 1rem 1rem 0'
                  }
                  height='3rem'
                  onFocus={(e) => setresult(true)}
                  onChange={(value) => {
                    !resultin ? setresult(false) : {};
                  }}
                  onValidate={(value) => setsearch(value || '')}
                  buttonClick={() => {
                    history.push('/productos-de-busqueda/' + search);
                    setsearch('');
                  }}
                  onEnter={(value) => {
                    setsearch('');
                    history.push('/productos-de-busqueda/' + value);
                  }}
                />
              </Flex>
            </SearchStyle>

            {result && search != '' && (
              <Box
                onMouseEnter={() => setresultin(true)}
                onMouseLeave={() => setresultin(false)}
                onClick={() => {
                  setresult(false);
                  setsearch('');
                }}
                // top={space?.current?.getBoundingClientRect().bottom - 19}
                top={
                  space?.current?.getBoundingClientRect().bottom > 75
                    ? space?.current?.getBoundingClientRect().bottom - 23 + 'px'
                    : space?.current?.getBoundingClientRect().bottom - 16 + 'px'
                }
                // top='1.2rem'
                height={result && search != '' ? '400px' : '50px'}
                position='fixed'
                zIndex={2}
                width={space?.current?.clientWidth}>
                <NavSearch search={search} />
              </Box>
            )}
          </Hide>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          xl={3}
          style={{ padding: 'unset !important' }}>
          <>
            <Show below='md'>
              <Box>
                <SearchStyle>
                  <Flex
                    position='relative'
                    flexDirection='column'
                    height='100%'
                    justifyContent='center'
                    ref={(ref) => (space.current = ref)}>
                    <CVInput
                      placeholder='Busca productos al por mayor y menor'
                      borderRadius={
                        result && search != '' ? '1rem 1rem 0 0' : '1rem'
                      }
                      buttonClick={() => {
                        history.push('/productos-de-busqueda/' + search);
                        setsearch('');
                      }}
                      value={search}
                      width='100%'
                      iconFind={true}
                      iconBorderRadius={
                        result && search != '' ? '0 1rem 0 0' : '0 1rem 1rem 0'
                      }
                      height='3rem'
                      onFocus={(e) => setresult(true)}
                      onChange={(value) => (!resultin ? setresult(false) : {})}
                      onValidate={(value) => setsearch(value || '')}
                      onEnter={(value) => {
                        setsearch('');
                        history.push('/productos-de-busqueda/' + value);
                      }}
                    />
                  </Flex>
                </SearchStyle>

                {result && search != '' && (
                  <Box
                    onMouseEnter={() => setresultin(true)}
                    onMouseLeave={() => setresultin(false)}
                    // top={space?.current?.getBoundingClientRect().bottom + 7}
                    height={result && search != '' ? '400px' : '50px'}
                    position='fixed'
                    zIndex={2}
                    // top='-50px'
                    width={space?.current?.clientWidth}>
                    <NavSearch search={search} />
                  </Box>
                )}
              </Box>
            </Show>
            <Flex
              justifyContent='space-between'
              textAlign='center'
              // height='100%'
              width='100%'
              // alignItems='center'
              alignItems='start'>
              {/* <SizeBox /> */}

              <Show above='lg'>
                <Box width='10px' height='60px' />
              </Show>

              <NavWishList {...props} />
              {/* <Box width='10px' height='60px'></Box> */}
              <Box width={{ base: '5px', sm: '10px' }} height='60px' />

              <NavOrders {...props} />
              {/* <Box width='10px' height='60px'></Box> */}
              <Box width={{ base: '5px', sm: '10px' }} height='60px' />

              <NavCart {...props} />
              {/* <Box width='10px' height='10px'></Box> */}
              <Box width={{ base: '5px', sm: '10px' }} height='60px' />
              <NavUser {...props} />
            </Flex>
          </>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TopbarLevelOne;
