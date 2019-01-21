import React from "react";
import { Provider } from "react-redux";
import AppContainer from "./app/containers/AppContainer";
import { Choices, AllCards, CardDetails, Play } from "./app/components";
import store from "./app/reducers";
import { Navigator, Route } from "./Navigation";
import { Font } from "expo";
import { View, StyleSheet, Image } from "react-native";

import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Remote debugger"]);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }
  async componentDidMount() {
    await Font.loadAsync({
      "Raleway-Black": require("./assets/fonts/Raleway/Raleway-Black.ttf")
    });
    await Font.loadAsync({
      "Qing-Regular": require("./assets/fonts/ZCOOL_QingKe_HuangYou/ZCOOLQingKeHuangYou-Regular.ttf")
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
          <Navigator>
            <Route name="Home" component={AppContainer} />
            {/* <Route name="Home" component={Play} /> */}
            <Route name="Choices" component={Choices} />
            <Route name="Your Cards" component={AllCards} />
            <Route name="Card Details" component={CardDetails} />
            <Route name="Play" component={Play} />
          </Navigator>
        </Provider>
      );
    }
    return (
      <View>
        <Image
          source={{
            uri:
              "http://easywebplans.com/wp-content/uploads/2017/02/maxresdefault.jpg"
          }}
          style={styles.container}
        />
      </View>
    );
  }
}
// <AppContainer />
