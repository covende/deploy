const Text = {
  baseStyle: {
    fontStyle: 'normal'
  },
  sizes: {
    xs: {
      fontSize: '10px',
      lineHeight: '12px'
    },
    sm: {
      fontSize: '12px',
      lineHeight: '14px'
    },
    md: {
      fontSize: '16px',
      lineHeight: '18px'
    },
    lg: {
      fontSize: '18px',
      lineHeight: '20px'
    }
  },
  variants: {
    label: {
      fontSize: 'md',
      fontWeight: 'normal',
      lineHeight: 'base',
      letterSpacing: '0em'
    },
    'primary-xxs': {
      color: 'covende.primary.main',
      fontSize: '10px',
      fontWeight: 'normal',
      lineHeight: 'base',
      letterSpacing: '0em',
      width: 'max-content'
    },
    'normal-xxs': {
      fontSize: '10px',
      fontWeight: 'normal',
      lineHeight: 'base',
      letterSpacing: '0em',
      width: 'max-content'
    },
    'normal-xs': {
      fontSize: 'xs',
      fontWeight: 'normal',
      lineHeight: 'base',
      letterSpacing: '0em'
    },
    normal: {
      fontSize: 'sm',
      fontWeight: 'normal',
      lineHeight: 'base',
      letterSpacing: '0em'
    },
    primary: {
      color: 'covende.primary.main',
      fontSize: 'sm',
      fontWeight: 'normal',
      lineHeight: 'base',
      letterSpacing: '0em'
    },
    title: {
      color: 'blue.800',
      fontWeight: 'black',
      fontSize: 'md',
      lineHeight: 'tall',
      textTransform: 'uppercase'
    },
    subtitle1: {
      color: 'blue.800',
      fontSize: 'md',
      fontWeight: 'medium',
      lineHeight: 'short',
      textTransform: 'capitalize'
    },
    subtitle2: {
      fontSize: 'sm',
      fontWeight: 'medium',
      lineHeight: 'short',
      letterSpacing: '0em'
    }
  },
  defaultProps: {
    variant: 'label'
  }
};

export default Text;
