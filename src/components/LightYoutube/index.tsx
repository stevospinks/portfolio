import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { hot } from 'react-hot-loader';
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

  showVideo() {
    this.setState({ loadVideo: true });
  }

  displayFullYoutube() {
    const source = `https://www.youtube.com/embed/${this.props.videoId}?autoplay=1&modestbranding=1&rel=0`;
    return (
      <div className='embed-responsive embed-responsive-16by9 rounded'>
        <iframe className='embed-responsive-item' src={source} allowFullScreen />
      </div>
    );
  }

  displayLightYoutube() {
    const source = `https://img.youtube.com/vi/${this.props.videoId}/sddefault.jpg`;
    return (
      <div className='light-youtube' onClick={() => this.showVideo()}>
        <div className='embed-responsive embed-responsive-16by9 rounded'>
          <img className='embed-responsive-item' src={source} />
          <FontAwesomeIcon icon={faYoutube} className='play-button' />
          <FontAwesomeIcon icon={faPlay} className='play-button-centre' />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.loadVideo) {
      return this.displayFullYoutube();
    }

    return this.displayLightYoutube();
  }
}

export default hot(module)(LightYoutube);
