import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ProducerForm } from '../../components/forms/ProducerForm';
import { ProducerFormData, Producer } from '../../types/producer';
import { createProducer, updateProducer, fetchProducerById, clearCurrentProducer } from '../../store/producerSlice';
import { AppDispatch, RootState } from '../../store';
import {
  PageContainer,
  PageTitle,
  SuccessMessage,
  ErrorMessage
} from './ProducerRegister.styled';

const ProducerRegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { currentProducer, loading } = useSelector((state: RootState) => state.producers);
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isEditMode = Boolean(id);

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
      nomeFazenda: producer.nomeFazenda,
      cidade: producer.cidade,
      estado: producer.estado,
      areaTotalHectares: producer.areaTotalHectares.toString(),
      areaAgricultavelHectares: producer.areaAgricultavelHectares.toString(),
      areaVegetacaoHectares: producer.areaVegetacaoHectares.toString(),
      safras: producer.safras.map(safra => ({
        ano: safra.ano.toString(),
        nome: safra.nome
      })),
      culturas: producer.culturas.map(cultura => ({
        nome: cultura.nome,
        safraAno: cultura.safraId
      }))
    };
  };

  const handleSubmit = async (formData: ProducerFormData) => {
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      if (isEditMode && id) {
        await dispatch(updateProducer({ id, data: formData })).unwrap();
        setSuccessMessage('Produtor atualizado com sucesso!');
      } else {
        await dispatch(createProducer(formData)).unwrap();
        setSuccessMessage('Produtor cadastrado com sucesso!');
      }
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Erro ao salvar produtor:', error);
      setErrorMessage(
        isEditMode 
          ? 'Erro ao atualizar produtor. Tente novamente.' 
          : 'Erro ao cadastrar produtor. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <PageContainer>
      <PageTitle>
        {isEditMode ? 'Editar Produtor Rural' : 'Cadastrar Novo Produtor Rural'}
      </PageTitle>

      {successMessage && (
        <SuccessMessage>
          {successMessage}
        </SuccessMessage>
      )}

      {errorMessage && (
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
      )}

      <ProducerForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading || loading}
        isEditMode={isEditMode}
        initialData={isEditMode && currentProducer ? convertProducerToFormData(currentProducer) : undefined}
      />
    </PageContainer>
  );
};

export default ProducerRegisterPage;
