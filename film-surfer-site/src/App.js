import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount(){
    fetch('http://127.0.0.1:5000/')
      .then(d => d.json())
      .then(d => {
        this.setState({
          Data: d
        })
      })

  }



  render() {
    return (
      <div>

      </div>
    );
  }
}

export default App;
