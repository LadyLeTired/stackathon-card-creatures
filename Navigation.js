import React, { Component } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
export const Route = () => null;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center"
  },
  scene: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  }
});

const buildSceneConfig = (children = []) => {
  const config = {};

  children.forEach(child => {
    config[child.props.name] = {
      key: child.props.name,
      component: child.props.component
    };
  });

  return config;
};

export class Navigator extends Component {
  constructor(props) {
    super(props);

    const sceneConfig = buildSceneConfig(props.children);
    const initialSceneName = props.children[0].props.name;

    this.state = {
      sceneConfig,
      stack: [sceneConfig[initialSceneName]]
    };
  }

  handlePush = sceneName => {
    this.setState(
      state => ({
        ...state,
        stack: [...state.stack, state.sceneConfig[sceneName]]
      }),
      () => {
        this._animatedValue.setValue(width);
        Animated.timing(this._animatedValue, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true
        }).start();
      }
    );
  };

  handlePop = () => {
    this.setState(state => {
      const { stack } = state;
      if (stack.length > 1) {
        return {
          stack: stack.slice(0, stack.length - 1)
        };
      }

      return state;
    });
  };

  _animatedValue = new Animated.Value(0);

  render() {
    return (
      <View style={styles.container}>
        {this.state.stack.map((scene, index) => {
          const CurrentScene = scene.component;
          return (
            <View key={scene.key} style={styles.scene}>
              <CurrentScene
                navigator={{ push: this.handlePush, pop: this.handlePop }}
              />
            </View>
          );
        })}
      </View>
    );
  }
}