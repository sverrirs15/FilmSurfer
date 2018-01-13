import React, { Component } from 'react';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      torrents: [],
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:5000/')
      .then(response => response.json())
      .then(data => this.setState({ torrents: data.movies }));
  }

  render() {
    var movies = this.state.torrents;

    return (
      <div style={{flex: 1, height: '500px', background: 'black', flexDirection: 'row'}}>
        <div style={{flex: 1, background: 'red'}}>djamm</div>
        <div style={{flex: 1, background: 'blue'}}>Hundur</div>
      </div>
    );
  }
}


//Styles

const flexLook = {
  flex: 1,
};

const posterStyle = {
  background: '#2980b9',
  flex: 1
};
