import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  createProducer,
  updateProducer,
  fetchProducerById,
  clearCurrentProducer,
} from '../../store/producerSlice';
import { createPropriedade } from '../../store/propriedadeRuralSlice';
import { createSafra } from '../../store/safraSlice';
import { Producer, ProducerFormData } from '../../types/producer';
import { ProducerForm } from '../../components/forms/ProducerForm';
import {
  PageContainer as Container,
  PageTitle,
  ErrorMessage,
} from './ProducerRegister.styled';

const ProducerRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const { currentProducer, loading } = useSelector(
    (state: RootState) => state.producers
  );

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchProducerById(id));
    }

    return () => {
      dispatch(clearCurrentProducer());
    };
  }, [dispatch, id, isEditMode]);

  const convertProducerToFormData = (producer: Producer): ProducerFormData => {
    return {
      cpfCnpj: producer.cpfCnpj,
      nomeProdutor: producer.nomeProdutor,
      fazendas: [],
    };
  };

  const handleSubmit = async (formData: ProducerFormData) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (isEditMode && id) {
        await dispatch(updateProducer({ id, data: formData })).unwrap();
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const producerResult = await dispatch(
          createProducer({
            cpfCnpj: formData.cpfCnpj,
            nomeProdutor: formData.nomeProdutor,
            fazendas: [],
          })
        ).unwrap();

        const produtorId = producerResult.id;

        for (const fazenda of formData.fazendas) {
          try {
            const propriedadeResult = await dispatch(
              createPropriedade({
                produtorId,
                nomeFazenda: fazenda.nomeFazenda,
                cidade: fazenda.cidade,
                estado: fazenda.estado,
                areaTotalHectares: fazenda.areaTotalHectares,
                areaAgricultavelHectares: fazenda.areaAgricultavelHectares,
                areaVegetacaoHectares: fazenda.areaVegetacaoHectares,
              })
            ).unwrap();

            const propriedadeId = propriedadeResult.id;

            for (const safra of fazenda.safras) {
              if (safra.ano && safra.nome && safra.culturasPlantadas.length > 0) {
                await dispatch(
                  createSafra({
                    propriedadeRuralId: propriedadeId,
                    ano: parseInt(safra.ano),
                    nome: safra.nome,
                    culturasPlantadas: safra.culturasPlantadas,
                  })
                ).unwrap();
              }
            }
          } catch (error) {
            console.error('Erro ao criar fazenda:', error);
          }
        }
      }
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      setErrorMessage(
        isEditMode
          ? 'Erro ao atualizar o produtor. Tente novamente.'
          : 'Erro ao cadastrar o produtor. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
      navigate('/');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Container>
      <PageTitle>
        {isEditMode ? 'Editar Produtor' : 'Cadastrar Novo Produtor'}
      </PageTitle>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <ProducerForm
        initialData={
          currentProducer
            ? convertProducerToFormData(currentProducer)
            : undefined
        }
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading || loading}
        isEditMode={isEditMode}
      />
    </Container>
  );
};

export default ProducerRegisterPage;
