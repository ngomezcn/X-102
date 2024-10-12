import React from "react";
import "@/global.css";
import AppContainer from "./AppContainer";
import { Provider } from 'react-redux'
import store from "./store";
export default function RootLayout() {

  return (
    <>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </>
  );
}