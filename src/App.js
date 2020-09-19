import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/redux/redux-store';
import Main from './components/main/Main';
import theme from './ui/Theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Main />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
