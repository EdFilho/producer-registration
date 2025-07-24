import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Producer } from '@/types';

interface ProducerState {
  producers: Producer[];
  loading: boolean;
  error: string | null;
  currentProducer: Producer | null;
}

const initialState: ProducerState = {
  producers: [],
  loading: false,
  error: null,
  currentProducer: null,
};

// Async thunks para operações assíncronas
export const fetchProducers = createAsyncThunk(
  'producers/fetchProducers',
  async () => {
    // Implementar chamada da API aqui
    const response = await fetch('/api/producers');
    return response.json();
  }
);

export const createProducer = createAsyncThunk(
  'producers/createProducer',
  async (producer: Omit<Producer, 'id'>) => {
    // Implementar chamada da API aqui
    const response = await fetch('/api/producers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producer),
    });
    return response.json();
  }
);

const producerSlice = createSlice({
  name: 'producers',
  initialState,
  reducers: {
    setCurrentProducer: (state, action: PayloadAction<Producer | null>) => {
      state.currentProducer = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducers.fulfilled, (state, action) => {
        state.loading = false;
        state.producers = action.payload;
      })
      .addCase(fetchProducers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao buscar produtores';
      })
      .addCase(createProducer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProducer.fulfilled, (state, action) => {
        state.loading = false;
        state.producers.push(action.payload);
      })
      .addCase(createProducer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Erro ao criar produtor';
      });
  },
});

export const { setCurrentProducer, clearError } = producerSlice.actions;
export default producerSlice.reducer;
