import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import Header from './Header.js';
import Contact from './Contact.js';
import '../css/App.scss';

class App extends Component {
  render() {
    return (
      <>
        <div className="bgimg" />
        <div className="container">
          <Header />
          <p>New website coming soon.</p>
          <Contact />
        </div>
      </>
    );
  }
}

export default hot(module)(App);
