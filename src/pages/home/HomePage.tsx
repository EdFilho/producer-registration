import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchProducers, deleteProducer } from '../../store/producerSlice';
import { fetchPropriedades } from '../../store/propriedadeRuralSlice';
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
  const { propriedades } = useSelector(
    (state: RootState) => state.propriedades
  );
  const { safras } = useSelector(
    (state: RootState) => state.safras
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
    dispatch(fetchPropriedades());
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

  const getProducerSummary = (produtorId: string) => {
    const fazendas = propriedades.filter(p => p.produtorId === produtorId);

    return {
      totalFazendas: fazendas.length,
      fazendas: fazendas.slice(0, 2)
    };
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
        {producers.map((producer) => {
          const summary = getProducerSummary(producer.id);
          
          return (
            <ProducerCard key={producer.id}>
              <ProducerName>{producer.nomeProdutor}</ProducerName>
              <ProducerInfo>
                <p>
                  <strong>CPF/CNPJ:</strong> {producer.cpfCnpj}
                </p>
                <p>
                  <strong>Cadastrado em:</strong>{' '}
                  {new Date(producer.createdAt).toLocaleDateString('pt-BR')}
                </p>
                
                <div style={{ marginTop: '0.75rem', padding: '0.5rem', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #e9ecef' }}>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#495057' }}>
                    📊 Resumo: {summary.totalFazendas} fazenda{summary.totalFazendas !== 1 ? 's' : ''}
                  </p>
                  {summary.fazendas.length > 0 ? (
                    <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                      {summary.fazendas.map((fazenda, index) => (
                        <div key={fazenda.id} style={{ margin: '0.25rem 0' }}>
                          🌾 <strong>{fazenda.nomeFazenda}</strong> ({fazenda.cidade}, {fazenda.estado})
                          <br />
                          <span style={{ fontSize: '0.8rem', color: '#868e96' }}>
                            Área: {fazenda.areaTotalHectares} ha • Agricultável: {fazenda.areaAgricultavelHectares} ha
                          </span>
                        </div>
                      ))}
                      {summary.totalFazendas > 2 && (
                        <div style={{ fontStyle: 'italic', color: '#868e96', marginTop: '0.25rem' }}>
                          ... e mais {summary.totalFazendas - 2} fazenda{summary.totalFazendas - 2 !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.85rem', color: '#6c757d', fontStyle: 'italic' }}>
                      Nenhuma fazenda cadastrada
                    </div>
                  )}
                </div>
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
                  variant='primary'
                  onClick={() => navigate(`/propriedades/${producer.id}`)}
                  disabled={loading}
                >
                  Ver Detalhes
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
          );
        })}
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
