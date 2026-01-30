import React from 'react';
import { EmptyProps } from '../../common/interfaces/empty';
import { Project } from '../../common/interfaces/project';
import About from '../About';
import Contact from '../Contact';
import Header from '../Header';
import ProjectDetails from '../ProjectDetails';
// import ProjectList from '../ProjectList';
import './style.scss';

interface State {
  projectToDisplay?: Project;
}

class App extends React.Component<EmptyProps, State> {
  setProjectToDisplay(project: Project): void {
    this.setState({ projectToDisplay: project });
  }

  clearProject(): void {
    this.setState({ projectToDisplay: undefined });
  }

  displayAllProjects(): React.JSX.Element {
    return (
      <>
        <About />
        {/* <ProjectList setProject={(project) => this.setProjectToDisplay(project)} /> */}
        <div className="no-projects" />
      </>
    );
  }

  displaySingleProject(project: Project): React.JSX.Element {
    return <ProjectDetails project={project} goBack={() => this.clearProject()} />;
  }

  render(): React.JSX.Element {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return (
      <div className="container-md">
        <Header />
        {this.state?.projectToDisplay
          ? this.displaySingleProject(this.state.projectToDisplay)
          : this.displayAllProjects()}
        <Contact />
      </div>
    );
  }
}

export default App;
