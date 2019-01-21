import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  FlatList,
  Dimensions,
  Alert
} from "react-native";
import { connect } from "react-redux";
import {
  fetchAllEnemies,
  fetchSingleEnemy,
  fetchAllCards,
  fetchSingleCard,
  enterBattle,
  exitBattle
} from "../reducers";
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
    // height: 400,
    // width: 200,
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
  },
  foeImage: {
    // width: Dimensions.get("window").width * 0.75
    width: 300,
    height: 200
  }
});

class Play extends Component {
  async componentDidMount() {
    await this.props.fetchAllCards();
    await this.props.fetchAllEnemies();

    let allEnemiesCount = this.props.allEnemies.length;
    let randomEnemyNum = Math.floor(Math.random() * allEnemiesCount + 1);
    const randomEnemyId = this.props.allEnemies[randomEnemyNum].id;
    this.props.fetchSingleEnemy(randomEnemyId);
  }
  _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        this.handlePress(item);
      }}
    >
      <SingleCard card={item} />
    </TouchableOpacity>
  );
  async handlePress(card) {
    const { navigator } = this.props;
    await this.props.fetchSingleCard(card.id);
    navigator.push("Card Details");
  }

  handleExit() {
    const { navigator } = this.props;
    Alert.alert(
      "Are you sure you want to exit!?",
      "One of your cards will be forfeited at random!",
      [
        {
          text: "Forfeit",
          onPress: () => {
            this.props.exitBattle();
            navigator.pop();
          }
        },
        {
          text: "Continue Battle",
          onPress: () => console.log("Battle continues"),
          style: "cancel"
        }
      ]
    );
  }

  render() {
    this.props.enterBattle();
    const { navigator, currentEnemy, exitBattle } = this.props;

    if (this.props.allEnemies.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.bodyText}>Loading Enemy!!</Text>
        </View>
      );
    }

    if (this.props.currentEnemy && this.props.currentEnemy.isDefeated) {
      exitBattle();
      return (
        <View style={styles.container}>
          <Text style={styles.bodyText}>Congrats, you won!</Text>
          <Button
            onPress={() => navigator.pop()}
            title="Main Menu"
            color="#EF7126"
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.foeArea}>
          <Text style={styles.bodyText}>Your Foe:</Text>

          <Text style={styles.bodyText}>{currentEnemy.name}</Text>
          <Image
            source={{ uri: currentEnemy.imageUrl }}
            style={styles.foeImage}
          />
          <Text style={styles.bodyText}>
            HP: {currentEnemy.hp} || MP: {currentEnemy.mp}
          </Text>
        </View>
        <View style={styles.cardArea}>
          <Text style={styles.bodyText}>Your Cards</Text>
          <FlatList
            horizontal={true}
            data={this.props.allCards}
            renderItem={this._renderItem}
            keyExtractor={item => String(item.id)}
          />
        </View>

        <Button
          onPress={() => this.handleExit()}
          title="Quit"
          color="#EF7126"
        />
      </View>
    );
  }
}

const mapState = state => ({
  allCards: state.cardReducer.allCards,
  allEnemies: state.enemyReducer.allEnemies,
  currentEnemy: state.enemyReducer.currentEnemy,
  inBattle: state.enemyReducer.inBattle
});
const mapDispatch = dispatch => ({
  fetchAllCards: () => dispatch(fetchAllCards()),
  fetchSingleCard: id => dispatch(fetchSingleCard(id)),
  fetchAllEnemies: () => dispatch(fetchAllEnemies()),
  fetchSingleEnemy: id => dispatch(fetchSingleEnemy(id)),
  enterBattle: () => dispatch(enterBattle()),
  exitBattle: () => dispatch(exitBattle())
});

export default connect(
  mapState,
  mapDispatch
)(Play);
