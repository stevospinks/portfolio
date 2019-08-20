import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import '../css/App.scss';

class App extends Component {
  render() {
    return (
      <>
        <div className="bgimg" />
        <div className="container">
          <p className="headline">Stephen Spinks</p>
          <hr className="separator" />
          <p className="subheading">
            Computer Games Development 1<sup>st</sup> class honours graduate from the University of Glamorgan.
          </p>
          <p>New website coming soon.</p>
          <p>Contact Me:</p>
          <p>
            <a href="http://twitter.com/#!/stevospinks/" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            {' | '}
            <a href="mailto:stephen@stephenspinks.com" target="_blank" rel="noopener noreferrer">
              Direct E-mail
            </a>
            {' | '}
            <a href="http://uk.linkedin.com/in/stephenspinks" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
      </>
    );
  }
}

export default hot(module)(App);
