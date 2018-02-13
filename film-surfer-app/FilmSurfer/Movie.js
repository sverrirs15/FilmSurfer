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
import STRINGS from "./Strings";

export default class Movie extends Component {
  constructor(props) {
    super(props);
  }

  DownloadMovie(title, id) {
    Alert.alert(
      title,
      "Download this movie?",
      [
        {
          text: "Yes",
          onPress: () =>
            console.log(
              fetch(
                "http://" +
                  STRINGS.IP.MAIN +
                  ":5000/download_movie?movieID=" +
                  id
              )
            )
        },
        { text: "No", onPress: () => console.log("No playerino") }
      ],
      { cancelable: false }
    );
  }

  PlayMovie(title) {
    Alert.alert(
      title,
      "Play this movie?",
      [
        {
          text: "Yes",
          onPress: () =>
            console.log(
              fetch(
                "http://" + STRINGS.IP.MAIN + ":5000/play_movie?movie=" + title
              )
            )
        },
        { text: "No", onPress: () => console.log("No playerino") }
      ],
      { cancelable: false }
    );
  }

  render() {
    if (this.props.navigation == null) {
      return (
        <View style={styles.container}>
          <View style={styles.info}>
            <View style={styles.movieNameContainer}>
              <Text style={styles.movieName}>{this.props.name}</Text>
            </View>
            <View style={styles.movieYearContainer}>
              <Text style={styles.movieYear}>{this.props.year}</Text>
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
    } else {
      const { state } = this.props.navigation;
      if (state.params.playable != null) {
        const { state } = this.props.navigation;
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
                  <Text style={styles.ratingDetailTextDetails}>
                    {state.params.imdb}
                  </Text>
                </View>
                <View style={styles.ratingDetails}>
                  <Image
                    style={styles.ratingIcon}
                    source={{
                      uri:
                        "http://static.tvtropes.org/pmwiki/pub/images/rotten_tomatoes_8290.jpg"
                    }}
                  />
                  <Text style={styles.ratingDetailTextDetails}>
                    {state.params.rotten}
                  </Text>
                </View>
                <View style={styles.ratingDetails}>
                  <Image
                    style={styles.ratingIcon}
                    source={{
                      uri:
                        "http://static.metacritic.com/images/icons/mc_fb_og.png"
                    }}
                  />
                  <Text style={styles.ratingDetailTextDetails}>
                    {state.params.metacritic}
                  </Text>
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
              title="Play"
              style={{
                padding: 10,
                height: 45,
                overflow: "hidden",
                borderRadius: 4,
                backgroundColor: "white"
              }}
              style={{ fontSize: 20, color: "green" }}
              onPress={this.PlayMovie.bind(this, state.params.title)}
            />
          </View>
        );
      } else {
        const { state } = this.props.navigation;
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
                  <Text style={styles.ratingDetailTextDetails}>
                    {state.params.imdb}
                  </Text>
                </View>
                <View style={styles.ratingDetails}>
                  <Image
                    style={styles.ratingIcon}
                    source={{
                      uri:
                        "http://static.tvtropes.org/pmwiki/pub/images/rotten_tomatoes_8290.jpg"
                    }}
                  />
                  <Text style={styles.ratingDetailTextDetails}>
                    {state.params.rotten}
                  </Text>
                </View>
                <View style={styles.ratingDetails}>
                  <Image
                    style={styles.ratingIcon}
                    source={{
                      uri:
                        "http://static.metacritic.com/images/icons/mc_fb_og.png"
                    }}
                  />
                  <Text style={styles.ratingDetailTextDetails}>
                    {state.params.metacritic}
                  </Text>
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
              style={{
                padding: 10,
                height: 45,
                overflow: "hidden",
                borderRadius: 4
              }}
              onPress={this.DownloadMovie.bind(
                this,
                state.params.name,
                state.params.movieID
              )}
            />
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  movieNameContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginHorizontal: 10
  },
  movieYearContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  movieName: {
    color: "#8BECF5",
    fontSize: 20,
    textAlign: "center"
  },
  movieYear: {
    color: "white",
    fontSize: 18
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
    backgroundColor: "#424242",
    padding: 0,
    borderRadius: 10
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
    flex: 1,
    height: 30,
    width: 60,
    marginLeft: 30,
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
    backgroundColor: "#424242"
  },
  posterDetails: {
    flex: 3,
    flexDirection: "row",
    width: null,
    height: null,
    paddingBottom: 30,
    marginRight: 20
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
    margin: 15,
    textAlign: "auto",
    borderBottomWidth: 2,
    borderBottomColor: "#8BECF5",
    paddingVertical: 20,
    paddingBottom: 50
  },
  ratingDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  ratingTextDetails: {
    flex: 1,
    marginRight: 20,
    marginVertical: 10,
    marginBottom: 26,
    fontSize: 22,
    color: "white",
    backgroundColor: "#676767",
    textAlign: "center",
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6
  },
  ratingDetailTextDetails: {
    flex: 1,
    marginRight: 20,
    marginVertical: 10,
    marginBottom: 21,
    fontSize: 22,
    color: "white",
    backgroundColor: "#676767",
    textAlign: "center",
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6
  }
});
