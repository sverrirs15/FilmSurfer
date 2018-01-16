import React, { Component } from 'react';
import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform } from 'react-native';

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    }
  }

  componentWillMount() {
    return fetch('http://192.168.1.110:5000/get_movies')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.movies,
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
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  GetFlatListItem (title) {

  Alert.alert(title);

  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList

          data={ this.state.dataSource }

          ItemSeparatorComponent = {this.FlatListItemSeparator}

          renderItem={({item}) => <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item.title)} > {item.title} </Text>}

          keyExtractor={(item, index) => index}

         />
      </View>
    );
  }
}

const styles = StyleSheet.create({

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
