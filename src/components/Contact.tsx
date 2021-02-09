import { hot } from 'react-hot-loader';
import React from 'react';
import '../css/Contact.scss';

class Contact extends React.Component {
  render() {
    return (
      <div className="contact">
        <p>
          Contact Me:
          <br />
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
    );
  }
}

export default hot(module)(Contact);
