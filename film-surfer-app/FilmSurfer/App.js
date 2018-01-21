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
  Button
} from "react-native";
import { StackNavigator } from 'react-navigation';
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";
import Movies from "./Movies.js";
import MyMovies from "./My_movies.js";
import NavigatorIOSApp from './Navigator.js'
import Tabs from './Tabs.js'
import Movie from './Movie.js'




export default class App extends Component {
  render() {
    return (
      <Tabs />
    );
  }
}
