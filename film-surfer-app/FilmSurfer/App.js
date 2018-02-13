import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  AppRegistry,
  FlatList,
  Alert,
  ActivityIndicator,
  Platform,
  Image,
  Button
} from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import { TabNavigator, StackNavigator } from "react-navigation";
import Movie from "./Movie.js";
import Movies from "./Movies.js";
import MyMovies from "./My_movies.js";
import NavigatorIOSApp from "./Navigator.js";
import Remote from "./Remote";

const MyApp = TabNavigator(
  {
    Home: {
      screen: Movies
    },
    Notifications: {
      screen: MyMovies
    },
    Remote: {
      screen: Remote
    }
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      inactiveTintColor: "white",
      activeTintColor: "#8BECF5",
      style: { backgroundColor: "#424242" },
      indicatorStyle: { backgroundColor: "#8BECF5" }
    }
  }
);

const RootNavigator = StackNavigator({
  Home: {
    screen: MyApp,
    navigationOptions: {
      headerTitle: "Film Surfer",
      headerStyle: { backgroundColor: "#424242" },
      headerTitleStyle: { color: "#8BECF5", fontSize: 20, alignSelf: "center" }
    }
  },
  Details: {
    screen: Movie,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
      headerStyle: { backgroundColor: "#424242" },
      headerTitleStyle: { color: "#8BECF5", fontSize: 20 },
      headerTintColor: "white"
    })
  }
});

export default class App extends Component {
  render() {
    return <RootNavigator />;
  }
}
