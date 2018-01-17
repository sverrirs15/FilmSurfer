import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, AppRegistry, FlatList, Alert, ActivityIndicator, Platform } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Movies from './Movies.js';
import MyMovies from './My_movies.js';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};


FirstRoute = () => <View style={[ styles.container, { backgroundColor: '#2c3e50' } ]}>

  <Movies />
</View>;

SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#16a085' } ]}>
  <MyMovies />
</View>;

export default class TabViewExample extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Top 100' },
      { key: 'second', title: 'My Movies' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  render() {
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
    flex: 1,
  },
  MainContainer :{

  justifyContent: 'center',
  flex:1,
  margin: 10,
  paddingTop: (Platform.OS === 'ios') ? 20 : 0,

  },

  FlatListItemStyle: {
      padding: 10,
      fontSize: 18,
      height: 65,
    },
});
