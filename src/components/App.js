import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import Header from './Header.js';
import Projects from './Projects.js';
import Project from './Project.js';
import Contact from './Contact.js';
import '../css/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectToDisplay: undefined
    };
  }

  setProjectToDisplay(data) {
    this.setState({ projectToDisplay: data });
  }

  renderHomepage() {
    return (
      <>
        <div className="bgimg" />
        <div className="container">
          <Header />
          <Projects setProject={data => this.setProjectToDisplay(data)} />
          <Contact />
        </div>
      </>
    );
  }

  renderProject() {
    return (
      <>
        <div className="bgimg" />
        <div className="container">
          <Header />
          <Project data={this.state.projectToDisplay} goBack={() => this.setProjectToDisplay(undefined)} />
          <Contact />
        </div>
      </>
    );
  }

  render() {
    if (this.state.projectToDisplay) {
      return this.renderProject();
    }
    return this.renderHomepage();
  }
}

export default hot(module)(App);
