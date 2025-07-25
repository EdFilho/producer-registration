import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchProducers, deleteProducer } from '../../store/producerSlice';
import { fetchPropriedades } from '../../store/propriedadeRuralSlice';
import { fetchSafras } from '../../store/safraSlice';
import {
  ConfirmModal,
  NotificationModal,
  ActionButton,
} from '../../components/shared';
import { PieChart } from '@mui/x-charts/PieChart';
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
  const { safras } = useSelector((state: RootState) => state.safras);

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
    dispatch(fetchSafras());
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
    const fazendas = propriedades.filter((p) => p.produtorId === produtorId);

    return {
      totalFazendas: fazendas.length,
      fazendas: fazendas.slice(0, 2),
    };
  };

  const getEstadosData = () => {
    const estadosCount = propriedades.reduce((acc, prop) => {
      acc[prop.estado] = (acc[prop.estado] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(estadosCount).map(([estado, count], index) => ({
      id: index,
      value: count,
      label: estado,
    }));
  };

  const getCulturasData = () => {
    const culturasCount = safras.reduce((acc, safra) => {
      safra.culturasPlantadas.forEach((cultura) => {
        acc[cultura] = (acc[cultura] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(culturasCount)
      .filter(([_, count]) => count > 0)
      .map(([cultura, count], index) => ({
        id: index,
        value: count,
        label: cultura,
      }));
  };

  const getUsoSoloData = () => {
    const totalAgricultavel = propriedades.reduce(
      (total, prop) => total + prop.areaAgricultavelHectares,
      0
    );
    const totalVegetacao = propriedades.reduce(
      (total, prop) => total + prop.areaVegetacaoHectares,
      0
    );

    return [
      {
        id: 0,
        value: totalAgricultavel,
        label: 'Área Agricultável',
      },
      {
        id: 1,
        value: totalVegetacao,
        label: 'Área de Vegetação',
      },
    ];
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

                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    border: '1px solid #e9ecef',
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 0.25rem 0',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: '#495057',
                    }}
                  >
                    📊 Resumo: {summary.totalFazendas} fazenda
                    {summary.totalFazendas !== 1 ? 's' : ''}
                  </p>
                  {summary.fazendas.length > 0 ? (
                    <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                      {summary.fazendas.map((fazenda, index) => (
                        <div key={fazenda.id} style={{ margin: '0.25rem 0' }}>
                          🌾 <strong>{fazenda.nomeFazenda}</strong> (
                          {fazenda.cidade}, {fazenda.estado})
                          <br />
                          <span
                            style={{ fontSize: '0.8rem', color: '#868e96' }}
                          >
                            Área: {fazenda.areaTotalHectares} ha • Agricultável:{' '}
                            {fazenda.areaAgricultavelHectares} ha
                          </span>
                        </div>
                      ))}
                      {summary.totalFazendas > 2 && (
                        <div
                          style={{
                            fontStyle: 'italic',
                            color: '#868e96',
                            marginTop: '0.25rem',
                          }}
                        >
                          ... e mais {summary.totalFazendas - 2} fazenda
                          {summary.totalFazendas - 2 !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: '0.85rem',
                        color: '#6c757d',
                        fontStyle: 'italic',
                      }}
                    >
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
            <ActionButton
              variant='primary'
              onClick={() => navigate('/producer-register')}
            >
              Cadastrar Novo Produtor
            </ActionButton>
          </ButtonContainer>

          <FeaturesSection>
            <FeaturesTitle>Estatísticas do Sistema:</FeaturesTitle>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '1rem',
              }}
            >
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '8px',
                  border: '1px solid #2196f3',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#1976d2',
                  }}
                >
                  {propriedades.length}
                </div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    color: '#424242',
                    marginTop: '0.5rem',
                  }}
                >
                  Total de Fazendas Cadastradas
                </div>
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#e8f5e8',
                  borderRadius: '8px',
                  border: '1px solid #4caf50',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#388e3c',
                  }}
                >
                  {propriedades
                    .reduce((total, prop) => total + prop.areaTotalHectares, 0)
                    .toLocaleString('pt-BR')}
                </div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    color: '#424242',
                    marginTop: '0.5rem',
                  }}
                >
                  Total de Hectares Registrados
                </div>
              </div>
            </div>
          </FeaturesSection>

          <FeaturesSection>
            <FeaturesTitle>Análises Gráficas:</FeaturesTitle>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginTop: '2rem',
              }}
            >
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <h4
                  style={{
                    margin: '0 0 1rem 0',
                    textAlign: 'center',
                    color: '#333',
                    fontSize: '1.1rem',
                  }}
                >
                  Distribuição por Estado
                </h4>
                {getEstadosData().length > 0 ? (
                  <PieChart
                    series={[
                      {
                        data: getEstadosData(),
                        arcLabel: (item) => `${item.value}`,
                        arcLabelMinAngle: 45,
                      },
                    ]}
                    height={250}
                    slotProps={{
                      pieArcLabel: {
                        style: {
                          fill: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        },
                      },
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: '250px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666',
                      fontStyle: 'italic',
                    }}
                  >
                    Sem dados para exibir
                  </div>
                )}
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <h4
                  style={{
                    margin: '0 0 1rem 0',
                    textAlign: 'center',
                    color: '#333',
                    fontSize: '1.1rem',
                  }}
                >
                  Culturas Plantadas
                </h4>
                {getCulturasData().length > 0 ? (
                  <PieChart
                    series={[
                      {
                        data: getCulturasData(),
                        arcLabel: (item) => `${item.value}`,
                        arcLabelMinAngle: 45,
                      },
                    ]}
                    height={250}
                    slotProps={{
                      pieArcLabel: {
                        style: {
                          fill: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        },
                      },
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: '250px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666',
                      fontStyle: 'italic',
                    }}
                  >
                    Sem dados para exibir
                  </div>
                )}
              </div>

              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <h4
                  style={{
                    margin: '0 0 1rem 0',
                    textAlign: 'center',
                    color: '#333',
                    fontSize: '1.1rem',
                  }}
                >
                  Uso do Solo (Hectares)
                </h4>
                {getUsoSoloData().every((item) => item.value > 0) ? (
                  <PieChart
                    series={[
                      {
                        data: getUsoSoloData(),
                        arcLabel: (item) =>
                          `${item.value.toLocaleString('pt-BR')}`,
                        arcLabelMinAngle: 45,
                      },
                    ]}
                    height={250}
                    slotProps={{
                      pieArcLabel: {
                        style: {
                          fill: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        },
                      },
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: '250px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666',
                      fontStyle: 'italic',
                    }}
                  >
                    Sem dados para exibir
                  </div>
                )}
              </div>
            </div>
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
