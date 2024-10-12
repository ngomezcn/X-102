import React, { useEffect } from "react";
import "@/global.css";
import AppContainer from "./AppContainer";
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from "./store"; 
import { RootState } from "./store"; // Asegúrate de que la ruta sea correcta

const LogState = () => {
  const deviceState = useSelector((state: RootState) => state.device);

  useEffect(() => {
    console.log("Estado del store en memoria:", JSON.stringify(deviceState, null, 2));
  }, [deviceState]);

  return null; // Este componente no necesita renderizar nada
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LogState /> {/* Componente para imprimir el estado */}
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}
