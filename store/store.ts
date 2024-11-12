// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deviceReducer from '@/store/slices/deviceSlice';
import deviceWizardReducer from '@/store/slices/deviceWizardSlice';

const persistConfig = {
  key: '222220241',
  storage: AsyncStorage,
};

const persistedDeviceReducer = persistReducer(persistConfig, deviceReducer);

const store = configureStore({
  reducer: {
    device: persistedDeviceReducer,      
    wizard: deviceWizardReducer,   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
