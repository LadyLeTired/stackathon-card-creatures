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
    padding: 20,
    margin: 10
  }
});

export default class Choices extends Component {
  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => navigator.push("Your Cards")}>
          <Text style={styles.button}>Your Cards</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigator.pop()}>
          <Text style={styles.button}>Play Game</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
