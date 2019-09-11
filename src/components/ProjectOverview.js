import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/ProjectOverview.scss';

class ProjectOverview extends Component {
  static propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func
  };

  render() {
    return (
      <div className="projectContainer" onClick={() => this.props.onClick(this.props.data)}>
        <p>{this.props.data.name}</p>
        <div className="imageContainer">
          <img src={this.props.data.imageSource} />
        </div>
        <p>{this.props.data.blurb}</p>
      </div>
    );
  }
}

export default hot(module)(ProjectOverview);
