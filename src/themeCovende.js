// breakpoints
const breakpoints = {
  xxs: 0,
  xs: 360,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

// Media queries
const mediaQueries = {
  min: {
    xxs: `@media (min-width: ${breakpoints.xxs}px)`,
    xs: `@media (min-width: ${breakpoints.xs}px)`,
    sm: `@media (min-width: ${breakpoints.sm}px)`,
    md: `@media (min-width: ${breakpoints.md}px)`,
    lg: `@media (min-width: ${breakpoints.lg}px)`,
    xl: `@media (min-width: ${breakpoints.xl}px)`
  },
  max: {
    xxs: `@media (max-width: ${breakpoints.xxs}px)`,
    xs: `@media (max-width: ${breakpoints.xs}px)`,
    sm: `@media (max-width: ${breakpoints.sm}px)`,
    md: `@media (max-width: ${breakpoints.md}px)`,
    lg: `@media (max-width: ${breakpoints.lg}px)`,
    xl: `@media (max-width: ${breakpoints.xl}px)`
  },
  between: {
    xxs_xs: `@media (min-width: ${breakpoints.xxs}px) and (max-width: ${breakpoints.xs}px)`,
    xs_sm: `@media (min-width: ${breakpoints.xs}px) and (max-width: ${breakpoints.sm}px)`,
    sm_md: `@media (min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md}px)`,
    md_lg: `@media (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg}px)`,
    lg_xl: `@media (min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl}px)`
  }
};

// Colors
const colors = {
  white: '#FFFFFF',
  celeste: '#00ADF6',
  celeste_dark: '#129CD6',
  rojo: '#FF5454',
  rojo_dark: '#B93E3e',
  amarillo: '#FFB93E',
  amarillo_dark: '#E6A110',
  verde: '#17BF93',
  verde_dark: '#189675',
  azul: '#004772',
  morado: '#5164C4',
  gris: '#F4F4F4',
  gris_dark: '#404040',
  black: '#011423'
};

const palette = {
  default: {
    light: colors.white,
    main: colors.celeste,
    dark: colors.celeste_dark,
    contrastText: colors.white
  },
  primary: {
    light: colors.white,
    main: colors.azul,
    dark: colors.black,
    contrastText: colors.white
  },
  secondary: {
    light: colors.white,
    main: colors.rojo,
    dark: colors.rojo_dark,
    contrastText: colors.white
  },
  error: {
    light: colors.white,
    main: colors.morado,
    dark: colors.black,
    contrastText: colors.white
  },
  warning: {
    light: colors.white,
    main: colors.amarillo,
    dark: colors.amarillo_dark,
    contrastText: colors.white
  },
  info: {
    light: colors.white,
    main: colors.gris,
    dark: colors.gris_dark,
    contrastText: colors.white
  },
  success: {
    light: colors.white,
    main: colors.verde,
    dark: colors.verde_dark,
    contrastText: colors.white
  }
};

const validateColor = (color) => color || 'default';

const themeCovende = {
  breakpoints,
  mq: mediaQueries,
  palette,
  colors,
  validateColor
};

export default themeCovende;
