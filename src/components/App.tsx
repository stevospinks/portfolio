import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/App.scss';
import { EmptyProps } from '../interfaces/empty';
import { Project } from '../interfaces/project';
import Contact from './Contact';
import Header from './Header';
import ProjectDetails from './ProjectDetails';
import Projects from './Projects';

interface State {
  projectToDisplay?: Project;
}

class App extends React.Component<EmptyProps, State> {
  setProjectToDisplay(project: Project) {
    this.setState({ projectToDisplay: project });
  }

  clearProject() {
    this.setState({ projectToDisplay: undefined });
  }

  renderHomepage() {
    return (
      <>
        <div className='bgimg' />
        <div className='container'>
          <Header />
          <Projects setProject={(project) => this.setProjectToDisplay(project)} />
          <Contact />
        </div>
      </>
    );
  }

  renderProject(project: Project) {
    return (
      <>
        <div className='bgimg' />
        <div className='container'>
          <Header subheading={project.name} />
          <ProjectDetails project={project} goBack={() => this.clearProject()} />
          <Contact />
        </div>
      </>
    );
  }

  render() {
    window.scrollTo(0, 0);
    if (!this.state?.projectToDisplay?.clickable) {
      return this.renderHomepage();
    }

    return this.renderProject(this.state.projectToDisplay);
  }
}

export default hot(module)(App);
