import domtoimage from 'dom-to-image';
import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/ProjectImage.scss';

interface Props {
  imageSource: string;
  renderScreenshotIfRequested?: boolean;
  className?: string;
}

interface State {
  imageSourceOverride?: string;
  screenshotsTaken?: number;
}

const loadingScreenshot = 'project-images/loading-screenshot-16x9-small.jpg';

class ProjectImage extends React.Component<Props, State> {
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

  loadScreenshot(screenshotsToTake: number): string {
    if (!this.state?.screenshotsTaken || this.state?.screenshotsTaken < screenshotsToTake) {
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
    let imageSource = this.props.imageSource;
    if (imageSource.startsWith('screenshot')) {
      if (!this.props.renderScreenshotIfRequested) {
        return <></>;
      }

      const screenshotCount = Number.parseInt(imageSource.replace('screenshot', ''));
      imageSource = this.loadScreenshot(Number.isInteger(screenshotCount) ? screenshotCount : 1);
    }

    return <img className={this.props.className} src={imageSource} />;
  }
}

export default hot(module)(ProjectImage);
