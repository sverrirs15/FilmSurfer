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
  Image,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";
import Movie from "./Movie.js";
import STRINGS from "./Strings";

export default class MyMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      refreshing: false
    };
  }

  static navigationOptions = {
    tabBarLabel: "My Movies",
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("./my-movies-icon.png")}
        style={[
          styles.icon,
          {
            tintColor: tintColor
          }
        ]}
      />
    )
  };

  componentWillMount() {
    return fetch("http://" + STRINGS.IP.MAIN + ":5000/get_my_movies")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.movies,
          refreshing: false
        });
        console.log(responseJson.movies);
      });
  }

  upDateList = () => {
    fetch("http://" + STRINGS.IP.MAIN + ":5000/get_my_movies")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson.movies,
          refreshing: false
        });
        console.log(responseJson.movies);
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.upDateList();
      }
    );
  };

  GetFlatListItem(title, movie) {
    Alert.alert(
      title,
      "Play this movie?",
      [
        {
          text: "Yes",
          onPress: () =>
            console.log(
              fetch(
                "http://" + STRINGS.IP.MAIN + ":5000/play_movie?movie=" + movie
              )
            )
        },
        //{text: 'Yes', onPress: () => console.log(movieID)},
        {
          text: "No",
          onPress: () => console.log("No downloaderino")
        }
      ],
      {
        cancelable: false
      }
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.background}>
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.singleEntry}
              onPress={() =>
                navigate("Details", {
                  name: item.movie,
                  poster: item.poster,
                  imdb: item.imdb,
                  rotten: item.rotten,
                  metacritic: item.metacritic,
                  plot: item.plot,
                  title: item.title,
                  playable: true
                })
              }
            >
              <Movie
                name={item.movie}
                poster={item.poster}
                imdb={item.imdb}
                year={item.year}
              />
            </TouchableOpacity>
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
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#FAFAFA"
  },
  background: {
    backgroundColor: "#FAFAFA"
  },
  icon: {
    width: 26,
    height: 26
  }
});
