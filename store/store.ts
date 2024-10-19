// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deviceReducer from './slices/deviceSlice';

const persistConfig = {
  key: 'rootxd2',
  storage: AsyncStorage,
};

// Configuramos el reducer persistente
const persistedReducer = persistReducer(persistConfig, deviceReducer);

// Configuramos el store
const store = configureStore({
  reducer: {
    device: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => // TODO: REVISAR LO DEL MIDDLEWARE ANTES DE PRODUCCION
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

// Tipos de estado y dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Crear el persistor
export const persistor = persistStore(store);

export default store;
