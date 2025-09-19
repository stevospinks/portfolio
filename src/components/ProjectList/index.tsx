import React, { type JSX } from 'react';
import { Project } from '../../common/interfaces/project';
import Loader from '../Loader';
import ProjectOverview from '../ProjectOverview';
import './style.scss';

interface Props {
  setProject: (project: Project) => void;
}

interface State {
  projects: Project[];
  loadComplete: boolean;
  errorDuringLoad: boolean;
}

class ProjectList extends React.Component<Props, State> {
  componentDidMount(): void {
    this.setState({ loadComplete: false });
    const timerId = setTimeout(() => this.handleLoadingError(), 5000);
    fetch('data/projects.json')
      .then((response: Response) => {
        return response.json();
      })
      .then((projects: Project[]) => {
        clearTimeout(timerId);
        this.setState({ loadComplete: true, errorDuringLoad: false, projects: projects });
      })
      .catch((error) => {
        console.error(error);
        clearTimeout(timerId);
        this.handleLoadingError();
      });
  }

  handleLoadingError(): void {
    this.setState({ loadComplete: true, errorDuringLoad: true });
  }

  renderProjects(): React.JSX.Element {
    return (
      <div className="row">
        {this.state.projects
          .sort((a, b) => a.displayId - b.displayId)
          .map((project) => (
            <ProjectOverview key={project.id} project={project} onClick={this.props.setProject} />
          ))}
      </div>
    );
  }

  renderLoading(): React.JSX.Element {
    return <Loader text="Loading projects..." />;
  }

  renderError(): React.JSX.Element {
    return <p>Something went wrong while loading projects, please try again later.</p>;
  }

  render(): React.JSX.Element {
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

    return <div className="projectList">{content}</div>;
  }
}

export default ProjectList;
