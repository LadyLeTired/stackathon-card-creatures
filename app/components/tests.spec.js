import React, { View, Text, StyleSheet } from "react-native";
import { shallow } from "enzyme";
import { expect } from "chai";
import proxyquire from "proxyquire";
import { spy } from "sinon";

// This ensures that proxyquire won't run the file before we
// mock its imports.
const proxyquireStrict = proxyquire.noCallThru();
const Meteor = {
  loginWithPassword: null
};
const Router = {
  Actions: {
    dashboard: null
  }
};

const AllCards = proxyquireStrict("./AllCards.js", {
  "react-native-meteor": Meteor,
  "react-native-router-flux": Router
  // No need to mock RN, react-native-mock already did that
  // for us ;)
});

describe("<AllCards />", () => {
  const allCards = "TODO";
  it("Should render a view", () => {});
});
