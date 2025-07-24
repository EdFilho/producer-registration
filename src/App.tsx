import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import GlobalStyleWrapper from './styles/GlobalStyleWrapper';
import { HomePage } from './pages';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyleWrapper />
      <HomePage />
    </Provider>
  );
};

export default App;
