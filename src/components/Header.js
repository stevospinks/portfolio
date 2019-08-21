import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import '../css/Header.scss';

class Contact extends Component {
  render() {
    return (
      <>
        <p className="headline">Stephen Spinks</p>
        <hr className="separator" />
        <p className="subheading">
          Computer Games Development 1<sup>st</sup> class honours graduate from the University of Glamorgan (now
          University of South Wales).
        </p>
      </>
    );
  }
}

export default hot(module)(Contact);
