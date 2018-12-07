import { createMuiTheme, createStyles, Theme } from '@material-ui/core';
import { theme } from '../styles/material-ui-theme';

export const styles = (theme: Theme) => createStyles({
  root: {
    width: 'auto',
    margin: theme.spacing.unit,
    minHeight: 700
  },
  icon: {
    margin: (theme.spacing.unit / 3),
    color: theme.palette.primary.light,
    cursor: 'pointer',
  },
  noLeftSpace: {
    marginLeft: 0
  }
});

export const threadListTheme = createMuiTheme({
  ...theme,
  mixins: {
    gutters: styles1 => ({
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    })
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: 24,
        minHeight: 700
      }
    },
    MuiTableRow: {
      root: {
        '&$selected': {
          backgroundColor: 'white'
        }
      }
    },
    MuiTableHead: {
      root: {
        borderTop: `1px solid #e0e0e0`,
        backgroundColor: '#f1f1f1'
      }
    }
  }
});
