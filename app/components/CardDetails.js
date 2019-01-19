import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button
} from "react-native";
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  cardText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  cardFontStats: {
    color: "black"
  },
  cardFontName: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Raleway-Black",
    alignItems: "center",
    justifyContent: "center"
  },
  cardFontDescrip: {
    color: "black",
    fontSize: 20
  },
  cardMedia: {
    flex: 1
  },
  cardPic: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width - 20,
    margin: 20
  }
});

class CardDetails extends React.Component {
  render() {
    const { navigator, currentCard } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.fullViewCard}>
          <View style={styles.cardMedia}>
            <Image
              source={{ uri: `${currentCard.creatureImageUrl}` }}
              style={styles.cardPic}
            />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardFontName}>{currentCard.creatureName}</Text>
            <Text style={styles.cardFontDescrip}>
              HP: {currentCard.hp} || MP: {currentCard.mp}
            </Text>
            <Text style={styles.cardFontDescrip}>
              {currentCard.description}
            </Text>
          </View>
          <Button
            onPress={() => navigator.pop()}
            title="Back"
            color="#EF7126"
          />
        </View>
      </View>
    );
  }
}

const mapState = state => ({
  currentCard: state.cardReducer.currentCard
});
const mapDispatch = dispatch => ({
  fetchSingleCard: id => dispatch(fetchSingleCard(id))
});

export default connect(
  mapState,
  mapDispatch
)(CardDetails);
