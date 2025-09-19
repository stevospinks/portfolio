import React, { ReactElement } from 'react';
import { EmptyProps, EmptyState } from '../../common/interfaces/empty';
import './style.scss';

class Header extends React.Component<EmptyProps, EmptyState> {
  render(): ReactElement {
    return <h1>Stephen Spinks</h1>;
  }
}

export default Header;
