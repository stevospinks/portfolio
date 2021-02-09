import { hot } from 'react-hot-loader';
import React from 'react';
import '../css/Project.scss';
import { ProjectInfo } from '../data/interfaces';

interface Props {
  project: ProjectInfo
  goBack: () => void
}

class Project extends React.Component<Props> {
  render() {
    return (
      <>
        <p>{this.props.project.details}</p>
        <div className="youtube">
          <iframe
            hidden={this.props.project.videoSource === ''}
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            width="560"
            height="315"
            allowFullScreen
            src={'https://www.youtube.com/embed/' + this.props.project.videoSource + '?modestbranding=1&rel=0'}
          />
        </div>
        <button onClick={this.props.goBack}>Back</button>
      </>
    );
  }
}

export default hot(module)(Project);
