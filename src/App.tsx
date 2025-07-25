import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import GlobalStyleWrapper from './styles/GlobalStyleWrapper';
import { HomePage, ProducerRegisterPage } from './pages';
import PropriedadesPage from './pages/propriedades';
import FazendaForm from './pages/fazenda/FazendaForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyleWrapper />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/producer-register" element={<ProducerRegisterPage />} />
          <Route path="/producer-edit/:id" element={<ProducerRegisterPage />} />
          <Route path="/propriedades/:produtorId" element={<PropriedadesPage />} />
          <Route path="/fazenda-register/:produtorId" element={<FazendaForm />} />
          <Route path="/fazenda-edit/:produtorId/:propriedadeId" element={<FazendaForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
