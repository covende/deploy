const Heading = {
  baseStyle: {
    margin: 'auto',
    fontFamily: "'Poppins'",
    fontSize: '25px',
    fontWeight: '600',
    lineHeight: '36px',
    textAlign: 'left',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  sizes: {
    '4xl': {
      fontSize: ['6xl', null, '7xl'],
      lineHeight: 1
    },
    '3xl': {
      fontSize: ['5xl', null, '6xl'],
      lineHeight: 1
    },
    '2xl': {
      fontSize: ['4xl', null, '5xl'],
      lineHeight: [1.2, null, 1]
    },
    xl: {
      fontSize: ['3xl', null, '4xl'],
      lineHeight: [1.33, null, 1.2]
    },
    lg: {
      fontSize: ['2xl', null, '3xl'],
      lineHeight: [1.33, null, 1.2]
    },
    md: { fontSize: 'md', lineHeight: 1.2 },
    sm: { fontSize: 'sm', lineHeight: 1.2 },
    xs: { fontSize: 'xs', lineHeight: 1.2 }
  },
  variants: {
    outline: {
      //   border: '2px solid',
      //   borderRadius: '8px',
    },
    solid: {
      color: '{whiteAlpha}'
    },
    primary: {
      color: 'covende.primary.main'
    }
  },
  _hover: {
    textDecoration: 'underline'
  },
  //   The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'primary'
  }
};

export default Heading;
