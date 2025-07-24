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
    expect(screen.getByText('Ver Produtores')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar Novo Produtor')).toBeInTheDocument();
  });

  test('displays system features', () => {
    renderWithRedux(<App />);
    expect(screen.getByText('Funcionalidades do Sistema:')).toBeInTheDocument();
    expect(screen.getByText(/Cadastro de produtores rurais/)).toBeInTheDocument();
  });
});
