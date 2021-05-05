import React from 'react';
import { hot } from 'react-hot-loader';
import { EmptyProps, EmptyState } from '../../common/interfaces/empty';
import './style.scss';

class Header extends React.Component<EmptyProps, EmptyState> {
  render() {
    return <h1>Stephen Spinks</h1>;
  }
}

export default hot(module)(Header);
