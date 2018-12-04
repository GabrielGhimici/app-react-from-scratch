import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#008CA2'
    }
  },
  spacing: {
    unit: 24
  },
  typography: {
    useNextVariants: true
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    },
    MuiIconButton: {
      disableRipple: true
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    }
  }
});
