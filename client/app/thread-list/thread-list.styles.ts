import { createStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles({
  root: {
    width: 'auto',
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,
    minHeight: 700
  },
  table: {
    minWidth: 700,
  },
  smallColumn: {
    width: 50
  },
  fixedWidthColumn: {
    width: 220
  },
  fullGrowColumn: {
    width: 'auto'
  }
});
