import { hot } from 'react-hot-loader';
import React from 'react';
import Header from './Header';
import Projects from './Projects';
import Project from './Project';
import Contact from './Contact';
import '../css/App.scss';
import { ProjectInfo } from '../data/interfaces';

interface State {
  projectToDisplay?: ProjectInfo
}

class App extends React.Component<unknown, State> {
  setProjectToDisplay(project: ProjectInfo) {
    this.setState({ projectToDisplay: project });
  }

  clearProject() {
    this.setState({ projectToDisplay: undefined });
  }

  renderHomepage() {
    return (
      <>
        <div className="bgimg" />
        <div className="container">
          <Header />
          <Projects setProject={project => this.setProjectToDisplay(project)} />
          <Contact />
        </div>
      </>
    );
  }

  renderProject(project: ProjectInfo) {
    return (
      <>
        <div className="bgimg" />
        <div className="container">
          <Header subheading={project.name} />
          <Project project={project} goBack={() => this.clearProject()} />
          <Contact />
        </div>
      </>
    );
  }

  render() {
    window.scrollTo(0, 0);
    if (!this.state?.projectToDisplay || !this.state.projectToDisplay.clickable) {
      return this.renderHomepage();
    }

    return this.renderProject(this.state.projectToDisplay);
  }
}

export default hot(module)(App);
