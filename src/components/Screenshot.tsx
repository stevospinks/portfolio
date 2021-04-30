import domtoimage from 'dom-to-image';
import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/Screenshot.scss';
import { LocalStorageObject } from '../interfaces/local-storage-object';

interface Props {
  id: string;
  screenshotCount: number;
  generateScreenshot?: boolean;
  className?: string;
}

interface State {
  screenshot?: string;
  screenshotsTaken?: number;
}

class Screenshot extends React.Component<Props, State> {
  private readonly loadingScreenshot = 'images/loading-screenshot.jpg';
  private readonly localStorageName = `${this.props.id.toLowerCase().replace(' ', '-')}-screenshot`;
  private readonly localStorageValidity = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  render() {
    const screenshot = this.loadScreenshot();

    if (!screenshot) {
      return <></>;
    }

    return <img className={this.props.className} src={screenshot} />;
  }

  private loadScreenshot(): string {
    if (!this.state?.screenshot) {
      const valueJson = localStorage.getItem(this.localStorageName);

      // No screenshot is processing, and one already exists, so use that.
      if (valueJson) {
        const valueObject = JSON.parse(valueJson) as LocalStorageObject;
        const screenshotInDate = Date.now() - valueObject.timestamp < this.localStorageValidity;

        // If it is out of date, but not going to be regenerated, display it anyway
        if (screenshotInDate || !this.props.generateScreenshot) {
          return valueObject.content;
        }
      }
    }

    if (!this.props.generateScreenshot) {
      return '';
    }

    if (!this.state?.screenshotsTaken || this.state?.screenshotsTaken < this.props.screenshotCount) {
      void new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
        this.generateScreenshot();
      });
    }

    if (this.state?.screenshot) {
      // Save the screenshot for use in the rest of the session
      const valueObject: LocalStorageObject = { timestamp: Date.now(), content: this.state.screenshot };
      localStorage.setItem(this.localStorageName, JSON.stringify(valueObject));
      return this.state.screenshot;
    }

    return this.loadingScreenshot;
  }

  private generateScreenshot(): void {
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
          screenshot: canvas16by9.toDataURL(),
          screenshotsTaken: this.state?.screenshotsTaken ? this.state.screenshotsTaken + 1 : 1
        });
      };
      img.src = dataUrl;
    });
  }
}

export default hot(module)(Screenshot);
