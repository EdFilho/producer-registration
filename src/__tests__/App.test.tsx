import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from '../App';

const renderWithRedux = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('App', () => {
  test('renders without crashing', () => {
    renderWithRedux(<App />);
  });

  test('displays the main title', () => {
    renderWithRedux(<App />);
    expect(screen.getByText('Cadastro de Produtores Rurais')).toBeInTheDocument();
  });

  test('displays navigation buttons', () => {
    renderWithRedux(<App />);
    expect(screen.getByText('Cadastrar Novo Produtor')).toBeInTheDocument();
  });

  test('displays system statistics', () => {
    renderWithRedux(<App />);
    expect(screen.getByText('Estatísticas do Sistema:')).toBeInTheDocument();
    expect(screen.getByText('Total de Fazendas Cadastradas')).toBeInTheDocument();
    expect(screen.getByText('Total de Hectares Registrados')).toBeInTheDocument();
  });

  test('displays analytics charts', () => {
    renderWithRedux(<App />);
    expect(screen.getByText('Análises Gráficas:')).toBeInTheDocument();
    expect(screen.getByText('Distribuição por Estado')).toBeInTheDocument();
    expect(screen.getByText('Culturas Plantadas')).toBeInTheDocument();
    expect(screen.getByText('Uso do Solo (Hectares)')).toBeInTheDocument();
  });
});
