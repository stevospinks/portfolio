import domtoimage from 'dom-to-image';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { hot } from 'react-hot-loader';
import '../css/ProjectOverview.scss';
import { Project } from '../interfaces/project';

interface Props {
  onClick: (project: Project) => void;
  project: Project;
}

interface State {
  imageSourceOverride?: string;
  screenshotsTaken?: number;
}

const loadingScreenshot = 'project-images/loading-screenshot-16x9-small.jpg';

class ProjectOverview extends React.Component<Props, State> {
  generateScreenshot() {
    void domtoimage.toPng(document.body).then((dataUrl) => {
      const canvas16by9 = document.createElement('canvas');
      const canvas16by9Context = canvas16by9.getContext('2d');
      if (!canvas16by9Context) {
        return;
      }

      const minHeight = window.innerWidth * (9 / 16);
      if (window.innerHeight > minHeight) {
        canvas16by9.width = window.innerWidth;
        canvas16by9.height = minHeight;
      } else {
        canvas16by9.width = window.innerHeight * (16 / 9);
        canvas16by9.height = window.innerHeight;
      }

      const cropPositionTop = 0;
      const cropPositionLeft = -(window.innerWidth - canvas16by9.width) / 2;

      const img = new Image();
      img.onload = () => {
        canvas16by9Context.drawImage(img, cropPositionLeft, cropPositionTop);
        this.setState({
          imageSourceOverride: canvas16by9.toDataURL(),
          screenshotsTaken: this.state?.screenshotsTaken ? this.state.screenshotsTaken + 1 : 1
        });
      };
      img.src = dataUrl;
    });
  }

  loadScreenshot(): string {
    if (!this.state?.screenshotsTaken || this.state?.screenshotsTaken < 2) {
      void new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
        this.generateScreenshot();
      });
    }

    if (this.state?.imageSourceOverride) {
      return this.state.imageSourceOverride;
    }

    return loadingScreenshot;
  }

  render() {
    const project = this.props.project;
    return (
      <Col className='col-padding' sm={12} md={6}>
        <Card
          bg='dark'
          border='light'
          className={project.clickable ? 'clickable' : ''}
          onClick={() => this.props.onClick(project)}
        >
          <Card.Img
            variant='top'
            src={project.imageSource === 'screenshot' ? this.loadScreenshot() : project.imageSource}
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
