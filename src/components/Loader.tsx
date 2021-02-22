import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/Loader.scss';
import { EmptyState } from '../interfaces/empty';

interface Props {
  text: string;
}

class Loader extends React.Component<Props, EmptyState> {
  render() {
    return (
      <>
        <div className='loaderText'>
          <p>{this.props.text}</p>
        </div>
        <div className='loader'>
          <div />
          <div />
          <div />
        </div>
      </>
    );
  }
}

export default hot(module)(Loader);
