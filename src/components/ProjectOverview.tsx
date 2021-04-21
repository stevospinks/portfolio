import html2canvas from 'html2canvas';
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
    void html2canvas(document.body).then((canvas) => {
      const canvas16by9 = document.createElement('canvas');
      const canvas16by9Context = canvas16by9.getContext('2d');
      if (!canvas16by9Context) {
        return;
      }

      const maxWidth = 1600;
      const width = Math.min(canvas.width, maxWidth);
      const minHeight = width * (9 / 16);
      if (canvas.height > minHeight) {
        canvas16by9.width = width;
        canvas16by9.height = minHeight;
      } else {
        const height = canvas.height; // - 110; // Remove the white line that is sometimes generated at the bottom of the image
        canvas16by9.width = height * (16 / 9);
        canvas16by9.height = height;
      }

      const cropPositionTop = -20;
      const cropPositionLeft = -(canvas.width - canvas16by9.width) / 2;

      canvas16by9Context.drawImage(canvas, cropPositionLeft, cropPositionTop);
      this.setState({
        imageSourceOverride: canvas16by9.toDataURL(),
        screenshotsTaken: this.state?.screenshotsTaken ? this.state.screenshotsTaken + 1 : 1
      });
    });
  }

  showScreenshot(): string {
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
    return (
      <Col className='col-padding' sm={12} md={6}>
        <Card
          bg='dark'
          border='light'
          className={this.props.project.clickable ? 'clickable' : ''}
          onClick={() => this.props.onClick(this.props.project)}
        >
          <Card.Img
            variant='top'
            src={
              this.props.project.imageSource === 'screenshot' ? this.showScreenshot() : this.props.project.imageSource
            }
          />
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
