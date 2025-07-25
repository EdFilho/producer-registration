import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ProducerForm } from '../../components/forms/ProducerForm';
import { ProducerFormData } from '../../types/producer';
import { createProducer } from '../../store/producerSlice';
import { AppDispatch } from '../../store';
import {
  PageContainer,
  SuccessMessage,
  ErrorMessage
} from './ProducerRegister.styled';

const ProducerRegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (formData: ProducerFormData) => {
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await dispatch(createProducer(formData)).unwrap();
      
      setSuccessMessage('Produtor cadastrado com sucesso!');
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Erro ao cadastrar produtor:', error);
      setErrorMessage('Erro ao cadastrar produtor. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <PageContainer>

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
        isLoading={isLoading}
      />
    </PageContainer>
  );
};

export default ProducerRegisterPage;
