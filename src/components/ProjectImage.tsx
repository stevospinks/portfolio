import domtoimage from 'dom-to-image';
import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/ProjectImage.scss';
import { LocalStorageObject } from '../interfaces/local-storage-object';

interface Props {
  projectName: string;
  imageSource: string;
  generateScreenshotIfRequested?: boolean;
  className?: string;
}

interface State {
  imageSourceOverride?: string;
  screenshotsTaken?: number;
}

class ProjectImage extends React.Component<Props, State> {
  private readonly loadingScreenshot = 'project-images/loading-screenshot.jpg';
  private readonly localStorageName = `${this.props.projectName}-screenshot`;
  private readonly localStorageValidity = 24 * 60 * 60 * 1000; // 1 day in milliseconds

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
    if (!this.state?.imageSourceOverride) {
      const valueJson = localStorage.getItem(this.localStorageName);
      if (valueJson) {
        // No screenshot is processing, and one already exists, so use that.
        const valueObject = JSON.parse(valueJson) as LocalStorageObject;
        const screenshotInDate = Date.now() - valueObject.timestamp < this.localStorageValidity;

        if (screenshotInDate || !this.props.generateScreenshotIfRequested) {
          // If it is out of date, but not going to be regenerated, display it anyway
          return valueObject.content;
        }
      }
    }

    if (!this.props.generateScreenshotIfRequested) {
      return '';
    }

    if (!this.state?.screenshotsTaken || this.state?.screenshotsTaken < screenshotsToTake) {
      void new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
        this.generateScreenshot();
      });
    }

    if (this.state?.imageSourceOverride) {
      // Save the screenshot for use in the rest of the session
      const valueObject: LocalStorageObject = { content: this.state.imageSourceOverride, timestamp: Date.now() };
      localStorage.setItem(this.localStorageName, JSON.stringify(valueObject));
      return this.state.imageSourceOverride;
    }

    return this.loadingScreenshot;
  }

  render() {
    let imageSource = this.props.imageSource;
    if (imageSource.startsWith('screenshot')) {
      const screenshotCount = Number.parseInt(imageSource.replace('screenshot', ''));
      imageSource = this.loadScreenshot(Number.isInteger(screenshotCount) ? screenshotCount : 1);

      if (!imageSource) {
        return <></>;
      }
    }

    return <img className={this.props.className} src={imageSource} />;
  }
}

export default hot(module)(ProjectImage);
