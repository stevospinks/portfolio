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
        <p>{this.props.data.details}</p>
        <div className="youtube">
          <iframe
            hidden={this.props.data.videoSource === ''}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            width="560"
            height="315"
            type="text/html"
            allowFullScreen
            src={'https://www.youtube.com/embed/' + this.props.data.videoSource + '?modestbranding=1&rel=0'}
          />
        </div>
        <button onClick={this.props.goBack}>Back</button>
      </>
    );
  }
}

export default hot(module)(Project);
