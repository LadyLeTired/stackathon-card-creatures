import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { addCard, fetchAllCards } from "../reducers/";

import SingleCard from "../components/SingleCard";

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

class CardCreatures extends Component {
  componentDidMount() {
    this.props.fetchAllCards();
  }
  addCard() {
    this.props.addCard();
  }
  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.bodyText}>Total: {this.props.cardCount}</Text>
        <TouchableHighlight onPress={() => this.addCard()}>
          <Text style={styles.button}>Increment Card Count!!</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigator.push("Test")}>
          <Text style={styles.button}>Go to next screen</Text>
        </TouchableHighlight>
        <SingleCard />
      </View>
    );
  }
}

const mapDispatch = dispatch => ({
  // return bindActionCreators(ActionCreators, dispatch);
  fetchAllCards: () => dispatch(fetchAllCards()),

  addCard: () => dispatch(addCard())
});

const mapState = state => ({
  cardCount: state.cardReducer.cardCount,
  allCards: state.cardReducer.allCards
});

export default connect(
  mapState,
  mapDispatch
)(CardCreatures);
