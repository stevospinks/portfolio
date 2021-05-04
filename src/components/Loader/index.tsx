import React from 'react';
import { hot } from 'react-hot-loader';
import { EmptyState } from '../../common/interfaces/empty';
import './style.scss';

interface Props {
  text: string;
}

class Loader extends React.Component<Props, EmptyState> {
  render() {
    return (
      <>
        <div className='spinner-border text-light' role='status'></div>
        <div className='loaderText'>{this.props.text}</div>
      </>
    );
  }
}

export default hot(module)(Loader);
