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
  Button,
  TouchableOpacity
} from "react-native";

export default class Remote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ""
    };
  }

  static navigationOptions = {
    tabBarLabel: "Top 100",
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require("./remote-icon.png")}
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
    return fetch("http://192.168.1.110:5000/get_currently_playing")
      .then(response => response.text())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson
        });
      });
  }

  StopPlaying() {
    Alert.alert(
      "",
      "Stop playing movie?",
      [
        {
          text: "Yes",
          onPress: () =>
            console.log(fetch("http://192.168.1.110:5000/stop_playing"))
        },
        { text: "No", onPress: () => console.log("No playerino") }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.statsContainer}>
          <Text style={styles.movieNameTip}>Currently playing</Text>
          <Text style={styles.movieName}>{this.state.dataSource}</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.StopPlaying.bind(this)}
        >
          <Text style={styles.stopButton}>Stop</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  statsContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  movieNameTip: {
    fontSize: 16,
    borderBottomWidth: 1,
    paddingBottom: 15
  },
  movieName: {
    fontSize: 24,
    marginTop: 30
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e74c3c"
  },
  stopButton: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold"
  },
  icon: {
    width: 26,
    height: 26
  }
});
