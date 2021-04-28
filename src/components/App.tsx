import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/App.scss';
import { EmptyProps } from '../interfaces/empty';
import { Project } from '../interfaces/project';
import Contact from './Contact';
import Header from './Header';
import ProjectDetails from './ProjectDetails';
import ProjectList from './ProjectList';

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

  displayAllProjects() {
    return (
      <>
        <Header />
        <ProjectList setProject={(project) => this.setProjectToDisplay(project)} />
      </>
    );
  }

  displaySingleProject(project: Project) {
    return (
      <>
        <Header subheading={project.name} />
        <ProjectDetails project={project} goBack={() => this.clearProject()} />
      </>
    );
  }

  render() {
    window.scrollTo(0, 0);
    const displayProject = this.state?.projectToDisplay ?? false;

    return (
      <div className='container'>
        {displayProject ? this.displaySingleProject(this.state.projectToDisplay!) : this.displayAllProjects()}
        <Contact />
      </div>
    );
  }
}

export default hot(module)(App);
