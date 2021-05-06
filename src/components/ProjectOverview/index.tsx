import React from 'react';
import { hot } from 'react-hot-loader';
import { EmptyState } from '../../common/interfaces/empty';
import { Project } from '../../common/interfaces/project';
import ProjectImage from '../ProjectImage';
import './style.scss';

interface Props {
  onClick: (project: Project) => void;
  project: Project;
}

class ProjectOverview extends React.Component<Props, EmptyState> {
  private handleKeypress(event: React.KeyboardEvent<HTMLDivElement>, project: Project) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.openProject(project);
      event.preventDefault();
    }
  }

  private openProject(project: Project) {
    if (project.details.length > 0) {
      this.props.onClick(project);
    }
  }

  render() {
    const project = this.props.project;
    return (
      <div className='column col-xxl-4 col-xl-5 col-md-6 col-sm-6 col-10'>
        <div
          className={'card bg-dark border-light' + (project.details.length > 0 ? ' clickable' : '')}
          tabIndex={project.displayId}
          onClick={() => this.openProject(project)}
          onKeyPress={(event: React.KeyboardEvent<HTMLDivElement>) => this.handleKeypress(event, project)}
        >
          <ProjectImage
            className='card-img-top'
            imageSource={this.props.project.imageSource}
            projectName={this.props.project.name}
            generateScreenshotIfRequested={true}
          />
          <div className='card-body'>
            <div className='card-title h5'>{project.name}</div>
            <div className='card-text'>{project.blurb}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(ProjectOverview);
