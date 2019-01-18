import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center"
  },
  container2: {
    flex: 1,
    backgroundColor: "maroon",
    alignItems: "center",
    justifyContent: "center"
  },
  bodyText: {
    fontSize: 30
  },
  button: {
    backgroundColor: "lightblue",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20
  }
});

export default class Test extends Component {
  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.bodyText}>Test Page!</Text>
        <TouchableHighlight onPress={() => navigator.pop()}>
          <Text style={styles.button}>Back to Home!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
