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
  Button
} from "react-native";

export default class Movie extends Component {
  constructor(props) {
    super(props);
  }

  

  render() {
    if(this.props.navigation == null)
    {
      return (
        <View style={styles.container}>
          <View style={styles.info}>
            <View style={styles.movieNameContainer}>
              <Text style={styles.movieName}>{this.props.name}</Text>
            </View>
            <View style={styles.movieNameContainer}>
              <Text style={styles.movieName}>{this.props.year}</Text>
            </View>
            <View style={styles.ratingDetails}>
              <Image
                style={styles.ratingIcon}
                source={{
                  uri:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png"
                }}
              />
              <Text style={styles.ratingTextDetails}>{this.props.imdb}</Text>
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
    else
    {
      const {state} = this.props.navigation;
      return (
        <View style={styles.containerDetails}>
          <View style={styles.infoDetails}>
          <Text style={styles.plotDetails}>{state.params.plot}</Text>
            </View>
            <View style={styles.posterDetails}>
              <View style={styles.posterDetailsLeft}>
              <View style={styles.ratingDetails}>
              <Image
                style={styles.ratingIcon}
                source={{
                  uri:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png"
                }}
              />
              <Text style={styles.ratingTextDetails}>{state.params.imdb}</Text>
                </View>
                <View style={styles.ratingDetails}>
                <Image
                style={styles.ratingIcon}
                source={{
                  uri:
                    "http://static.tvtropes.org/pmwiki/pub/images/rotten_tomatoes_8290.jpg"
                }}
              />
              <Text style={styles.ratingTextDetails}>{state.params.rotten}</Text>
              </View>
              <View style={styles.ratingDetails}>
              <Image
                style={styles.ratingIcon}
                source={{
                  uri:
                    "http://static.metacritic.com/images/icons/mc_fb_og.png"
                }}
              />
              <Text style={styles.ratingTextDetails}>{state.params.metacritic}</Text>
              </View>
              </View>
              <Image
              style={styles.posterDetailsRight}
              source={{
                uri: state.params.poster
              }}
              />
            </View>
            <Button
              title="Download"
              style={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
              style={{fontSize: 20, color: 'green'}}
              onPress={() =>  console.log("pressed")}
            />
        </View>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  movieNameContainer: {
    flex: 1,
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
  ratingIcon: {
    height: 30,
    width: 60,
    marginHorizontal: 20,
    marginVertical: 10
  },
  info: {
    flex: 3,
    flexDirection: "column",
    paddingHorizontal: 4
  },
  //Details section
  containerDetails: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#2D5D7B",
  },
  posterDetails: {
    flex: 3,
    flexDirection: "row",
    width: null,
    height: null
  },
  posterDetailsLeft: {
    flex: 2,
    flexDirection: "column",
    width: null,
    height: null
  },
  posterDetailsRight: {
    flex: 1,
    width: null,
    height: null
  },
  infoDetails: {
    flex: 5,
    flexDirection: "column",
    paddingHorizontal: 4
  },
  plotDetails: {
    color: "white",
    fontSize: 20,
    margin: 15
  },
  ratingDetails: {
    flex: 1,
    flexDirection: "row"
  },
  ratingTextDetails: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 22,
    color: "white"
  }


});
