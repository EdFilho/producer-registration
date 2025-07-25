import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchProducers } from '../../store/producerSlice';
import {
  HomeContainer,
  HomeCard,
  HomeTitle,
  HomeDescription,
  ButtonContainer,
  HomeButton,
  FeaturesSection,
  FeaturesTitle,
  FeaturesList,
  ProducersSection,
  ProducersTitle,
  ProducersList,
  ProducerCard,
  ProducerName,
  ProducerInfo,
  LoadingMessage,
  ErrorMessage,
} from './HomePage.styled';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { producers, loading, error } = useSelector(
    (state: RootState) => state.producers
  );

  useEffect(() => {
    dispatch(fetchProducers());
  }, [dispatch]);

  const renderProducers = () => {
    if (loading) {
      return <LoadingMessage>Carregando produtores...</LoadingMessage>;
    }

    if (error) {
      return <ErrorMessage>Erro ao carregar produtores: {error}</ErrorMessage>;
    }

    if (producers.length === 0) {
      return <LoadingMessage>Nenhum produtor cadastrado ainda.</LoadingMessage>;
    }

    return (
      <ProducersList>
        {producers.map((producer) => (
          <ProducerCard key={producer.id}>
            <ProducerName>{producer.nomeProdutor}</ProducerName>
            <ProducerInfo>
              <p>
                <strong>CPF/CNPJ:</strong> {producer.cpfCnpj}
              </p>
              <p>
                <strong>Fazenda:</strong> {producer.nomeFazenda}
              </p>
              <p>
                <strong>Cidade:</strong> {producer.cidade} - {producer.estado}
              </p>
              <p>
                <strong>Área Total:</strong> {producer.areaTotalHectares} ha
              </p>
              <p>
                <strong>Área Agricultável:</strong>{' '}
                {producer.areaAgricultavelHectares} ha
              </p>
              {producer.culturas.length > 0 && (
                <p>
                  <strong>Culturas:</strong>{' '}
                  {producer.culturas.map((c) => c.nome).join(', ')}
                </p>
              )}
            </ProducerInfo>
          </ProducerCard>
        ))}
      </ProducersList>
    );
  };
  return (
    <HomeContainer>
      <HomeCard>
        <HomeTitle>Cadastro de Produtores Rurais</HomeTitle>
        <HomeDescription>
          Sistema de cadastro e gerenciamento de produtores rurais
        </HomeDescription>

        <ButtonContainer>
          <HomeButton onClick={() => navigate('/producer-register')}>
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

        <ProducersSection>
          <ProducersTitle>Produtores Cadastrados</ProducersTitle>
          {renderProducers()}
        </ProducersSection>
      </HomeCard>
    </HomeContainer>
  );
};

export default HomePage;
