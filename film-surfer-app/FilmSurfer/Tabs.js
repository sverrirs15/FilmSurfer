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
import { TabNavigator, StackNavigator } from 'react-navigation';
import Movie from "./Movie.js";
import Movies from "./Movies.js";
import MyMovies from "./My_movies.js";
import NavigatorIOSApp from './Navigator.js'

const MyApp = TabNavigator({
  Home: {
    screen: Movies,
  },
  Notifications: {
    screen: MyMovies,
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    inactiveTintColor: 'white',
    activeTintColor: '#E4C3AD',
    style: {backgroundColor: '#546A7B'},
  },
});

const RootNavigator = StackNavigator({
  Home: {
    screen: MyApp,
    navigationOptions: {
      headerTitle: 'Film Surfer',
      headerStyle: {backgroundColor: '#546A7B'},
      headerTitleStyle: {color: '#E4C3AD', fontSize: 20}
    },
  },
  Details: {
    screen: Movie,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name}`,
      headerStyle: {backgroundColor: '#546A7B'},
      headerTitleStyle: {color: '#E4C3AD', fontSize: 20}
    }),
  },
});

export default class Tabs extends Component {
  render() {
    return (
      <RootNavigator />
    );
  }
}

/*
export default class Tabs extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Top 100" },
      { key: "second", title: "My Movies" }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    first: Movies,
    second: MyMovies
  });

  render() {
    const {navigate} = this.props.navigation;
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },

  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 65
  }
});
*/