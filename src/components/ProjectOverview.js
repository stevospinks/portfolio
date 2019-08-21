import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import '../css/ProjectOverview.scss';

class ProjectOverview extends Component {
  render() {
    return (
      <>
        <p>{this.props.name}</p>
        <div className="imageContainer">
          <img src={this.props.imageSource} />
        </div>
        <p>{this.props.blurb}</p>
      </>
    );
  }
}

export default hot(module)(ProjectOverview);
