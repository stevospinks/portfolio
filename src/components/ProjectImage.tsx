import React from 'react';
import { hot } from 'react-hot-loader';
import { EmptyState } from '../interfaces/empty';
import Screenshot from './Screenshot';

interface Props {
  projectName: string;
  imageSource: string;
  generateScreenshotIfRequested?: boolean;
  className?: string;
}

class ProjectImage extends React.Component<Props, EmptyState> {
  render() {
    if (this.props.imageSource.startsWith('screenshot')) {
      const screenshotCount = Number.parseInt(this.props.imageSource.replace('screenshot', ''));
      return (
        <Screenshot
          id={this.props.projectName}
          className={this.props.className}
          generateScreenshot={this.props.generateScreenshotIfRequested}
          screenshotCount={Number.isInteger(screenshotCount) ? screenshotCount : 1}
        />
      );
    }

    return <img className={this.props.className} src={`images/project-images/${this.props.imageSource}`} />;
  }
}

export default hot(module)(ProjectImage);
