import { hot } from 'react-hot-loader';
import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default hot(module)(Contact);
