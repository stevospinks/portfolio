import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
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
        <Row>
          <LightYoutube videoId={this.props.project.videoSource} width={560} height={315} />
        </Row>
        <Button variant='outline-light' onClick={this.props.goBack}>
          Back
        </Button>
      </>
    );
  }
}

export default hot(module)(ProjectDetails);
