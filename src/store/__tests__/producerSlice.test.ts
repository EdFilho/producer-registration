import { configureStore } from '@reduxjs/toolkit';
import producerSlice, {
  fetchProducers,
  addProducer,
  updateProducer,
  deleteProducer,
} from '../producerSlice';
import { Producer } from '../../types/producer';

jest.mock('../../services/producerService');

const mockProducers: Producer[] = [
  {
    id: '1',
    cpfCnpj: '123.456.789-10',
    nomeProdutor: 'João Silva',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('producerSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        producers: producerSlice,
      },
    });
  });

  it('should return the initial state', () => {
    const state = store.getState().producers;
    expect(state.producers).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle fetchProducers.pending', () => {
    const action = { type: fetchProducers.pending.type };
    const state = store.getState().producers;
    const newState = producerSlice(state, action);

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle fetchProducers.fulfilled', () => {
    const action = {
      type: fetchProducers.fulfilled.type,
      payload: mockProducers,
    };
    const state = store.getState().producers;
    const newState = producerSlice(state, action);

    expect(newState.loading).toBe(false);
    expect(newState.producers).toEqual(mockProducers);
    expect(newState.error).toBeNull();
  });

  it('should handle fetchProducers.rejected', () => {
    const action = {
      type: fetchProducers.rejected.type,
      error: { message: 'Erro ao carregar producers' },
    };
    const state = store.getState().producers;
    const newState = producerSlice(state, action);

    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Erro ao carregar producers');
  });
});
