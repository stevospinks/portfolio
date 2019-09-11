import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Loader.scss';

class Loader extends Component {
  static propTypes = {
    text: PropTypes.string
  };

  render() {
    return (
      <>
        <div className="loaderText">
          <p>{this.props.text}</p>
        </div>
        <div className="loader">
          <div />
          <div />
          <div />
        </div>
      </>
    );
  }
}

export default hot(module)(Loader);
