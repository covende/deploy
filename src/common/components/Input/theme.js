const size = {
  lg: {
    fontSize: 'lg',
    px: 4,
    h: 12,
    borderRadius: 'md'
  },

  md: {
    fontSize: 'md',
    px: 4,
    h: 10,
    borderRadius: 'md'
  },

  sm: {
    fontSize: 'sm',
    px: 3,
    h: 8,
    borderRadius: 'sm'
  },

  xs: {
    fontSize: 'xs',
    px: 2,
    h: 6,
    borderRadius: 'sm'
  }
};

const sizes = {
  lg: {
    field: size.lg,
    addon: size.lg
  },
  md: {
    field: size.md,
    addon: size.md
  },
  sm: {
    field: size.sm,
    addon: size.sm
  },
  xs: {
    field: size.xs,
    addon: size.xs
  }
};

const Input = {
  baseStyle: {
    field: {
      marginBottom: '8px',
      minWidth: '32px',
      background: '#FFFFFF',
      border: '1px solid',
      borderColor: '#E0E0E0',
      boxShadow: '-1px 1px 8px rgba(0, 0, 0, 0.2)',
      _focus: {
        borderColor: '#C7C7C7',
        boxShadow: 'none'
      }
    },
    addon: {
      h: '38px'
    }
  },
  sizes,
  variants: {
    normal: {
      field: {
        px: '8px',
        height: '31px',
        fontSize: '14px',
        borderRadius: '12px',
        _readOnly: {
          color: '#9E9E9E',
          userSelect: 'all'
        },
        _invalid: {
          borderWidth: '1.5px',
          borderColor: '#FF5454'
        },
        _focus: {
          borderColor: '#AAAAAA',
          boxShadow: '0px 0px 1px 1px #004772',
          color: '#222',
          outline: 'none'
        }
      },
      addon: {
        borderBottom: '2px solid',
        borderColor: 'inherit',
        borderRadius: 0,
        paddingX: 0,
        bg: 'transparent'
      }
    },
    outline: {
      field: {
        px: '8px',
        height: '31px',
        color: '#4D4D4D',
        fontSize: '14px',
        borderRadius: '10px',
        borderColor: '#CDCCCC',
        boxShadow: 'none',
        _placeholder: {
          color: '#00477280',
          fontSize: '12px',
          fontStyle: 'italic'
        },
        _readOnly: {
          color: '#9E9E9E',
          userSelect: 'all'
        },
        _invalid: {
          borderWidth: '1.5px',
          borderColor: '#FF5454'
        },
        _focus: {
          borderColor: '#FFFFFF',
          boxShadow: '0px 0px 0px 1px #004772',
          color: '#222',
          outline: 'none'
        }
      },
      addon: {
        borderBottom: '1.5px solid',
        borderColor: 'inherit',
        borderRadius: 0,
        paddingX: 0,
        bg: 'transparent'
      }
    }
  },
  defaultProps: {
    variant: 'normal'
  }
};

export default Input;
