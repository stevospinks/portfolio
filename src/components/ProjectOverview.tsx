import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
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
      <Col className='col-padding' sm={12} md={6}>
        <Card
          bg='dark'
          border='light'
          className={this.props.project.clickable ? 'clickable' : ''}
          onClick={() => this.props.onClick(this.props.project)}
        >
          <Card.Img variant='top' src={this.props.project.imageSource} />
          <Card.Body>
            <Card.Title>{this.props.project.name}</Card.Title>
            <Card.Text>{this.props.project.blurb}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default hot(module)(ProjectOverview);
