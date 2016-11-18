import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return <span></span>;
  }
}

function select({ app }) {
  return { app };
}

export default connect(select)(App);
