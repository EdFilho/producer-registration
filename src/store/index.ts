import { configureStore } from '@reduxjs/toolkit';
import producerReducer from './producerSlice';
import propriedadeRuralReducer from './propriedadeRuralSlice';
import safraReducer from './safraSlice';

export const store = configureStore({
  reducer: {
    producers: producerReducer,
    propriedades: propriedadeRuralReducer,
    safras: safraReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
