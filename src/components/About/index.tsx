import React from 'react';
import { EmptyProps, EmptyState } from '../../common/interfaces/empty';
import './style.scss';

class About extends React.Component<EmptyProps, EmptyState> {
  yearsExperience(): number {
    const experienceStart = new Date('2012-10-01');
    const ageDifMs = Date.now() - experienceStart.getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  render(): React.JSX.Element {
    return (
      <>
        <img className="img-fluid rounded avatar" src="images/avatar.png" />
        <h4>
          Full-stack senior software engineer with over {this.yearsExperience()} years&apos;
          professional experience, based in the East of England.
          <br />
          BSc (Hons) in Computer Games Development (1<sup key="none">st</sup> Class), using C++.
          <br />
          A quick learner, highly capable, and enthusiastic about adopting new technologies.
          <br />
          <br />
          In-depth knowledge across the Microsoft .NET stack, complemented by frontend technologies
          such as Angular 2+, TypeScript, HTML, and CSS. Demonstrable success in software
          development, implementing unit and integration testing, and delivering performance
          improvements.
          <br />
          <br />
          Extensive experience in agile methodologies, including the facilitation of Scrum
          ceremonies such as stand-ups, task breakdowns, retrospectives, and product demonstrations.
          Previously certified as a Scrum Master with the Scrum Alliance.
          <br />
          <br />
          Demonstrated ability to mentor and support developers, focusing on both technical
          progression and career development. Skilled in stakeholder engagement, with experience of
          working in customer-facing roles and effectively communicating complex technical concepts
          to audiences with varying levels of expertise.
        </h4>
      </>
    );
  }
}

export default About;
