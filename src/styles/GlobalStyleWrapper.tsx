import React from 'react';

// Wrapper para o GlobalStyle que funciona tanto em produção quanto em testes
export const GlobalStyleWrapper: React.FC = () => {
  // Em ambiente de teste, não renderiza o GlobalStyle
  if (process.env.NODE_ENV === 'test') {
    return null;
  }

  // Em produção e desenvolvimento, carrega dinamicamente o GlobalStyle
  try {
    const { GlobalStyle } = require('./GlobalStyles');
    return <GlobalStyle />;
  } catch (error) {
    // Se houver erro ao importar, retorna null
    return null;
  }
};

export default GlobalStyleWrapper;
