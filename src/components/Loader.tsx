import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
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
        <Spinner animation='border' variant='light' role='status' />
        <div className='loaderText'>{this.props.text}</div>
      </>
    );
  }
}

export default hot(module)(Loader);
