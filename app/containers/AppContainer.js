import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";

import SingleCard from "../components/SingleCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
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

class CardCreatures extends Component {
  addCard() {
    this.props.addCard();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bodyText}>
          Total Cards Right Now -- {this.props.cardCount}
        </Text>
        <TouchableHighlight onPress={() => this.addCard()}>
          <Text style={styles.button}>Increment Card Count</Text>
        </TouchableHighlight>
        <SingleCard />
      </View>
    );
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

const mapState = state => ({
  cardCount: state.cardReducer
});

export default connect(
  mapState,
  mapDispatch
)(CardCreatures);
