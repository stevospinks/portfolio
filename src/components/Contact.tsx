import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/Contact.scss';
import { EmptyProps, EmptyState } from '../interfaces/empty';

class Contact extends React.Component<EmptyProps, EmptyState> {
  render() {
    return (
      <div className='contact'>
        <p>
          Contact Me:
          <br />
          <a href='https://twitter.com/stevospinks/' target='_blank' rel='noopener noreferrer'>
            Twitter
          </a>
          {' | '}
          <a href='mailto:stephen@stephenspinks.com' target='_blank' rel='noopener noreferrer'>
            Direct E-mail
          </a>
          {' | '}
          <a href='https://www.linkedin.com/in/stephenspinks' target='_blank' rel='noopener noreferrer'>
            LinkedIn
          </a>
        </p>
      </div>
    );
  }
}

export default hot(module)(Contact);
