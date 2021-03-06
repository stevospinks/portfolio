import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/ProjectDetails.scss';
import { EmptyState } from '../interfaces/empty';
import { Project } from '../interfaces/project';
import LightYoutube from './LightYoutube';

interface Props {
  project: Project;
  goBack: () => void;
}

class ProjectDetails extends React.Component<Props, EmptyState> {
  render() {
    return (
      <>
        <p>{this.props.project.details}</p>
        <LightYoutube videoId={this.props.project.videoSource} width={560} height={315} />
        <button onClick={this.props.goBack}>Back</button>
      </>
    );
  }
}

export default hot(module)(ProjectDetails);
