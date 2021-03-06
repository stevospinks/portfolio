import React from 'react';
import { hot } from 'react-hot-loader';
import { FaYoutube } from 'react-icons/fa';
import { MdPlayArrow } from 'react-icons/md';
import '../css/LightYoutube.scss';

interface Props {
  videoId: string;
  width: number;
  height: number;
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
      <iframe
        frameBorder='0'
        scrolling='no'
        marginHeight={0}
        marginWidth={0}
        width={this.props.width}
        height={this.props.height}
        allowFullScreen
        src={'https://www.youtube.com/embed/' + this.props.videoId + '?autoplay=1&modestbranding=1&rel=0'}
      />
    );
  }

  displayLightYoutube() {
    return (
      <>
        <img src={'https://i.ytimg.com/vi/' + this.props.videoId + '/hqdefault.jpg'}></img>
        <FaYoutube className='play-button' />
        <MdPlayArrow className='play-button-centre' />
      </>
    );
  }

  render() {
    if (this.props.videoId === '') {
      return <></>;
    }

    return (
      <div
        className='youtube-container'
        style={{ width: this.props.width, height: this.props.height }}
        onClick={() => this.showVideo()}
      >
        {this.state.loadVideo ? this.displayFullYoutube() : this.displayLightYoutube()}
      </div>
    );
  }
}

export default hot(module)(LightYoutube);
