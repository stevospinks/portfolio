import React, { ReactElement } from 'react';
import { EmptyState } from '../../common/interfaces/empty';
import { Project } from '../../common/interfaces/project';
import LightYoutube from '../LightYoutube';
import ProjectImage from '../ProjectImage';
import './style.scss';

interface Props {
  project: Project;
  goBack: () => void;
}

class ProjectDetails extends React.Component<Props, EmptyState> {
  render(): ReactElement {
    const project = this.props.project;
    return (
      <>
        <h4>{this.props.project.name}</h4>
        <div className='row'>
          <div className='col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-10'>
            <ProjectImage
              className='img-fluid rounded header-image'
              imageSource={this.props.project.imageSource}
              projectName={this.props.project.name}
            />
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
            <div className='col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-10'>
              <LightYoutube videoId={project.videoSource} />
            </div>
          </div>
        )}
        <div className='row'>
          <div className='col'>
            <button className='btn btn-outline-light' onClick={this.props.goBack}>
              Back
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ProjectDetails;
