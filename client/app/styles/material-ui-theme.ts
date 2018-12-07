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
    useNextVariants: true,
    htmlFontSize: 14
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
    },
    MuiDialogActions: {
      root: {
        margin: '0 24px 24px'
      }
    }
  }
});
