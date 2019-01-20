import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

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
        <TouchableOpacity onPress={() => navigator.push("Your Cards")}>
          <Text style={styles.button}>Your Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigator.push("Play")}>
          <Text style={styles.button}>Play Game</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
