import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/Header.scss';
import { EmptyState } from '../interfaces/empty';

interface Props {
  subheading?: string;
}

class Header extends React.Component<Props, EmptyState> {
  yearsExperience(): number {
    const experienceStart = new Date('2012-10-01');
    const ageDifMs = Date.now() - experienceStart.getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  render() {
    return (
      <>
        <h1>Stephen Spinks</h1>
        <h4>
          {this.props.subheading || (
            <>
              Full-stack software engineer with over {this.yearsExperience()} years&apos; experience, based in the East
              of England.
              <br />
              BSc (Hons) Computer Games Development (1<sup key='none'>st</sup> Class).
              <br />
              Currently working with C# (.Net &amp; .Net Core), React &amp; Angular.
            </>
          )}
        </h4>
      </>
    );
  }
}

export default hot(module)(Header);
