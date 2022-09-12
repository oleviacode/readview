import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import Navigation from './src/navigation/Navigation';
import {ThemeProvider, Button, createTheme} from '@rneui/themed';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons/faSquareCheck';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';

library.add(fab, faSquareCheck);

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export default App;
