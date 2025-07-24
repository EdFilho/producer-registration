# Producer Registration Microfrontend

Sistema de cadastro e gerenciamento de produtores rurais desenvolvido como microfrontend.

## 🚀 Tecnologias

- **React 18** - Biblioteca para construção da interface
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Redux Toolkit** - Gerenciamento de estado da aplicação
- **Styled Components** - Estilização de componentes
- **Jest** - Framework de testes
- **React Testing Library** - Biblioteca para testes de componentes React
- **Webpack** - Bundler para microfrontend

## 🚀 Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm start
```

3. Acesse: http://localhost:3001

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas da aplicação
├── store/              # Configuração do Redux
│   ├── index.ts        # Store principal
│   ├── hooks.ts        # Hooks tipados do Redux
│   └── producerSlice.ts # Slice dos produtores
├── styles/             # Estilos globais
├── types/              # Definições de tipos TypeScript
├── utils/              # Funções utilitárias
├── __tests__/          # Testes unitários
├── App.tsx             # Componente principal
└── index.tsx           # Ponto de entrada
```

## 🛠️ Scripts Disponíveis

### Desenvolvimento
```bash
npm start               # Inicia o servidor de desenvolvimento na porta 3001
```

### Build
```bash
npm run build          # Gera build de produção
```

### Testes
```bash
npm test               # Executa os testes
npm run test:watch     # Executa os testes em modo watch
npm run test:coverage  # Executa os testes com cobertura
```

## 🧪 Executando Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## 📋 Funcionalidades Planejadas

- [ ] Cadastro de produtores rurais
- [ ] Validação de CPF/CNPJ
- [ ] Gestão de propriedades rurais
- [ ] Listagem e busca de produtores
- [ ] Edição e exclusão de registros

## 🏗️ Arquitetura Microfrontend

Este projeto está estruturado como um microfrontend, permitindo:

- Desenvolvimento independente
- Deploy isolado
- Tecnologias específicas por módulo
- Escalabilidade e manutenibilidade

## 🔧 Configuração

### Webpack
O projeto utiliza Webpack 5 configurado para:
- TypeScript transpilation
- Hot Module Replacement (HMR)
- Path aliases para imports limpos
- Suporte a microfrontend

### Redux
Estado global gerenciado com Redux Toolkit:
- Configuração tipada
- Async thunks para operações assíncronas
- Hooks personalizados para TypeScript

### Styled Components
- Global styles
- Theme support
- Component-based styling
- TypeScript integration

## 📝 Convenções

### Imports
```typescript
// Absolutos com alias
import { Component } from '@/components/Component';
import { useAppSelector } from '@/store/hooks';
```

### Componentes
```typescript
// Sempre tipados com React.FC
const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};
```

### Testes
- Arquivos de teste em `__tests__/` ou `*.test.tsx`
- Nomenclatura: `ComponentName.test.tsx`
- Coverage mínimo: 80%

## 🤝 Contribuindo

1. Clone o repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Add nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request
