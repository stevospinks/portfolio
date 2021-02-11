import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/Header.scss';
import { EmptyState } from '../interfaces/empty';

interface Props {
  subheading?: string;
}

class Header extends React.Component<Props, EmptyState> {
  render() {
    return (
      <>
        <p className='headline'>Stephen Spinks</p>
        <hr className='separator' />
        <p className='subheading'>
          {this.props.subheading || [
            'Computer Games Development 1',
            <sup key='none'>st</sup>,
            ' class honours graduate from the University of Glamorgan (now University of South Wales).'
          ]}
        </p>
      </>
    );
  }
}

export default hot(module)(Header);
