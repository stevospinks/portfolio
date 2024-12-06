import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import './style.scss';

interface Props {
  videoId: string;
}

interface State {
  loadVideo: boolean;
}

class LightYoutube extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { loadVideo: false };
  }

  showVideo(): void {
    this.setState({ loadVideo: true });
  }

  displayFullYoutube(): ReactElement {
    const source = `https://www.youtube.com/embed/${this.props.videoId}?autoplay=1&modestbranding=1&rel=0`;
    return (
      <div className="ratio ratio-16x9">
        <iframe src={source} allowFullScreen className="rounded" />
      </div>
    );
  }

  displayLightYoutube(): ReactElement {
    const source = `https://img.youtube.com/vi/${this.props.videoId}/sddefault.jpg`;
    return (
      <div className="light-youtube" onClick={() => this.showVideo()}>
        <div className="ratio ratio-16x9 rounded">
          <img src={source} />
          <FontAwesomeIcon icon={faYoutube} className="play-button" />
          <FontAwesomeIcon icon={faPlay} className="play-button-centre" />
        </div>
      </div>
    );
  }

  render(): ReactElement {
    if (this.state.loadVideo) {
      return this.displayFullYoutube();
    }

    return this.displayLightYoutube();
  }
}

export default LightYoutube;
