import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import {
  fetchSingleCard,
  enterBattle,
  inBattle,
  damageEnemy
} from "../reducers";

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
    width: Dimensions.get("window").width - 40,
    margin: 20
  },
  cardAttacks: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Qing-Regular",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  attacksView: {
    borderStyle: "dotted",
    borderColor: "teal",
    alignItems: "center",
    borderWidth: 5,
    width: Dimensions.get("window").width - 20,
    margin: 10,
    padding: 10
  }
});

class CardDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    const { navigator, currentCard } = this.props;
    const damage = currentCard.attacks[0].damage;
    if (this.props.inBattle) {
      this.props.damageEnemy(damage);
      console.log(`${damage} damage done to ${this.props.currentEnemy.name}`);
    } else {
      console.log(
        this.props.currentCard.name,
        "IS **NOT** CURRENTLY IN BATTLE"
      );
    }
    navigator.pop();
  }
  render() {
    const { navigator, currentCard } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.fullViewCard}>
          <View style={styles.cardMedia}>
            <Image
              source={{ uri: `${currentCard.imageUrl}` }}
              style={styles.cardPic}
            />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardFontName}>{currentCard.creatureName}</Text>
            <Text style={styles.cardFontDescrip}>
              HP: {currentCard.hp} || MP: {currentCard.mp}
            </Text>
            <Text style={styles.cardFontName}>Attacks</Text>
            <View style={styles.attacksView}>
              {currentCard.attacks.map(attack => {
                return (
                  <TouchableOpacity
                    key={currentCard.id}
                    onPress={this.handlePress}
                  >
                    <View>
                      <Text style={styles.cardAttacks}>{attack.name}</Text>
                      <Text style={styles.cardAttacks}>
                        Dmg: {attack.damage} || Cost: {attack.mpCost}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
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
  currentCard: state.cardReducer.currentCard,
  inBattle: state.enemyReducer.inBattle,
  currentEnemy: state.enemyReducer.currentEnemy
});
const mapDispatch = dispatch => ({
  fetchSingleCard: id => dispatch(fetchSingleCard(id)),
  enterBattle: () => dispatch(enterBattle()),
  damageEnemy: dmg => dispatch(damageEnemy(dmg))
});

export default connect(
  mapState,
  mapDispatch
)(CardDetails);
