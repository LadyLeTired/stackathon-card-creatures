import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import { fetchAllCards } from "../reducers";

const testCreature = {
  creatureImageUrl:
    "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
  creatureName: "Test Creature",
  creatureType: "Ice",
  hp: 10,
  mp: 10,
  description: "Some description"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

class SingleCard extends React.Component {
  // componentDidMount() {
  //   this.props.fetchAllCards();
  // }
  render() {
    console.log("PROPS INSIDE SINGLECARD--->", this.props);

    if (this.props.allCards.length === 0) {
      return <Text>Nothing...</Text>;
    }
    return (
      <View>
        <Text>{this.props.allCards[0].creatureName}...</Text>
        <Text>SOMETHING.</Text>
      </View>
    );
  }
}

const mapState = state => ({
  allCards: state.cardReducer.allCards
});
const mapDispatch = dispatch => ({
  fetchAllCards: () => dispatch(fetchAllCards())
});

export default connect(
  mapState,
  mapDispatch
)(SingleCard);
