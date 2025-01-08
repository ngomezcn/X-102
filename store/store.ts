// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deviceReducer from '@/store/slices/deviceSlice';
import deviceWizardReducer from '@/store/slices/deviceWizardSlice';
import focusedDeviceReducer from '@/store/slices/focusedDeviceSlice';
import { useDispatch as useReduxDispatch } from 'react-redux';

const persistConfig = {
  key: 'ARR22220241',
  storage: AsyncStorage,
};

const persistedDeviceReducer = persistReducer(persistConfig, deviceReducer);

const store = configureStore({
  reducer: {
    focusedDevice: focusedDeviceReducer,      
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

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export const persistor = persistStore(store);

export default store;
