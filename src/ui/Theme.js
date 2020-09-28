import { createMuiTheme } from '@material-ui/core/styles';

const navigationWidth = '18rem';

const theme = createMuiTheme({
  palette: {
    common: {
      navColor: '#f2f2f2',
      navBackgroundColor: '#595959',
    },
  },
  typography: {},
  outline: {
    navigationWidth: `${navigationWidth}`,
    container: {
      background: '#f2f2f2',
      marginTop: '4rem',
      position: 'relative',
      width: `calc(100% - ${navigationWidth})`,
      left: navigationWidth,
    },
  },
  shape: {
    container__heading: {
      background: '#f2f2f2',
      width: '100%',
      height: '5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2)',
    },
    heading__h2: {
      margin: '0 1rem',
    },
    flex: {
      display: 'flex',
    },
    flex__column: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});
export default theme;
