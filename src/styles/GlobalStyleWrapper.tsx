import React from 'react';

export const GlobalStyleWrapper: React.FC = () => {
  if (process.env.NODE_ENV === 'test') {
    return null;
  }

  try {
    const { GlobalStyle } = require('./GlobalStyles');
    return <GlobalStyle />;
  } catch (error) {
    return null;
  }
};

export default GlobalStyleWrapper;
