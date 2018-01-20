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

export default class Movie extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <View style={styles.movieNameContainer}>
            <Text style={styles.movieName}>{this.props.name}</Text>
          </View>
          <View style={styles.ratingsContainer}>
            <Image
              style={styles.imdb}
              source={{
                uri:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png"
              }}
            />
            <Text style={styles.ratings}>{this.props.rating}</Text>
          </View>
        </View>
        <Image
          style={styles.poster}
          source={{
            uri: this.props.poster
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  movieNameContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  movieName: {
    color: "white",
    fontSize: 20
  },
  ratingsContainer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "space-around"
  },
  ratings: {
    fontSize: 18,
    color: "white"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#2D5D7B",
    padding: 10,
    borderRadius: 20
  },
  poster: {
    flex: 2,
    width: null,
    height: null
  },
  imdb: {
    height: 30,
    width: 60
  },
  info: {
    flex: 3,
    flexDirection: "column",
    paddingHorizontal: 4
  }
});
