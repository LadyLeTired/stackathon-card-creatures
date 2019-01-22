import React from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Button
} from "react-native";
import { connect } from "react-redux";
import SingleCard from "./SingleCard";

import { fetchAllCards, fetchSingleCard } from "../reducers";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 10,
    width: Dimensions.get("window").width
  },
  bodyText: {
    fontSize: 30,
    fontFamily: "Raleway-Black",
    textAlign: "center"
  }
});

class AllCards extends React.Component {
  componentDidMount() {
    this.props.fetchAllCards();
  }
  async handlePress(card) {
    const { navigator } = this.props;
    await this.props.fetchSingleCard(card.id);
    navigator.push("Card Details");
  }
  renderHeader = () => {
    return <Text style={styles.bodyText}>Your Cards:</Text>;
  };
  _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.handlePress(item);
      }}
    >
      <SingleCard card={item} />
    </TouchableOpacity>
  );
  render() {
    const { navigator } = this.props;
    if (this.props.allCards.length === 0) {
      return <Text>Nothing..</Text>;
    }
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={this.props.allCards}
          renderItem={this._renderItem}
          keyExtractor={item => String(item.id)}
          ListHeaderComponent={this.renderHeader}
        />
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
)(AllCards);
