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
          <a href='https://github.com/stevospinks' target='_blank' rel='noopener noreferrer'>
            <FaGithubSquare className='icon' title='GitHub' />
          </a>
          &nbsp;
          <a href='https://www.linkedin.com/in/stephenspinks' target='_blank' rel='noopener noreferrer'>
            <FaLinkedin className='icon' title='LinkedIn' />
          </a>
          &nbsp;
          <a href='https://twitter.com/stevospinks/' target='_blank' rel='noopener noreferrer'>
            <FaTwitterSquare className='icon' title='Twitter' />
          </a>
          &nbsp;
          <a href='mailto:stephen@stephenspinks.com' target='_blank' rel='noopener noreferrer'>
            <FaEnvelopeSquare className='icon' title='Direct E-mail' />
          </a>
        </p>
      </div>
    );
  }
}

export default hot(module)(Contact);
