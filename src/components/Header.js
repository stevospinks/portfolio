import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Header.scss';

class Contact extends Component {
  static propTypes = {
    subheading: PropTypes.string
  };

  render() {
    return (
      <>
        <p className="headline">Stephen Spinks</p>
        <hr className="separator" />
        <p className="subheading">
          {this.props.subheading || [
            'Computer Games Development 1',
            <sup key="none">st</sup>,
            ' class honours graduate from the University of Glamorgan (now University of South Wales).'
          ]}
        </p>
      </>
    );
  }
}

export default hot(module)(Contact);
