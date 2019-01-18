import React from "react";
import { StyleSheet, Text, View } from "react-native";

const testCreature = {
  creatureImageUrl:
    "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg",
  creatureName: "Test Creature",
  creatureType: "Ice",
  hp: 10,
  mp: 10,
  description: "Some description"
};

export default class SingleCard extends React.Component {
  render() {
    return (
      <View>
        <Text>{testCreature.creatureName}</Text>
        <Text>{testCreature.creatureType}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
