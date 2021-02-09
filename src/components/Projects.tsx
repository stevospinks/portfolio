import { hot } from 'react-hot-loader';
import React from 'react';
import ProjectOverview from './ProjectOverview';
import Loader from './Loader';
import '../css/Projects.scss';
import { ProjectInfo } from '../data/interfaces';

interface Props {
  setProject: (data: ProjectInfo) => void
}

interface State {
  projectData: ProjectInfo[]
  status: string
}

class Projects extends React.Component<Props, State> {
  componentDidMount() {
    const timerId = setTimeout(() => this.setState({ status: 'failed' }), 5000);

    fetch('./data/projects.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        clearTimeout(timerId);
        this.setState({ status: 'complete', projectData: data });
      });
  }

  renderData() {
    return (
      <div className="projects">
        {this.state.projectData.map(project => (
          <ProjectOverview key={project.id} data={project} onClick={this.props.setProject} />
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
