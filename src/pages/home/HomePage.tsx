import React from 'react';
import {
  HomeContainer,
  HomeCard,
  HomeTitle,
  HomeDescription,
  ButtonContainer,
  HomeButton,
  FeaturesSection,
  FeaturesTitle,
  FeaturesList
} from './HomePage.styled';

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <HomeCard>
        <HomeTitle>Cadastro de Produtores Rurais</HomeTitle>
        <HomeDescription>
          Sistema de cadastro e gerenciamento de produtores rurais
        </HomeDescription>
        
        <ButtonContainer>
          <HomeButton onClick={() => console.log('Navegar para listagem')}>
            Ver Produtores
          </HomeButton>
          <HomeButton onClick={() => console.log('Navegar para cadastro')}>
            Cadastrar Novo Produtor
          </HomeButton>
        </ButtonContainer>

        <FeaturesSection>
          <FeaturesTitle>Funcionalidades do Sistema:</FeaturesTitle>
          <FeaturesList>
            <li>Cadastro de produtores rurais com validação de CPF/CNPJ</li>
            <li>Gestão de propriedades e áreas cultiváveis</li>
            <li>Controle de culturas plantadas</li>
            <li>Dashboard com estatísticas</li>
            <li>Validação de dados e consistências</li>
          </FeaturesList>
        </FeaturesSection>
      </HomeCard>
    </HomeContainer>
  );
};

export default HomePage;
