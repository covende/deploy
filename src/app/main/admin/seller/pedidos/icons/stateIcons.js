import React from 'react';
import { Box } from '@chakra-ui/react/';

export const IconState = ({ type, bg }) => {
  switch (type) {
    case 'IconConfirm':
      return <IconConfirm {...{ bg }} />;
    case 'IconProcesed':
      return <IconProcesed {...{ bg }} />;
    case 'IconSend':
      return <IconSend {...{ bg }} />;
    case 'IconDelivered':
      return <IconDelivered {...{ bg }} />;
    default:
      return <IconDelivered {...{ bg }} />;
  }
};
export const IconConfirm = ({ bg }) => (
  <Box p='1rem' borderRadius='50%' bg={bg} w='4.5rem' h='4.5rem'>
    <svg
      width='26'
      height='32'
      viewBox='0 0 26 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M21.9084 3.12624L18.7765 1.32145L15.6446 3.12624L12.5127 1.32145L9.3807 3.12618L5.35176 0.804688V24.8627H0.539062V28.0961C0.539063 29.9176 2.02093 31.3994 3.84246 31.3994H22.634C24.4555 31.3994 25.9374 29.9176 25.9374 28.0961V0.804688L21.9084 3.12624ZM3.84246 29.6054C3.01018 29.6054 2.33304 28.9284 2.33304 28.0961V26.6567H19.3306V28.0961C19.3306 28.6395 19.4626 29.1528 19.696 29.6054H3.84246ZM22.634 29.6054C21.8017 29.6054 21.1246 28.9284 21.1246 28.0961V24.8627H7.14573V3.90886L9.38064 5.19664L12.5126 3.39203L15.6446 5.19664L18.7765 3.39197L21.9085 5.19664L24.1434 3.90886V28.0961C24.1434 28.9284 23.4663 29.6054 22.634 29.6054Z'
        fill='white'
      />
      <path
        d='M22.3479 8.90234H8.93848V10.6963H22.3479V8.90234Z'
        fill='white'
      />
      <path
        d='M22.3479 12.3242H8.93848V14.1182H22.3479V12.3242Z'
        fill='white'
      />
      <path
        d='M15.6432 15.7422H8.93848V17.5362H15.6432V15.7422Z'
        fill='white'
      />
    </svg>
  </Box>
);

export const IconProcesed = ({ bg }) => (
  <Box p='1rem' borderRadius='50%' bg={bg} w='4.5rem' h='4.5rem'>
    <svg
      width='32'
      height='35'
      viewBox='0 0 32 35'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M31.3944 8.04367L16.1687 0.693358C16.0337 0.628256 15.8766 0.628256 15.7416 0.693358L0.515917 8.04367C0.346153 8.12561 0.238281 8.29753 0.238281 8.48603V26.3368C0.238281 26.5253 0.346153 26.6972 0.515917 26.7792L15.7416 34.1295C15.809 34.162 15.8821 34.1783 15.9551 34.1783C16.0282 34.1783 16.1012 34.162 16.1687 34.1295L31.3944 26.7792C31.5641 26.6972 31.672 26.5253 31.672 26.3368V8.4861C31.672 8.29747 31.5641 8.12567 31.3944 8.04367ZM15.9551 1.68123L30.0509 8.48603L25.9648 10.4586C25.939 10.4389 25.9117 10.4207 25.8817 10.4062L11.8816 3.64774L15.9551 1.68123ZM10.7723 4.20314L24.8476 10.9981L21.9648 12.3898L7.89531 5.59761L10.7723 4.20314ZM25.1769 11.9299V17.0743L22.4841 18.3743V13.2299L25.1769 11.9299ZM30.6896 26.0286L16.4464 32.9044V16.1446L19.8438 14.5045C20.0881 14.3865 20.1906 14.0929 20.0726 13.8486C19.9546 13.6043 19.661 13.5018 19.4167 13.6198L15.9551 15.2909L14.5931 14.6333C14.3487 14.5152 14.0551 14.6178 13.9372 14.8621C13.8192 15.1064 13.9216 15.4001 14.1659 15.518L15.4639 16.1446V32.9044L1.22072 26.0285V9.26864L12.0668 14.5047C12.1356 14.538 12.2084 14.5537 12.28 14.5537C12.4626 14.5537 12.638 14.4514 12.7227 14.2759C12.8406 14.0316 12.7382 13.7379 12.4939 13.62L1.85936 8.48603L6.73912 6.13028L21.4949 13.2538C21.4971 13.2568 21.4995 13.2595 21.5017 13.2624V19.157C21.5017 19.326 21.5886 19.4831 21.7318 19.5731C21.8113 19.623 21.902 19.6482 21.993 19.6482C22.0658 19.6482 22.1389 19.632 22.2065 19.5993L25.8817 17.8251C26.0514 17.7432 26.1593 17.5713 26.1593 17.3828V11.4557L30.6896 9.2687V26.0286V26.0286Z'
        fill='white'
      />
      <path
        d='M5.27426 24.1238L3.03987 23.0451C2.79544 22.927 2.50189 23.0296 2.38393 23.2739C2.26598 23.5182 2.36841 23.8119 2.61271 23.9298L4.8471 25.0085C4.91594 25.0417 4.9887 25.0575 5.06029 25.0575C5.24289 25.0575 5.41829 24.9552 5.50297 24.7797C5.621 24.5353 5.51856 24.2418 5.27426 24.1238Z'
        fill='white'
      />
      <path
        d='M7.32946 22.783L3.04179 20.713C2.79742 20.5951 2.5038 20.6975 2.38585 20.9419C2.26795 21.1862 2.37039 21.4799 2.61469 21.5978L6.90236 23.6677C6.9712 23.701 7.04396 23.7167 7.11555 23.7167C7.29815 23.7167 7.47355 23.6144 7.55824 23.439C7.67619 23.1945 7.57376 22.9009 7.32946 22.783Z'
        fill='white'
      />
    </svg>
  </Box>
);

export const IconSend = ({ bg }) => (
  <Box p='1rem' borderRadius='50%' bg={bg} w='4.5rem' h='4.5rem'>
    <svg
      width='40'
      height='24'
      viewBox='0 0 40 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ marginLeft: '-6px' }}>
      <path
        d='M11.0835 20.5299H7.80497C7.35254 20.5299 6.98535 20.1627 6.98535 19.7102C6.98535 19.2578 7.35254 18.8906 7.80497 18.8906H11.0835C11.5359 18.8906 11.9031 19.2578 11.9031 19.7102C11.9031 20.1627 11.5359 20.5299 11.0835 20.5299Z'
        fill='white'
      />
      <path
        d='M37.7225 20.5305H35.6734C35.221 20.5305 34.8538 20.1633 34.8538 19.7109C34.8538 19.2585 35.221 18.8913 35.6734 18.8913H37.0422L38.147 13.0031C38.1323 9.99019 35.5587 7.41658 32.3949 7.41658H27.0133L24.4053 18.8913H29.1165C29.5689 18.8913 29.9361 19.2585 29.9361 19.7109C29.9361 20.1633 29.5689 20.5305 29.1165 20.5305H23.3791C23.1299 20.5305 22.8939 20.4174 22.7382 20.2223C22.5824 20.0289 22.5234 19.7732 22.5792 19.5306L25.5593 6.41665C25.6445 6.04126 25.9757 5.77734 26.3593 5.77734H32.3949C36.4619 5.77734 39.7715 9.08697 39.7715 13.1539L38.5273 19.8617C38.4552 20.2502 38.1175 20.5305 37.7225 20.5305Z'
        fill='white'
      />
      <path
        d='M32.394 23.8095C30.1351 23.8095 28.2959 21.9719 28.2959 19.7114C28.2959 17.4509 30.1351 15.6133 32.394 15.6133C34.6529 15.6133 36.4921 17.4509 36.4921 19.7114C36.4921 21.9719 34.6529 23.8095 32.394 23.8095ZM32.394 17.2525C31.0384 17.2525 29.9351 18.3557 29.9351 19.7114C29.9351 21.067 31.0384 22.1702 32.394 22.1702C33.7497 22.1702 34.8529 21.067 34.8529 19.7114C34.8529 18.3557 33.7497 17.2525 32.394 17.2525Z'
        fill='white'
      />
      <path
        d='M14.3637 23.8095C12.1049 23.8095 10.2656 21.9719 10.2656 19.7114C10.2656 17.4509 12.1049 15.6133 14.3637 15.6133C16.6226 15.6133 18.4618 17.4509 18.4618 19.7114C18.4618 21.9719 16.6226 23.8095 14.3637 23.8095ZM14.3637 17.2525C13.0081 17.2525 11.9049 18.3557 11.9049 19.7114C11.9049 21.067 13.0081 22.1702 14.3637 22.1702C15.7194 22.1702 16.8226 21.067 16.8226 19.7114C16.8226 18.3557 15.7194 17.2525 14.3637 17.2525Z'
        fill='white'
      />
      <path
        d='M11.0846 5.77596H4.52763C4.0752 5.77596 3.70801 5.40877 3.70801 4.95634C3.70801 4.50391 4.0752 4.13672 4.52763 4.13672H11.0846C11.537 4.13672 11.9042 4.50391 11.9042 4.95634C11.9042 5.40877 11.537 5.77596 11.0846 5.77596Z'
        fill='white'
      />
      <path
        d='M11.0822 10.6939H2.88603C2.4336 10.6939 2.06641 10.3267 2.06641 9.8743C2.06641 9.42188 2.4336 9.05469 2.88603 9.05469H11.0822C11.5347 9.05469 11.9019 9.42188 11.9019 9.8743C11.9019 10.3267 11.5347 10.6939 11.0822 10.6939Z'
        fill='white'
      />
      <path
        d='M11.0838 15.6119H1.24833C0.795901 15.6119 0.428711 15.2447 0.428711 14.7923C0.428711 14.3398 0.795901 13.9727 1.24833 13.9727H11.0838C11.5362 13.9727 11.9034 14.3398 11.9034 14.7923C11.9034 15.2447 11.5362 15.6119 11.0838 15.6119Z'
        fill='white'
      />
      <path
        d='M23.3778 20.5303H17.6404C17.188 20.5303 16.8208 20.1631 16.8208 19.7106C16.8208 19.2582 17.188 18.891 17.6404 18.891H22.7237L26.4481 2.49862H7.80497C7.35254 2.49862 6.98535 2.13143 6.98535 1.679C6.98535 1.22656 7.35254 0.859375 7.80497 0.859375H27.4759C27.725 0.859375 27.9611 0.972483 28.1168 1.16755C28.2725 1.36098 28.3316 1.6167 28.2758 1.85931L24.1777 19.891C24.0925 20.2663 23.7597 20.5303 23.3778 20.5303Z'
        fill='white'
      />
    </svg>
  </Box>
);

export const IconDelivered = ({ bg }) => (
  <Box p='1rem' borderRadius='50%' bg={bg} w='4.5rem' h='4.5rem'>
    <svg
      width='31'
      height='26'
      viewBox='0 0 31 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M2.45508 14.2087L12.2905 24.0441L29.1513 2.26562'
        stroke='white'
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  </Box>
);
