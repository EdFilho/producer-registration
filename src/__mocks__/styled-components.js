const React = require('react');

const styled = (tag) => (template) => {
  const Component = ({ children, ...otherProps }) => {
    return React.createElement(tag, otherProps, children);
  };
  return Component;
};

// Mock para createGlobalStyle
styled.createGlobalStyle = (template) => {
  return () => null; // Retorna um componente vazio para os testes
};

// Mock para styled components comuns
styled.div = styled('div');
styled.h1 = styled('h1');
styled.h2 = styled('h2');
styled.h3 = styled('h3');
styled.h4 = styled('h4');
styled.button = styled('button');
styled.ul = styled('ul');
styled.li = styled('li');
styled.p = styled('p');
styled.section = styled('section');
styled.span = styled('span');
styled.a = styled('a');

module.exports = styled;
module.exports.createGlobalStyle = styled.createGlobalStyle;
module.exports.default = styled;
