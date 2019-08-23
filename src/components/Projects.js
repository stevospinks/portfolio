import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import ProjectOverview from './ProjectOverview.js';
import Loader from './Loader.js';
import '../css/Projects.scss';

class Projects extends Component {
  componentDidMount() {
    const self = this;
    var timerId = setTimeout(() => self.setState({ status: 'failed' }), 5000);

    fetch('./data/projects.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        clearTimeout(timerId);
        self.setState({ status: 'complete', projectData: data });
      });
  }

  renderData() {
    return (
      <div className="projects">
        {this.state.projectData.map(project => (
          <ProjectOverview key={project.id} data={project} />
        ))}
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="projects">
        <Loader text="Loading projects..." />
      </div>
    );
  }

  renderError() {
    return (
      <div className="projects">
        <p>Something went wrong, please try again later.</p>
      </div>
    );
  }

  render() {
    if (this.state && this.state.projectData && this.state.projectData.length > 0) {
      return this.renderData();
    }

    if (
      this.state &&
      (this.state.status === 'failed' ||
        (this.state.status === 'complete' && this.state.projectData && this.state.projectData.length === 0))
    ) {
      return this.renderError();
    }

    return this.renderLoading();
  }
}

export default hot(module)(Projects);
