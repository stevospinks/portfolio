import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/ProjectOverview.scss';
import { EmptyState } from '../interfaces/empty';
import { Project } from '../interfaces/project';

interface Props {
  onClick: (project: Project) => void;
  project: Project;
}

class ProjectOverview extends React.Component<Props, EmptyState> {
  render() {
    return (
      <div className='projectContainer' onClick={() => this.props.onClick(this.props.project)}>
        <p>{this.props.project.name}</p>
        <div className='imageContainer'>
          <img src={this.props.project.imageSource} />
        </div>
        <p>{this.props.project.blurb}</p>
      </div>
    );
  }
}

export default hot(module)(ProjectOverview);
