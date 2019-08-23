import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/Project.scss';

class Project extends Component {
  static propTypes = {
    data: PropTypes.object,
    goBack: PropTypes.func
  };

  render() {
    return (
      <>
        <p>{this.props.data.name}</p>
        <p>Project details coming soon...</p>
        <button onClick={this.props.goBack}>Back</button>
      </>
    );
  }
}

export default hot(module)(Project);
