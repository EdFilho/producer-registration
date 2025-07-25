const React = require('react');

const styled = (tag) => (template) => {
  const Component = ({ children, ...otherProps }) => {
    const filteredProps = Object.keys(otherProps).reduce((acc, key) => {
      if (!key.startsWith('$')) {
        acc[key] = otherProps[key];
      }
      return acc;
    }, {});
    
    return React.createElement(tag, filteredProps, children);
  };
  return Component;
};

styled.createGlobalStyle = (template) => {
  return () => null;
};

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
styled.label = styled('label');
styled.input = styled('input');
styled.select = styled('select');
styled.textarea = styled('textarea');
styled.form = styled('form');

const keyframes = () => 'mocked-keyframes';

module.exports = styled;
module.exports.createGlobalStyle = styled.createGlobalStyle;
module.exports.keyframes = keyframes;
module.exports.default = styled;
