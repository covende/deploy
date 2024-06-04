import { createTheme } from '@material-ui/core';
// import { createMuiTheme as createTheme } from '@material-ui/core';
import { esES } from '@material-ui/core/locale';

export const themeMaterialUI = createTheme(
  {
    typography: {
      fontFamily: `"Poppins","Roboto", sans-serif`,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500
    }
  },
  esES
);
