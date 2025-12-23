import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
