import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    // flex: 1,
    padding: 10,
    margin: 5,
    height: 200,
    width: 150,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  cardFontStats: {
    color: "black",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13
  },
  cardFontName: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Qing-Regular",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  cardPic: {
    flex: 1,
    height: 75,
    width: 75,
    alignItems: "center",
    justifyContent: "center"
  }
});

class SingleCard extends React.Component {
  render() {
    const { card } = this.props;

    return (
      <View style={styles.card}>
        <Image source={{ uri: `${card.imageUrl}` }} style={styles.cardPic} />
        <Text style={styles.cardFontStats}>{card.name}</Text>
        <Text style={styles.cardFontStats}>
          HP: {card.hp} || MP: {card.mp}
        </Text>
        <Text style={styles.cardFontName}>{card.creatureName}</Text>
        {card.attacks.map(attack => {
          return (
            <View key={card.id} style={{ alignItems: "center" }}>
              <Text style={styles.cardAttacks}>{attack.name}</Text>
              <Text style={styles.cardAttacks}>
                Dmg: {attack.damage} || Cost: {attack.mpCost}
              </Text>
            </View>
          );
        })}
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
)(SingleCard);
