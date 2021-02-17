import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#f7f8f8',
      dark: '#c4c5c5',
      contrastText: '#333333',
    },
    secondary: {
      light: '#d6f7cb',
      main: '#a4c49a',
      dark: '#75936c',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
  spacing: 4,
  typography: {
    fontSize: 12,
  },
});

export default theme;
