import { faGithubSquare } from '@fortawesome/free-brands-svg-icons/faGithubSquare';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons/faEnvelopeSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { EmptyProps, EmptyState } from '../../common/interfaces/empty';
import './style.scss';

class Contact extends React.Component<EmptyProps, EmptyState> {
  render(): ReactElement {
    return (
      <div className="contact">
        <p>
          Contact Me:
          <br />
          <a
            href="https://github.com/stevospinks"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <FontAwesomeIcon icon={faGithubSquare} title="GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/in/sspinks"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <FontAwesomeIcon icon={faLinkedin} title="LinkedIn" />
          </a>
          <a
            href="mailto:stephen@stephenspinks.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <FontAwesomeIcon icon={faEnvelopeSquare} title="Direct E-mail" />
          </a>
        </p>
      </div>
    );
  }
}

export default Contact;
