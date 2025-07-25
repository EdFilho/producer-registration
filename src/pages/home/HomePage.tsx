import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchProducers, deleteProducer } from '../../store/producerSlice';
import { ConfirmModal, NotificationModal, ActionButton } from '../../components/shared';
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
  ProducerActions,
  LoadingMessage,
  ErrorMessage,
} from './HomePage.styled';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { producers, loading, error } = useSelector(
    (state: RootState) => state.producers
  );

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    producerId: string;
    producerName: string;
  }>({
    isOpen: false,
    producerId: '',
    producerName: '',
  });

  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  });

  useEffect(() => {
    dispatch(fetchProducers());
  }, [dispatch]);

  const showNotification = (
    type: 'success' | 'error' | 'info' | 'warning',
    title: string,
    message: string
  ) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message,
    });
  };

  const handleDeleteProducer = (id: string, nomeProdutor: string) => {
    setConfirmModal({
      isOpen: true,
      producerId: id,
      producerName: nomeProdutor,
    });
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteProducer(confirmModal.producerId)).unwrap();
      showNotification(
        'success',
        'Produtor Removido',
        `Produtor <strong>"${confirmModal.producerName}"</strong> foi removido com sucesso!`
      );
    } catch (error) {
      console.error('Erro ao deletar produtor:', error);
      showNotification(
        'error',
        'Erro ao Deletar',
        `Erro ao deletar o produtor <strong>"${confirmModal.producerName}"</strong>. Tente novamente.`
      );
    } finally {
      setConfirmModal({ isOpen: false, producerId: '', producerName: '' });
    }
  };

  const cancelDelete = () => {
    setConfirmModal({ isOpen: false, producerId: '', producerName: '' });
  };

  const handleEditProducer = (id: string) => {
    navigate(`/producer-edit/${id}`);
  };

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
            <ProducerActions>
              <ActionButton
                variant='secondary'
                onClick={() => handleEditProducer(producer.id)}
                disabled={loading}
              >
                Editar
              </ActionButton>
              <ActionButton
                variant='outlined-danger'
                onClick={() =>
                  handleDeleteProducer(producer.id, producer.nomeProdutor)
                }
                disabled={loading}
              >
                Deletar
              </ActionButton>
            </ProducerActions>
          </ProducerCard>
        ))}
      </ProducersList>
    );
  };
  return (
    <>
      <HomeContainer>
        <HomeCard>
          <HomeTitle>Cadastro de Produtores Rurais</HomeTitle>
          <HomeDescription>
            Sistema de cadastro e gerenciamento de produtores rurais
          </HomeDescription>

          <ButtonContainer>
            <ActionButton variant="primary" onClick={() => navigate('/producer-register')}>
              Cadastrar Novo Produtor
            </ActionButton>
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

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title='Confirmar Exclusão'
        message={`<strong>ATENÇÃO:</strong> Tem certeza que deseja deletar o produtor <strong>"${confirmModal.producerName}"</strong>?

<strong>Esta ação NÃO PODE ser desfeita!</strong>`}
        variant='danger'
        confirmText='Sim, Deletar'
        cancelText='Cancelar'
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <NotificationModal
        isOpen={notification.isOpen}
        type={notification.type}
        title={notification.title}
        message={notification.message}
        onClose={() => setNotification({ ...notification, isOpen: false })}
      />
    </>
  );
};

export default HomePage;
