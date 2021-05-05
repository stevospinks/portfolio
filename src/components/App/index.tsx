import React from 'react';
import { hot } from 'react-hot-loader';
import { EmptyProps } from '../../common/interfaces/empty';
import { Project } from '../../common/interfaces/project';
import About from '../About';
import Contact from '../Contact';
import Header from '../Header';
import ProjectDetails from '../ProjectDetails';
import ProjectList from '../ProjectList';
import './style.scss';

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
        <About />
        <ProjectList setProject={(project) => this.setProjectToDisplay(project)} />
      </>
    );
  }

  displaySingleProject(project: Project) {
    return <ProjectDetails project={project} goBack={() => this.clearProject()} />;
  }

  render() {
    window.scrollTo(0, 0);
    const displayProject = this.state?.projectToDisplay ?? false;

    return (
      <div className='container'>
        <Header />
        {displayProject ? this.displaySingleProject(this.state.projectToDisplay!) : this.displayAllProjects()}
        <Contact />
      </div>
    );
  }
}

export default hot(module)(App);
