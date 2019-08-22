import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import ProjectOverview from './ProjectOverview.js';
import Loader from './Loader.js';
import '../css/Projects.scss';

class Projects extends Component {
  componentDidMount() {
    const self = this;
    fetch('./data/projects.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        self.setState({ projectData: data });
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

  render() {
    if (this.state && this.state.projectData && this.state.projectData.length > 0) {
      return this.renderData();
    }

    return this.renderLoading();
  }
}

export default hot(module)(Projects);
