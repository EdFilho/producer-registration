import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { HomePage } from '@/pages';

const renderWithRedux = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('HomePage', () => {
  test('renders the HomePage title', () => {
    renderWithRedux(<HomePage />);
    expect(screen.getByText('Cadastro de Produtores Rurais')).toBeInTheDocument();
  });

  test('renders the description', () => {
    renderWithRedux(<HomePage />);
    expect(screen.getByText('Sistema de cadastro e gerenciamento de produtores rurais')).toBeInTheDocument();
  });

  test('renders navigation buttons', () => {
    renderWithRedux(<HomePage />);
    expect(screen.getByText('Ver Produtores')).toBeInTheDocument();
    expect(screen.getByText('Cadastrar Novo Produtor')).toBeInTheDocument();
  });

  test('renders features section', () => {
    renderWithRedux(<HomePage />);
    expect(screen.getByText('Funcionalidades do Sistema:')).toBeInTheDocument();
    expect(screen.getByText(/Cadastro de produtores rurais com validação de CPF\/CNPJ/)).toBeInTheDocument();
    expect(screen.getByText(/Gestão de propriedades e áreas cultiváveis/)).toBeInTheDocument();
    expect(screen.getByText(/Controle de culturas plantadas/)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard com estatísticas/)).toBeInTheDocument();
    expect(screen.getByText(/Validação de dados e consistências/)).toBeInTheDocument();
  });
});
