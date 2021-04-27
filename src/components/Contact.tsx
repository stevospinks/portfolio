import React from 'react';
import { hot } from 'react-hot-loader';
import { FaEnvelopeSquare, FaGithubSquare, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';
import '../css/Contact.scss';
import { EmptyProps, EmptyState } from '../interfaces/empty';

class Contact extends React.Component<EmptyProps, EmptyState> {
  render() {
    return (
      <div className='contact'>
        <p>
          Contact Me:
          <br />
          <a href='https://github.com/stevospinks' target='_blank' rel='noopener noreferrer' className='icon'>
            <FaGithubSquare title='GitHub' />
          </a>
          <a href='https://www.linkedin.com/in/sspinks' target='_blank' rel='noopener noreferrer' className='icon'>
            <FaLinkedin title='LinkedIn' />
          </a>
          <a href='https://twitter.com/stevospinks/' target='_blank' rel='noopener noreferrer' className='icon'>
            <FaTwitterSquare title='Twitter' />
          </a>
          <a href='mailto:stephen@stephenspinks.com' target='_blank' rel='noopener noreferrer' className='icon'>
            <FaEnvelopeSquare title='Direct E-mail' />
          </a>
        </p>
      </div>
    );
  }
}

export default hot(module)(Contact);
