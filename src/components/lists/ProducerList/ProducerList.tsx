import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { fetchProducers } from '../../../store/producerSlice';
import {
  ListContainer,
  ProducerCard,
  ProducerInfo,
  LoadingMessage,
  ErrorMessage
} from './ProducerList.styled';

interface ProducerListProps {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ProducerList: React.FC<ProducerListProps> = ({
  onEdit,
  onDelete
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { producers, loading, error } = useSelector((state: RootState) => state.producers);

  useEffect(() => {
    dispatch(fetchProducers());
  }, [dispatch]);

  if (loading) {
    return <LoadingMessage>Carregando produtores...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Erro: {error}</ErrorMessage>;
  }

  if (producers.length === 0) {
    return <LoadingMessage>Nenhum produtor encontrado.</LoadingMessage>;
  }

  return (
    <ListContainer>
      {producers.map((producer) => (
        <ProducerCard key={producer.id}>
          <ProducerInfo>
            <h3>{producer.nomeProdutor}</h3>
            <p><strong>CPF/CNPJ:</strong> {producer.cpfCnpj}</p>
            <p><strong>Fazenda:</strong> {producer.nomeFazenda}</p>
            <p><strong>Cidade:</strong> {producer.cidade} - {producer.estado}</p>
            <p><strong>Área Total:</strong> {producer.areaTotalHectares} ha</p>
            <p><strong>Área Agricultável:</strong> {producer.areaAgricultavelHectares} ha</p>
            <p><strong>Área de Vegetação:</strong> {producer.areaVegetacaoHectares} ha</p>
            
            {producer.safras.length > 0 && (
              <div>
                <strong>Safras:</strong>
                <ul>
                  {producer.safras.map((safra) => (
                    <li key={safra.id}>{safra.nome} ({safra.ano})</li>
                  ))}
                </ul>
              </div>
            )}
            
            {producer.culturas.length > 0 && (
              <div>
                <strong>Culturas:</strong>
                <ul>
                  {producer.culturas.map((cultura) => (
                    <li key={cultura.id}>{cultura.nome}</li>
                  ))}
                </ul>
              </div>
            )}
          </ProducerInfo>
          
          <div>
            {onEdit && (
              <button onClick={() => onEdit(producer.id)}>
                Editar
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(producer.id)}>
                Excluir
              </button>
            )}
          </div>
        </ProducerCard>
      ))}
    </ListContainer>
  );
};

export default ProducerList;
