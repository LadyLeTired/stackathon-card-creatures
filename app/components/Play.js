import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { fetchAllCards, fetchSingleCard } from "../reducers";
import SingleCard from "./SingleCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center"
  },
  foeArea: {
    flex: 1,
    // backgroundColor: "maroon",
    alignItems: "center",
    justifyContent: "center"
  },
  cardArea: {
    flex: 1,
    // backgroundColor: "maroon",
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

class Choices extends Component {
  componentDidMount() {
    this.props.fetchAllCards();
  }
  _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.handlePress(item);
      }}
    >
      <SingleCard key={item.id} card={item} />
    </TouchableOpacity>
  );
  async handlePress(card) {
    const { navigator } = this.props;
    await this.props.fetchSingleCard(card.id);
    navigator.push("Card Details");
  }
  render() {
    console.log("CHOICES PROPS--->", this.props);
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.foeArea}>
          <Text style={styles.bodyText}>Your Foe!</Text>
          <Image source={require("../../assets/creatures/sf_036.png")} />
          <Text style={styles.bodyText}>HP: 20 || MP: 20</Text>
        </View>
        <View style={styles.cardArea}>
          <Text style={styles.bodyText}>Your Cards</Text>
          <FlatList
            horizontal={true}
            data={this.props.allCards}
            renderItem={this._renderItem}
            keyExtractor={item => item.creatureName}
          />
        </View>

        <Button onPress={() => navigator.pop()} title="Back" color="#EF7126" />
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
)(Choices);
