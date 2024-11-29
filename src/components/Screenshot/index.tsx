import domtoimage from 'dom-to-image';
import React, { ReactElement } from 'react';
import { LocalStorageObject } from '../../common/interfaces/local-storage-object';

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
  private readonly localStorageValidity = 1; // 24 * 60 * 60 * 1000; // 1 day in milliseconds

  render(): ReactElement {
    const screenshot = this.loadScreenshot();

    if (!screenshot) {
      return <></>;
    }

    return <img className={this.props.className} src={screenshot} />;
  }

  private loadScreenshot(): string {
    const existingScreenshot = this.getScreenshotFromStorage();
    if (existingScreenshot) {
      return existingScreenshot;
    }

    if (!this.props.generateScreenshot) {
      return '';
    }

    if (!this.state?.screenshotsTaken || this.state?.screenshotsTaken < this.props.screenshotCount) {
      // Wait for the website to load if this is the first screenshot
      const timeout = !this.state?.screenshotsTaken ? 1000 : 50;

      new Promise((resolve) => setTimeout(resolve, timeout))
        .then(() => this.generateScreenshot())
        .catch((error) => console.error(error));
    }

    if (this.state?.screenshot) {
      // Save the screenshot for use in the rest of the session
      const valueObject: LocalStorageObject = { timestamp: Date.now(), content: this.state.screenshot };
      localStorage.setItem(this.localStorageName, JSON.stringify(valueObject));
      return this.state.screenshot;
    }

    return this.loadingScreenshot;
  }

  private getScreenshotFromStorage(): string | undefined {
    if (this.state?.screenshot) {
      // A screenshot is currently being processed
      return;
    }

    const valueJson = localStorage.getItem(this.localStorageName);
    if (!valueJson) {
      // No screenshot in local storage
      return;
    }

    const valueObject = JSON.parse(valueJson) as LocalStorageObject;
    const screenshotInDate = Date.now() - valueObject.timestamp < this.localStorageValidity;
    if (!screenshotInDate && this.props.generateScreenshot) {
      // Screenshot is out of date and will be regenerated
      return;
    }

    return valueObject.content;
  }

  private generateScreenshot(): void {
    domtoimage
      .toPng(document.body)
      .then((dataUrl: string) => {
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

        const cropX = -(window.innerWidth - canvas16by9.width) / 2;
        const cropY = 0;

        const img = new Image();
        img.onload = () => {
          canvas16by9Context.drawImage(img, cropX, cropY);
          this.setState({
            screenshot: canvas16by9.toDataURL(),
            screenshotsTaken: this.state?.screenshotsTaken ? this.state.screenshotsTaken + 1 : 1
          });
        };
        img.src = dataUrl;
      })
      .catch((error) => console.error(error));
  }
}

export default Screenshot;
