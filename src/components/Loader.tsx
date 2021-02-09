import { hot } from 'react-hot-loader';
import React from 'react';
import '../css/Loader.scss';

interface Props {
  text: string;
}

class Loader extends React.Component<Props> {
  render() {
    return (
      <>
        <div className="loaderText">
          <p>{this.props.text}</p>
        </div>
        <div className="loader">
          <div />
          <div />
          <div />
        </div>
      </>
    );
  }
}

export default hot(module)(Loader);
