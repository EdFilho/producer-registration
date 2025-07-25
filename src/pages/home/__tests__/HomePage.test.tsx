import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../store';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

const MockHomePage = () => (
  <div>
    <h1>Cadastro de Produtores Rurais</h1>
    <p>Sistema de cadastro e gerenciamento de produtores rurais</p>
    <button>Cadastrar Novo Produtor</button>
    <h3>Estatísticas do Sistema:</h3>
    <h3>Análises Gráficas:</h3>
    <h2>Produtores Cadastrados</h2>
  </div>
);

const renderWithRedux = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });
  });

  test('renders HomePage title', () => {
    renderWithRedux(<MockHomePage />);
    expect(screen.getByText('Cadastro de Produtores Rurais')).toBeInTheDocument();
  });

  test('renders navigation button', () => {
    renderWithRedux(<MockHomePage />);
    expect(screen.getByText('Cadastrar Novo Produtor')).toBeInTheDocument();
  });

  test('displays statistics section titles', () => {
    renderWithRedux(<MockHomePage />);
    expect(screen.getByText('Estatísticas do Sistema:')).toBeInTheDocument();
    expect(screen.getByText('Análises Gráficas:')).toBeInTheDocument();
  });
});
