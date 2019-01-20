import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
    backgroundColor: "#EF7126",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    padding: 15,
    margin: 10,
    borderTopRightRadius: 20
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
        <Text style={styles.bodyText}>Card Creatures!!</Text>
        <TouchableOpacity onPress={() => navigator.push("Choices")}>
          <Text style={styles.button}>Start Game</Text>
        </TouchableOpacity>
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
