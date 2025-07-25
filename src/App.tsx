import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import GlobalStyleWrapper from './styles/GlobalStyleWrapper';
import { HomePage, ProducerRegisterPage } from './pages';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyleWrapper />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/producer-register" element={<ProducerRegisterPage />} />
          <Route path="/producer-edit/:id" element={<ProducerRegisterPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
