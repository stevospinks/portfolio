import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/Projects.scss';
import { Project } from '../interfaces/project';
import Loader from './Loader';
import ProjectOverview from './ProjectOverview';

interface Props {
  setProject: (project: Project) => void;
}

interface State {
  projects: Project[];
  loadComplete: boolean;
  errorDuringLoad: boolean;
}

class Projects extends React.Component<Props, State> {
  componentDidMount() {
    this.setState({ loadComplete: false });
    const timerId = setTimeout(() => this.setState({ loadComplete: true, errorDuringLoad: true }), 5000);
    void fetch('./data/projects.json')
      .then((response: Response) => {
        return response.json();
      })
      .then((projects: Project[]) => {
        clearTimeout(timerId);
        this.setState({ loadComplete: true, errorDuringLoad: false, projects: projects });
      });
  }

  renderProjects() {
    return (
      <div className='projects'>
        {this.state.projects.map((project) => (
          <ProjectOverview key={project.id} project={project} onClick={this.props.setProject} />
        ))}
      </div>
    );
  }

  renderLoading() {
    return (
      <div className='projects'>
        <Loader text='Loading projects...' />
      </div>
    );
  }

  renderError() {
    return (
      <div className='projects'>
        <p>Something went wrong, please try again later.</p>
      </div>
    );
  }

  render() {
    if (!this.state) {
      return this.renderError();
    }

    if (!this.state.loadComplete) {
      return this.renderLoading();
    }

    if (this.state.errorDuringLoad || this.state.projects.length === 0) {
      return this.renderError();
    }

    return this.renderProjects();
  }
}

export default hot(module)(Projects);
