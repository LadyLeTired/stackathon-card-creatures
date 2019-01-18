import React from "react";
import { Provider } from "react-redux";
import AppContainer from "./app/containers/AppContainer";
import store from "./app/reducers";

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
