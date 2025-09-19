import { faGithubSquare } from '@fortawesome/free-brands-svg-icons/faGithubSquare';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons/faEnvelopeSquare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { EmptyProps, EmptyState } from '../../common/interfaces/empty';
import './style.scss';

class Contact extends React.Component<EmptyProps, EmptyState> {
  render(): React.JSX.Element {
    return (
      <div className="contact fa-width-auto">
        <p>
          Contact Me:
          <br />
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
          <a
            href="https://github.com/stevospinks"
            target="_blank"
            rel="noopener noreferrer"
            className="icon"
          >
            <FontAwesomeIcon icon={faGithubSquare} title="GitHub" />
          </a>
        </p>
      </div>
    );
  }
}

export default Contact;
