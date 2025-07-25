import { configureStore } from '@reduxjs/toolkit';
import { producerService } from '../../services/producerService';
import producerReducer, {
  fetchProducers,
  createProducer,
  deleteProducer,
  addProducer,
  setCurrentProducer,
  clearError,
} from '../producerSlice';
import { Producer, ProducerFormData } from '../../types/producer';
import { RootState } from '../index';

jest.mock('../../services/producerService');
const mockedProducerService = producerService as jest.Mocked<
  typeof producerService
>;

type TestRootState = {
  producers: {
    producers: Producer[];
    loading: boolean;
    error: string | null;
    currentProducer: Producer | null;
  };
};

describe('producerSlice', () => {
  let store: ReturnType<typeof configureStore<TestRootState>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        producers: producerReducer,
      },
    });
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = (store.getState() as RootState).producers;
      expect(state).toEqual({
        producers: [],
        loading: false,
        error: null,
        currentProducer: null,
      });
    });
  });

  describe('reducers', () => {
    it('should add producer', () => {
      const producer: Producer = {
        id: '1',
        cpfCnpj: '123.456.789-00',
        nomeProdutor: 'João Silva',
        nomeFazenda: 'Fazenda Teste',
        cidade: 'São Paulo',
        estado: 'SP',
        areaTotalHectares: 100,
        areaAgricultavelHectares: 80,
        areaVegetacaoHectares: 20,
        safras: [],
        culturas: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      store.dispatch(addProducer(producer));
      const state = (store.getState() as TestRootState).producers;
      expect(state.producers).toHaveLength(1);
      expect(state.producers[0]).toEqual(producer);
    });

    it('should set current producer', () => {
      const producer: Producer = {
        id: '1',
        cpfCnpj: '123.456.789-00',
        nomeProdutor: 'João Silva',
        nomeFazenda: 'Fazenda Teste',
        cidade: 'São Paulo',
        estado: 'SP',
        areaTotalHectares: 100,
        areaAgricultavelHectares: 80,
        areaVegetacaoHectares: 20,
        safras: [],
        culturas: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      store.dispatch(setCurrentProducer(producer));
      const state = (store.getState() as TestRootState).producers;
      expect(state.currentProducer).toEqual(producer);
    });

    it('should clear error', () => {
      // First, set an error in the state
      store = configureStore({
        reducer: {
          producers: producerReducer,
        },
        preloadedState: {
          producers: {
            producers: [],
            loading: false,
            error: 'Some error message',
            currentProducer: null,
          },
        },
      });

      const state = (store.getState() as TestRootState).producers;
      expect(state.error).toBe('Some error message');

      store.dispatch(clearError());
      const stateAfterClear = (store.getState() as TestRootState).producers;
      expect(stateAfterClear.error).toBeNull();
    });
  });

  describe('async thunks', () => {
    describe('fetchProducers', () => {
      it('should fetch producers successfully', async () => {
        const mockProducers: Producer[] = [
          {
            id: '1',
            cpfCnpj: '123.456.789-00',
            nomeProdutor: 'João Silva',
            nomeFazenda: 'Fazenda Teste',
            cidade: 'São Paulo',
            estado: 'SP',
            areaTotalHectares: 100,
            areaAgricultavelHectares: 80,
            areaVegetacaoHectares: 20,
            safras: [],
            culturas: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        mockedProducerService.getAll.mockResolvedValue(mockProducers);

        await store.dispatch(fetchProducers() as any);
        const state = (store.getState() as TestRootState).producers;

        expect(state.loading).toBe(false);
        expect(state.producers).toEqual(mockProducers);
        expect(state.error).toBeNull();
      });

      it('should handle fetch producers error', async () => {
        const errorMessage = 'Failed to fetch';
        mockedProducerService.getAll.mockRejectedValue(new Error(errorMessage));

        await store.dispatch(fetchProducers() as any);
        const state = (store.getState() as TestRootState).producers;

        expect(state.loading).toBe(false);
        expect(state.producers).toEqual([]);
        expect(state.error).toBe(errorMessage);
      });
    });

    describe('createProducer', () => {
      it('should create producer successfully', async () => {
        const formData: ProducerFormData = {
          cpfCnpj: '123.456.789-00',
          nomeProdutor: 'João Silva',
          nomeFazenda: 'Fazenda Teste',
          cidade: 'São Paulo',
          estado: 'SP',
          areaTotalHectares: '100',
          areaAgricultavelHectares: '80',
          areaVegetacaoHectares: '20',
          safras: [],
          culturas: [],
        };

        const mockCreatedProducer: Producer = {
          id: '1',
          ...formData,
          areaTotalHectares: 100,
          areaAgricultavelHectares: 80,
          areaVegetacaoHectares: 20,
          safras: [{ id: 'safra-1', ano: 2021, nome: 'Safra 2021' }],
          culturas: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        mockedProducerService.create.mockResolvedValue(mockCreatedProducer);

        await store.dispatch(createProducer(formData) as any);
        const state = (store.getState() as TestRootState).producers;

        expect(state.loading).toBe(false);
        expect(state.producers).toHaveLength(1);
        expect(state.producers[0]).toEqual(mockCreatedProducer);
        expect(state.error).toBeNull();
      });
    });

    describe('deleteProducer', () => {
      it('should delete producer successfully', async () => {
        const producer: Producer = {
          id: '1',
          cpfCnpj: '123.456.789-00',
          nomeProdutor: 'João Silva',
          nomeFazenda: 'Fazenda Teste',
          cidade: 'São Paulo',
          estado: 'SP',
          areaTotalHectares: 100,
          areaAgricultavelHectares: 80,
          areaVegetacaoHectares: 20,
          safras: [],
          culturas: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        store.dispatch(addProducer(producer));
        expect(
          (store.getState() as TestRootState).producers.producers
        ).toHaveLength(1);

        mockedProducerService.delete.mockResolvedValue();

        await store.dispatch(deleteProducer('1') as any);
        const state = (store.getState() as TestRootState).producers;

        expect(state.loading).toBe(false);
        expect(state.producers).toHaveLength(0);
        expect(state.error).toBeNull();
        expect(mockedProducerService.delete).toHaveBeenCalledWith('1');
      });

      it('should handle delete producer error', async () => {
        const errorMessage = 'Failed to delete';
        mockedProducerService.delete.mockRejectedValue(new Error(errorMessage));

        await store.dispatch(deleteProducer('1') as any);
        const state = (store.getState() as TestRootState).producers;

        expect(state.loading).toBe(false);
        expect(state.error).toBe(errorMessage);
      });
    });
  });
});
