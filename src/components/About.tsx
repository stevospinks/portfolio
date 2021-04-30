import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/About.scss';
import { EmptyProps, EmptyState } from '../interfaces/empty';

class About extends React.Component<EmptyProps, EmptyState> {
  yearsExperience(): number {
    const experienceStart = new Date('2012-10-01');
    const ageDifMs = Date.now() - experienceStart.getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  render() {
    return (
      <>
        <img className='img-fluid rounded avatar' src='images/avatar.png' />
        <h4>
          Full-stack software engineer with over {this.yearsExperience()} years&apos; experience, based in the East of
          England.
          <br />
          BSc (Hons) Computer Games Development (1<sup key='none'>st</sup> Class).
          <br />
          Currently working with C# (.Net &amp; .Net Core), React &amp; Angular.
        </h4>
      </>
    );
  }
}

export default hot(module)(About);
