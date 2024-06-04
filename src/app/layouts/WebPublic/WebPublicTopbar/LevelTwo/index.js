import React, { useState } from 'react';
import { Container } from '@material-ui/core';

import useWindowSize from '@/common/hooks/useWindowSize';

// Assets
import CategoriesMenu from './CategoriesMenu';
import { MenuBarStyle } from './index.styles';
import { Link } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { v4 } from 'uuid';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { IoStorefrontOutline } from 'react-icons/io5';
import { GiGymBag, GiHamburgerMenu } from 'react-icons/gi';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { getLoggedInUser } from '@/app/helpers/authUtils';

import { Container as Con, chakra } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { motion, isValidMotionProp } from 'framer-motion';
import { CVAlertError } from '@CVTemplate/core/CVAlert';

const MenuComplement = [
  // {
  //   name: 'Tiendas Oficiales',
  //   icon: <FaHandHoldingUsd style={{ fontSize: '2rem' }} />,
  //   route: '/tienda-oficiales/all',
  //   disable: false
  // },
  {
    name: 'Abre tu Tienda',
    icon: (
      <svg
        className='svg-icon-private'
        width='31'
        height='27'
        viewBox='0 0 31 27'
        fill='white'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M27.012 25.0205V15.3992H28.9784V26.0037C28.9784 26.5468 28.5382 26.987 27.9952 26.987H2.94612C2.4031 26.987 1.96289 26.5468 1.96289 26.0037V19.8076H3.92935V25.0205H27.012Z'
          // fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.4717 17.337C10.4717 16.794 10.9119 16.3538 11.4549 16.3538H19.6103C20.1534 16.3538 20.5936 16.794 20.5936 17.337V25.85H18.6271V18.3202H12.4381V25.5675H10.4717V17.337Z'
          // fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.94612 15.1023C3.48914 15.1023 3.92935 15.5425 3.92935 16.0855V17.7802C3.92935 18.3233 3.48914 18.7635 2.94612 18.7635C2.4031 18.7635 1.96289 18.3233 1.96289 17.7802V16.0855C1.96289 15.5425 2.4031 15.1023 2.94612 15.1023Z'
          // fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M1.98261 0.787244C2.07579 0.329149 2.47863 0 2.94611 0H27.9988C28.4681 0 28.872 0.331689 28.9632 0.79205L30.876 10.442C30.9076 10.601 30.8993 10.7654 30.8519 10.9204C30.2718 12.8193 28.5086 14.205 26.4149 14.205C24.9276 14.205 23.6072 13.5058 22.759 12.4202C21.9109 13.5058 20.5905 14.205 19.1032 14.205C17.616 14.205 16.2955 13.5058 15.4474 12.4202C14.5993 13.5058 13.2788 14.205 11.7916 14.205C10.3043 14.205 8.98388 13.5058 8.13576 12.4202C7.28764 13.5058 5.96719 14.205 4.47994 14.205C2.38619 14.205 0.622989 12.8193 0.042899 10.9204C-0.00495206 10.7638 -0.012916 10.5977 0.0197305 10.4372L1.98261 0.787244ZM3.74947 1.96646L2.00067 10.5639C2.39717 11.547 3.35844 12.2385 4.47994 12.2385C5.68268 12.2385 6.70112 11.4432 7.03633 10.3459C7.16265 9.93239 7.54428 9.64993 7.97666 9.64993H8.29487C8.72724 9.64993 9.10887 9.93239 9.2352 10.3459C9.5704 11.4432 10.5888 12.2385 11.7916 12.2385C12.9943 12.2385 14.0128 11.4432 14.348 10.3459C14.4743 9.93239 14.8559 9.64993 15.2883 9.64993H15.6065C16.0389 9.64993 16.4205 9.93239 16.5468 10.3459C16.882 11.4432 17.9005 12.2385 19.1032 12.2385C20.306 12.2385 21.3244 11.4432 21.6596 10.3459C21.7859 9.93239 22.1676 9.64993 22.5999 9.64993H22.9181C23.3505 9.64993 23.7321 9.93239 23.8585 10.3459C24.1937 11.4432 25.2121 12.2385 26.4149 12.2385C27.5372 12.2385 28.4991 11.5459 28.895 10.5617L27.1913 1.96646H3.74947Z'
          // fill='white'
        />
      </svg>
    ),
    // <tienda style={{ fontSize: '2rem' }} />,
    route: '/crea-tu-tienda',
    animate: true,
    disable: getLoggedInUser() != null
  },
  {
    name: 'Centro de ayuda',
    icon: (
      <svg
        className='svg-icon-private'
        width='32'
        height='29'
        viewBox='0 0 32 29'
        fill='white'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M17.6836 14.1942C17.6836 13.6511 18.1238 13.2109 18.6668 13.2109H20.1792C20.7222 13.2109 21.1624 13.6511 21.1624 14.1942C21.1624 14.7372 20.7222 15.1774 20.1792 15.1774H18.6668C18.1238 15.1774 17.6836 14.7372 17.6836 14.1942Z'
          // fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M11.5311 12.4565C12.0741 12.4565 12.5143 12.8967 12.5143 13.4398V14.9486C12.5143 15.4916 12.0741 15.9318 11.5311 15.9318C10.9881 15.9318 10.5479 15.4916 10.5479 14.9486V13.4398C10.5479 12.8967 10.9881 12.4565 11.5311 12.4565Z'
          // fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9.375 20.8374H22.5252V21.8206C22.5252 25.4528 19.5823 28.3957 15.9501 28.3957C12.318 28.3957 9.375 25.4528 9.375 21.8206V20.8374ZM11.4465 22.8039C11.8967 24.8772 13.7415 26.4293 15.9501 26.4293C18.1588 26.4293 20.0035 24.8772 20.4537 22.8039H11.4465Z'
          // fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3.25001 13.9618C2.54166 13.9618 1.96646 14.537 1.96646 15.2454C1.96646 15.9537 2.54166 16.5289 3.25001 16.5289V18.4954C1.45561 18.4954 0 17.0398 0 15.2454C0 13.451 1.45561 11.9954 3.25001 11.9954V13.9618Z'
          // fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M6.24634 11.2048C5.45276 11.5758 4.902 12.3817 4.902 13.3145V16.704C4.902 17.6378 5.45181 18.4438 6.24634 18.8145V11.2048ZM2.93555 13.3145C2.93555 10.9445 4.85953 9.02051 7.22957 9.02051C7.77259 9.02051 8.2128 9.46071 8.2128 10.0037V20.0148C8.2128 20.5578 7.77259 20.998 7.22957 20.998C4.85527 20.998 2.93555 19.0733 2.93555 16.704V13.3145Z'
          // fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M28.5928 11.9954C30.3872 11.9954 31.8428 13.451 31.8428 15.2454C31.8428 17.0398 30.3872 18.4954 28.5928 18.4954V16.5289C29.3011 16.5289 29.8763 15.9537 29.8763 15.2454C29.8763 14.537 29.3011 13.9618 28.5928 13.9618V11.9954Z'
          // fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M23.6299 10.0037C23.6299 9.46071 24.0701 9.02051 24.6131 9.02051C26.9831 9.02051 28.9071 10.9445 28.9071 13.3145V16.704C28.9071 19.0733 26.9874 20.998 24.6131 20.998C24.0701 20.998 23.6299 20.5578 23.6299 20.0148V10.0037ZM25.5963 11.2048V18.8145C26.3909 18.4438 26.9407 17.6378 26.9407 16.704V13.3145C26.9407 12.3817 26.3899 11.5758 25.5963 11.2048Z'
          // fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M15.9496 1.96646C9.87107 1.96646 4.94106 6.89646 4.94106 12.975H2.97461C2.97461 5.81042 8.78503 0 15.9496 0C23.1143 0 28.9247 5.81042 28.9247 12.975H26.9582C26.9582 6.89646 22.0282 1.96646 15.9496 1.96646Z'
          // fill='white'
        />
      </svg>
    ),
    // <GiGymBag style={{ fontSize: '2rem' }} />,
    route: '/ayuda',
    disable: false
  }
];

export const Example = () => (
  <motion.div
    style={{
      width: '50px',
      height: '50px',
      background: 'black',
      borderRadius: '10px'
    }}
    whileHover={{ scale: 1.2, rotate: 90 }}
    whileTap={{ scale: 0.8, rotate: -90, borderRadius: '100%' }}
  />
);

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children'
});

export function AnotherExample({ children }) {
  return (
    <Con display='flex' alignItems='center' justifyContent='center'>
      <ChakraBox
        animate={{
          scale: [0.8, 1, 0.8]
          // rotate: [0, 0, 200, 200, 0],
          // borderRadius: ['20%', '20%', '50%', '50%', '20%']
        }}
        whileHover={{ transitionDuration: 0.5 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop'
        }}
        padding='2'
        // bgGradient='linear(to-l, #00ADF6, #FF5454)'
        display='flex'
        justifyContent='center'
        alignItems='center'
        width='auto'
        height='50px'>
        {children}
      </ChakraBox>
    </Con>
  );
}

export default function TopbarLevelTwo() {
  const screenSize = useWindowSize();
  const isMobile = screenSize.width < 576;

  const [seemenu, setseemenu] = useState(false);
  const addToast = useToast();
  const auth = getLoggedInUser();
  return (
    <Container>
      <Flex justifyContent='space-between' width='100%'>
        <Flex
          width='25%'
          flex='25%'
          maxWidth='25%'
          position='relative'
          onClick={(e) => isMobile && setseemenu(!seemenu)}
          onMouseLeave={() => setseemenu(false)}>
          <Box onMouseEnter={() => !isMobile && setseemenu(true)} width='100%'>
            <MenuBarStyle>
              <GiHamburgerMenu style={{ fontSize: '2rem' }} />
              <SizeBox />
              {isMobile ? '' : <span>Categorías</span>}
            </MenuBarStyle>
          </Box>
          <Box
            zIndex={1}
            position='absolute'
            paddingTop='3.5rem'
            visibility={seemenu ? 'flex' : 'hidden'}>
            <CategoriesMenu setseemenu={setseemenu} seemenu={seemenu} />
          </Box>
        </Flex>

        {MenuComplement.map((item, index) => (
          <Flex
            key={v4()}
            width='25%'
            flex='25%'
            maxWidth='25%'
            onClick={() =>
              auth != null &&
              item.animate &&
              CVAlertError({
                addToast,
                message: 'Por favor, cierre sesión para crear su tienda.'
              })
            }>
            <Link
              title='Cierre su sesión antes de crear una cuenta'
              to={auth != null && item.animate ? '#' : item.route}
              style={{
                width: '100%'
              }}>
              <MenuBarStyle>
                {item.animate ? (
                  <AnotherExample>
                    {item.icon}
                    <SizeBox />
                    {isMobile ? '' : <span>{item.name}</span>}
                  </AnotherExample>
                ) : (
                  <>
                    {item.icon}
                    <SizeBox />
                    {isMobile ? '' : <span>{item.name}</span>}
                  </>
                )}
              </MenuBarStyle>
            </Link>
          </Flex>
        ))}
      </Flex>
    </Container>
  );
}
