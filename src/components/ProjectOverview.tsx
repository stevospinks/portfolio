import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { hot } from 'react-hot-loader';
import '../css/ProjectOverview.scss';
import { EmptyState } from '../interfaces/empty';
import { Project } from '../interfaces/project';
import ProjectImage from './ProjectImage';

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
      <Col className='column' sm={12} md={6}>
        <Card
          bg='dark'
          border='light'
          tabIndex={project.displayId}
          className={project.details.length > 0 ? 'clickable' : ''}
          onClick={() => this.openProject(project)}
          onKeyPress={(event: React.KeyboardEvent<HTMLDivElement>) => this.handleKeypress(event, project)}
        >
          <ProjectImage
            className='card-img-top'
            imageSource={this.props.project.imageSource}
            renderScreenshotIfRequested={true}
          />
          <Card.Body>
            <Card.Title>{project.name}</Card.Title>
            <Card.Text>{project.blurb}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default hot(module)(ProjectOverview);
