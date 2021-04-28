import { faGithubSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          <a href='https://github.com/stevospinks' target='_blank' rel='noopener noreferrer' className='icon'>
            <FontAwesomeIcon icon={faGithubSquare} title='GitHub' />
          </a>
          <a href='https://www.linkedin.com/in/sspinks' target='_blank' rel='noopener noreferrer' className='icon'>
            <FontAwesomeIcon icon={faLinkedin} title='LinkedIn' />
          </a>
          <a href='https://twitter.com/stevospinks/' target='_blank' rel='noopener noreferrer' className='icon'>
            <FontAwesomeIcon icon={faTwitterSquare} title='Twitter' />
          </a>
          <a href='mailto:stephen@stephenspinks.com' target='_blank' rel='noopener noreferrer' className='icon'>
            <FontAwesomeIcon icon={faEnvelopeSquare} title='Direct E-mail' />
          </a>
        </p>
      </div>
    );
  }
}

export default hot(module)(Contact);
