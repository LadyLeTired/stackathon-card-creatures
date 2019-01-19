import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { fetchSingleCard } from "../reducers";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  fullViewCard: {
    padding: 10,
    margin: 5,
    height: 400,
    width: 300,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  cardFontStats: {
    color: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  cardFontName: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Qing-Regular",
    alignItems: "center",
    justifyContent: "center"
  },
  cardFontDescrip: {
    color: "black",
    fontSize: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  cardPic: {
    flex: 1,
    height: 75,
    width: 75,
    alignItems: "center",
    justifyContent: "center"
  }
});

class CardDetails extends React.Component {
  render() {
    console.log("INSIDE CARD DETAILS VIEW");
    const currentCard = this.props.currentCard;
    return (
      <View style={styles.fullViewCard}>
        <Image
          source={{ uri: `${currentCard.creatureImageUrl}` }}
          style={styles.cardPic}
        />
        <Text style={styles.cardFontStats}>CARD DETAILS</Text>
        <Text style={styles.cardFontName}>{currentCard.creatureName}</Text>
        <Text style={styles.cardFontDescrip}>{currentCard.description}</Text>
      </View>
    );
  }
}

const mapState = state => ({
  allCards: state.cardReducer.allCards,
  currentCard: state.cardReducer.currentCard
});
const mapDispatch = dispatch => ({
  fetchAllCards: () => dispatch(fetchAllCards()),
  fetchSingleCard: id => dispatch(fetchSingleCard(id))
});

export default connect(
  mapState,
  mapDispatch
)(CardDetails);
