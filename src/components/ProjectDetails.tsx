import React from 'react';
import { hot } from 'react-hot-loader';
import '../css/ProjectDetails.scss';
import { EmptyState } from '../interfaces/empty';
import { Project } from '../interfaces/project';
import LightYoutube from './LightYoutube';
import ProjectImage from './ProjectImage';

interface Props {
  project: Project;
  goBack: () => void;
}

class ProjectDetails extends React.Component<Props, EmptyState> {
  render() {
    const project = this.props.project;
    return (
      <>
        <div className='row'>
          <div className='col-xl-6 col-lg-8 col-md-10 col-sm-12'>
            <ProjectImage className='img-fluid rounded' imageSource={this.props.project.imageSource} />
          </div>
        </div>
        <div className='row'>
          <div className='description col'>
            {project.details.map((detailParagraph, index) => (
              <p key={index}>{detailParagraph}</p>
            ))}
          </div>
        </div>
        {project.videoSource && (
          <div className='row'>
            <div className='col-xl-6 col-lg-8 col-md-10 col-sm-12'>
              <LightYoutube videoId={project.videoSource} />
            </div>
          </div>
        )}
        <div className='row'>
          <button className='btn btn-outline-light' onClick={this.props.goBack}>
            Back
          </button>
        </div>
      </>
    );
  }
}

export default hot(module)(ProjectDetails);
