import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { hot } from 'react-hot-loader';
import '../css/ProjectDetails.scss';
import { EmptyState } from '../interfaces/empty';
import { Project } from '../interfaces/project';
import LightYoutube from './LightYoutube';
import ProjectImage from './ProjectImage';

interface Props {
  project: Project;
  goBack: () => void;
}

class ProjectDetails extends React.Component<Props, EmptyState> {
  render() {
    const project = this.props.project;
    return (
      <>
        <Row>
          <Col sm={12} md={10} lg={8} xl={6}>
            <ProjectImage className='img-fluid rounded' imageSource={this.props.project.imageSource} />
          </Col>
        </Row>
        <Row>
          <Col className='description'>
            {project.details.map((detailParagraph, index) => (
              <p key={index}>{detailParagraph}</p>
            ))}
          </Col>
        </Row>
        {project.videoSource && (
          <Row>
            <Col sm={12} md={10} lg={8} xl={6}>
              <LightYoutube videoId={project.videoSource} />
            </Col>
          </Row>
        )}
        <Row>
          <Button variant='outline-light' onClick={this.props.goBack}>
            Back
          </Button>
        </Row>
      </>
    );
  }
}

export default hot(module)(ProjectDetails);
