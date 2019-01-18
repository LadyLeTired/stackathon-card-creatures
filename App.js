import React from "react";
import { Provider } from "react-redux";
import AppContainer from "./app/containers/AppContainer";
import Test from "./app/components/Test";
import store from "./app/reducers";
import { Navigator, Route } from "./Navigation";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator>
          <Route name="Home" component={AppContainer} />
          <Route name="Test" component={Test} />
        </Navigator>
      </Provider>
    );
  }
}
// <AppContainer />
