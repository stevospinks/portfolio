import React from 'react';
import Col from 'react-bootstrap/Col';
import { hot } from 'react-hot-loader';
import { FaYoutube } from 'react-icons/fa';
import { MdPlayArrow } from 'react-icons/md';
import '../css/LightYoutube.scss';

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
    return (
      <div className='embed-responsive embed-responsive-16by9'>
        <iframe
          frameBorder='0'
          scrolling='no'
          marginHeight={0}
          marginWidth={0}
          allowFullScreen
          className='embed-responsive-item'
          src={'https://www.youtube.com/embed/' + this.props.videoId + '?autoplay=1&modestbranding=1&rel=0'}
        />
      </div>
    );
  }

  displayLightYoutube() {
    return (
      <div className='light-youtube embed-responsive embed-responsive-16by9'>
        <div className='embed-responsive-item'>
          <img src={'https://img.youtube.com/vi/' + this.props.videoId + '/sddefault.jpg'}></img>
        </div>
        <FaYoutube className='play-button' />
        <MdPlayArrow className='play-button-centre' />
      </div>
    );
  }

  render() {
    if (this.props.videoId === '') {
      return <></>;
    }

    return (
      <Col sm={12} md={10} lg={8} xl={6} onClick={() => this.showVideo()}>
        {this.state.loadVideo ? this.displayFullYoutube() : this.displayLightYoutube()}
      </Col>
    );
  }
}

export default hot(module)(LightYoutube);
