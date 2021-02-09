import { hot } from 'react-hot-loader';
import React from 'react';
import '../css/ProjectOverview.scss';
import { ProjectInfo } from '../data/interfaces';

interface Props {
  onClick: (data: ProjectInfo) => void,
  data: ProjectInfo,
}

class ProjectOverview extends React.Component<Props> {
  render() {
    return (
      <div className="projectContainer" onClick={() => this.props.onClick(this.props.data)}>
        <p>{this.props.data.name}</p>
        <div className="imageContainer">
          <img src={this.props.data.imageSource} />
        </div>
        <p>{this.props.data.blurb}</p>
      </div>
    );
  }
}

export default hot(module)(ProjectOverview);
