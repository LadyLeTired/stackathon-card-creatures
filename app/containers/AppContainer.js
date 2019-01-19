import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { addCard, fetchAllCards } from "../reducers/";

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
    fontSize: 30,
    fontFamily: "Raleway-Black"
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
        <Text style={styles.bodyText}>Card Creatures!</Text>
        <TouchableHighlight onPress={() => navigator.push("Choices")}>
          <Text style={styles.button}>Start Game</Text>
        </TouchableHighlight>
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
