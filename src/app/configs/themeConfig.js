import { theme as defaultTheme, extendTheme, color } from '@chakra-ui/react';
import { createBreakpoints, mode } from '@chakra-ui/theme-tools';

// Components themes
import Text from '@/common/components/Text/theme';
import Input from '@/common/components/Input/theme';
import Heading from '@/common/components/Heading/theme';

// Global style overrides
const styles = {
  global: (props) => ({
    body: {
      fontFamily: 'Poppins',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props),
      transition: 'background-color 0.2s',
      lineHeight: 'base'
    },
    '*::placeholder': {
      color: mode('gray.400', 'whiteAlpha.400')(props)
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', 'whiteAlpha.300')(props),
      wordWrap: 'break-word'
    }
  })
};

const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: '#000000',
  white: '#FFFFFF',

  whiteAlpha: {
    50: 'rgba(255, 255, 255, 0.04)',
    100: 'rgba(255, 255, 255, 0.06)',
    200: 'rgba(255, 255, 255, 0.08)',
    300: 'rgba(255, 255, 255, 0.16)',
    400: 'rgba(255, 255, 255, 0.24)',
    500: 'rgba(255, 255, 255, 0.36)',
    600: 'rgba(255, 255, 255, 0.48)',
    700: 'rgba(255, 255, 255, 0.64)',
    800: 'rgba(255, 255, 255, 0.80)',
    900: 'rgba(255, 255, 255, 0.92)'
  },

  blackAlpha: {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    200: 'rgba(0, 0, 0, 0.08)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    500: 'rgba(0, 0, 0, 0.36)',
    600: 'rgba(0, 0, 0, 0.48)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.80)',
    900: 'rgba(0, 0, 0, 0.92)'
  },

  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923'
  },

  red: {
    50: '#FFF5F5',
    100: '#FED7D7',
    200: '#FEB2B2',
    300: '#FC8181',
    400: '#F56565',
    500: '#E53E3E',
    600: '#C53030',
    700: '#9B2C2C',
    800: '#822727',
    900: '#63171B'
  },

  orange: {
    50: '#FFFAF0',
    100: '#FEEBC8',
    200: '#FBD38D',
    300: '#F6AD55',
    400: '#ED8936',
    500: '#DD6B20',
    600: '#C05621',
    700: '#9C4221',
    800: '#7B341E',
    900: '#652B19'
  },
  yellow: {
    50: '#FFFFF0',
    100: '#FEFCBF',
    200: '#FAF089',
    300: '#F6E05E',
    400: '#ECC94B',
    500: '#D69E2E',
    600: '#B7791F',
    700: '#975A16',
    800: '#744210',
    900: '#5F370E'
  },
  green: {
    50: '#F0FFF4',
    100: '#C6F6D5',
    200: '#9AE6B4',
    300: '#68D391',
    400: '#48BB78',
    500: '#38A169',
    600: '#2F855A',
    700: '#276749',
    800: '#22543D',
    900: '#1C4532'
  },

  teal: {
    50: '#E6FFFA',
    100: '#B2F5EA',
    200: '#81E6D9',
    300: '#4FD1C5',
    400: '#38B2AC',
    500: '#319795',
    600: '#2C7A7B',
    700: '#285E61',
    800: '#234E52',
    900: '#1D4044'
  },

  blue: {
    50: '#ebf8ff',
    100: '#bee3f8',
    200: '#90cdf4',
    300: '#63b3ed',
    400: '#4299e1',
    500: '#3182ce',
    600: '#2b6cb0',
    700: '#2c5282',
    800: '#2a4365',
    900: '#1A365D'
  },

  cyan: {
    50: '#EDFDFD',
    100: '#C4F1F9',
    200: '#9DECF9',
    300: '#76E4F7',
    400: '#0BC5EA',
    500: '#00B5D8',
    600: '#00A3C4',
    700: '#0987A0',
    800: '#086F83',
    900: '#065666'
  },

  purple: {
    50: '#FAF5FF',
    100: '#E9D8FD',
    200: '#D6BCFA',
    300: '#B794F4',
    400: '#9F7AEA',
    500: '#805AD5',
    600: '#6B46C1',
    700: '#553C9A',
    800: '#44337A',
    900: '#322659'
  },

  pink: {
    50: '#FFF5F7',
    100: '#FED7E2',
    200: '#FBB6CE',
    300: '#F687B3',
    400: '#ED64A6',
    500: '#D53F8C',
    600: '#B83280',
    700: '#97266D',
    800: '#702459',
    900: '#521B41'
  },

  linkedin: {
    50: '#E8F4F9',
    100: '#CFEDFB',
    200: '#9BDAF3',
    300: '#68C7EC',
    400: '#34B3E4',
    500: '#00A0DC',
    600: '#008CC9',
    700: '#0077B5',
    800: '#005E93',
    900: '#004471'
  },

  facebook: {
    50: '#E8F4F9',
    100: '#D9DEE9',
    200: '#B7C2DA',
    300: '#6482C0',
    400: '#4267B2',
    500: '#385898',
    600: '#314E89',
    700: '#29487D',
    800: '#223B67',
    900: '#1E355B'
  },

  messenger: {
    50: '#D0E6FF',
    100: '#B9DAFF',
    200: '#A2CDFF',
    300: '#7AB8FF',
    400: '#2E90FF',
    500: '#0078FF',
    600: '#0063D1',
    700: '#0052AC',
    800: '#003C7E',
    900: '#002C5C'
  },

  whatsapp: {
    50: '#dffeec',
    100: '#b9f5d0',
    200: '#90edb3',
    300: '#65e495',
    400: '#3cdd78',
    500: '#22c35e',
    600: '#179848',
    700: '#0c6c33',
    800: '#01421c',
    900: '#001803'
  },

  twitter: {
    50: '#E5F4FD',
    100: '#C8E9FB',
    200: '#A8DCFA',
    300: '#83CDF7',
    400: '#57BBF5',
    500: '#1DA1F2',
    600: '#1A94DA',
    700: '#1681BF',
    800: '#136B9E',
    900: '#0D4D71'
  },

  telegram: {
    50: '#E3F2F9',
    100: '#C5E4F3',
    200: '#A2D4EC',
    300: '#7AC1E4',
    400: '#47A9DA',
    500: '#0088CC',
    600: '#007AB8',
    700: '#006BA1',
    800: '#005885',
    900: '#003F5E'
  },
  covende: {
    red: {
      50: '#ffe2e2',
      100: '#ffb1b2',
      200: '#ff7f7f',
      300: '#FF5454', // Default covende
      400: '#fe1d1b',
      500: '#e50501',
      600: '#b30000',
      700: '#810000',
      800: '#4f0000',
      900: '#200000'
    },
    darkred: {
      50: '#ffe8e8',
      100: '#f1c4c4',
      200: '#e19f9f',
      300: '#d37879',
      400: '#c55353',
      500: '#B93E3e', // Default covende
      600: '#872c2d',
      700: '#611f1f',
      800: '#3c1011',
      900: '#1c0202'
    },
    yellow: {
      50: '#fff6db',
      100: '#ffe3af',
      200: '#ffd17f',
      300: '#FFB93E', // Default light covende
      400: '#E6A110', // Default dark covende
      500: '#e69205',
      600: '#b37200',
      700: '#805100',
      800: '#4e3100',
      900: '#1e0f00'
    },
    green: {
      50: '#defef7',
      100: '#b8f5e6',
      200: '#8fedd5',
      300: '#65e6c5',
      400: '#3ddfb4',
      500: '#17BF93', // Default light covende
      600: '#189675', // Default dark covende
      700: '#0d6e56',
      800: '#004332',
      900: '#001810'
    },
    lightblue: {
      50: '#d8f9ff',
      100: '#abe9ff',
      200: '#7bdaff',
      300: '#48caff',
      400: '#00ADF6',
      500: '#129CD6', // Default light covende
      600: '#007eb4', // Default dark covende
      700: '#004772', // Default primary covende
      800: '#003751',
      900: '#011423' // Default very dark covende
    },
    gray: {
      50: '#f2f2f2', // Default light covende
      100: '#dcd8d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040', // Default dark covende
      800: '#282626',
      900: '#150a0d'
    },
    default: {
      light: 'white',
      main: '#129CD6',
      dark: '#007eb4',
      contrastText: 'white'
    },
    primary: {
      light: 'white',
      main: '#004772',
      dark: '#011423',
      contrastText: 'white'
    },
    secondary: {
      light: 'white',
      main: '#FF5454',
      dark: '#B93E3e',
      contrastText: 'white'
    },
    error: {
      light: 'white',
      main: '#5164C4',
      dark: '#011423',
      contrastText: 'white'
    },
    warning: {
      light: 'white',
      main: '#FFB93E',
      dark: '#E6A110',
      contrastText: 'white'
    },
    info: {
      light: 'white',
      main: '#F4F4F4',
      dark: '#404040',
      contrastText: 'white'
    },
    success: {
      light: 'white',
      main: '#17BF93',
      dark: '#189675',
      contrastText: 'white'
    }
  }
};

const typography = {
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  },

  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: '2',
    3: '.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem'
  },

  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },

  fonts: {
    heading:
      'Poppins,"Poppins",-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: 'Poppins,"Poppins",-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace'
  },
  fontSizes: {
    xs: '8px', // 0.625rem
    sm: '10px', // 0.875rem
    md: '12px', // 1rem
    lg: '16px', // 1.125rem
    xl: '18px', // 1.25rem
    '2xl': '24px', // 1.5rem
    '3xl': '30px', // 1.875rem
    '4xl': '36px', // 2.25rem
    '5xl': '48px', // 3rem
    '6xl': '60px', // 3.75rem
    '7xl': '72px', // 4.5rem
    '8xl': '96px', // 6rem
    '9xl': '128px' // 8rem
  }
};

const radius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '12px', // md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px'
};

const breakpoints = createBreakpoints({
  sm: '320px', // 20em
  md: '768px', // 48em
  lg: '1024px', // 64em
  xl: '1025px'
});

// Component style overrides

const Menu = {
  parts: ['menu', 'item'],
  baseStyle: {
    menu: {
      boxShadow: 'lg',
      rounded: 'lg',
      flexDirection: 'column',
      py: '2'
    },
    item: {
      fontWeight: 'medium',
      lineHeight: 'normal',
      color: 'gray.600'
    }
  },
  sizes: {
    sm: {
      item: {
        fontSize: '0.75rem',
        px: 2,
        py: 1
      }
    },
    md: {
      item: {
        fontSize: '0.875rem',
        px: 3,
        py: 2
      }
    }
  },
  defaultProps: {
    size: 'md'
  }
};

const overrides = {
  ...defaultTheme,
  // styles,
  breakpoints,
  radius,
  colors,
  typography,
  // borders,
  components: {
    // Menu,
    Text,
    Heading,
    Input
  },
  initialColorMode: 'light',
  useSystemColorMode: false
};
export default extendTheme(overrides);
