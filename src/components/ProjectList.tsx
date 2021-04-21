import React from 'react';
import Row from 'react-bootstrap/Row';
import { hot } from 'react-hot-loader';
import '../css/ProjectList.scss';
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

class ProjectList extends React.Component<Props, State> {
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
      <Row>
        {this.state.projects
          .sort((a, b) => a.displayId - b.displayId)
          .map((project) => (
            <ProjectOverview key={project.id} project={project} onClick={this.props.setProject} />
          ))}
      </Row>
    );
  }

  renderLoading() {
    return <Loader text='Loading projects...' />;
  }

  renderError() {
    return <p>Something went wrong while loading projects, please try again later.</p>;
  }

  render() {
    let content: JSX.Element;
    if (!this.state) {
      content = this.renderError();
    } else if (!this.state.loadComplete) {
      content = this.renderLoading();
    } else if (this.state.errorDuringLoad || this.state.projects.length === 0) {
      content = this.renderError();
    } else {
      content = this.renderProjects();
    }

    return <div className='projectList'>{content}</div>;
  }
}

export default hot(module)(ProjectList);
