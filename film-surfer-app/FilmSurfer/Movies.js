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
import Movie from "./Movie.js";

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }

  componentWillMount() {
    return fetch("http://192.168.1.131:5000/get_movies")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.movies
        });
        console.log(responseJson.movies);
      });
  }

  GetFlatListItem(title, movieID) {
    Alert.alert(
      title,
      "Download this movie?",
      [
        {
          text: "Yes",
          onPress: () =>
            console.log(
              fetch(
                "http://192.168.1.131:5000/download_movie?movieID=" + movieID
              )
            )
        },
        //{text: 'Yes', onPress: () => console.log(movieID)},
        { text: "No", onPress: () => console.log("No downloaderino") }
      ],
      { cancelable: false }
    );
  }

  /*
  <Text
                style={styles.FlatListItemStyle}
                onPress={this.GetFlatListItem.bind(
                  this,
                  item.title,
                  item.movieID
                )}
              >
                {" "}
                {item.movie}{" "}
              </Text>
              <Image
                style={{ width: 150, height: 200 }}
                source={{ uri: item.poster }}
              />


  */

  render() {
    return (
      <View style={styles.background}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={styles.singleEntry}>
              <Movie
                onPress={this.GetFlatListItem.bind(
                  this,
                  item.title,
                  item.movieID
                )}
                name={item.movie}
                poster={item.poster}
                rating={item.rating}
              />
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  singleEntry: {
    height: 200,
    width: "100%",
    marginVertical: 10,
    marginHorizontal: 5
  },
  background: {
    backgroundColor: "#34495e"
  }
});
