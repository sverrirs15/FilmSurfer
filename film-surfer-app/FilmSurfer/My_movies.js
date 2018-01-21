import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  FlatList,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Platform,
  Image
} from "react-native";

export default class MyMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  static navigationOptions = {
    tabBarLabel: 'My Movies',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./my-movies-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  componentWillMount() {
    return fetch("http://192.168.1.110:5000/get_my_movies")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.movies
        });
        console.log(responseJson.movies);
      });
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B"
        }}
      />
    );
  };

  GetFlatListItem(title) {
    Alert.alert(
      title,
      "Play this movie?",
      [
        {
          text: "Yes",
          onPress: () =>
            console.log(
              fetch("http://192.168.1.110:5000/play_movie?movie=" + title)
            )
        },
        { text: "No", onPress: () => console.log("No playerino") }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            <Text
              style={styles.FlatListItemStyle}
              onPress={this.GetFlatListItem.bind(this, item)}
            >
              {" "}
              {item}{" "}
            </Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});
