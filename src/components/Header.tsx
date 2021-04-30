import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/Header.scss';
import { EmptyProps, EmptyState } from '../interfaces/empty';

class Header extends React.Component<EmptyProps, EmptyState> {
  render() {
    return <h1>Stephen Spinks</h1>;
  }
}

export default hot(module)(Header);
