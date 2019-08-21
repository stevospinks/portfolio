import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import Header from './Header.js';
import ProjectOverview from './ProjectOverview.js';
import Contact from './Contact.js';
// images
import Image_MassSpringParticleSystem from '../images/mass-spring-particle-system.jpg';
import Image_MyFirstGame from '../images/my-first-game.jpg';
import Image_AnotherProject from '../images/another-project.jpg';
import Image_TheBestGame from '../images/the-best-game.jpg';

import '../css/App.scss';

class App extends Component {
  render() {
    return (
      <>
        <div className="bgimg" />
        <div className="container">
          <Header />
          <table className="projects">
            <tr>
              <td>
                <ProjectOverview
                  name={'Mass Spring Particle Systems'}
                  blurb={'University final year project'}
                  details={
                    'For my final year project I created a system which demonstrates mass spring particle systems. ' +
                    'I researched, designed and developed this system over the course of my final year. ' +
                    'I chose to develop the system using C++ and OpenGL in Visual Studio 2010. I decided to ' +
                    'demonstrate cloth and added natural forces such as gravity and wind. A simple collision ' +
                    'detection function was also included. Information about all three stages in this project can ' +
                    'be found in the documentation. The video below shows a demonstration of the final application'
                  }
                  video={''}
                  imageSource={Image_MassSpringParticleSystem}
                />
              </td>
              <td>
                <ProjectOverview
                  name={'Another Project'}
                  blurb={'Some quick details'}
                  video={''}
                  imageSource={Image_AnotherProject}
                />
              </td>
            </tr>
            <tr>
              <td>
                <ProjectOverview
                  name={'My First Game'}
                  blurb={'More quick details'}
                  video={''}
                  imageSource={Image_MyFirstGame}
                />
              </td>
              <td>
                <ProjectOverview
                  name={'The Best Game'}
                  blurb={'No description required'}
                  video={''}
                  imageSource={Image_TheBestGame}
                />
              </td>
            </tr>
          </table>
          <Contact />
        </div>
      </>
    );
  }
}

export default hot(module)(App);
