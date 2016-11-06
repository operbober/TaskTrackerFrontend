import React from 'react'

import Project from './project';

export default class ProjectList extends React.Component{
    render() {
        var projects = this.props.projects.map((project) =>
            <Project
                key={project.id}
                project={project}
            />
        );
        return(
           <div>
               {projects}
           </div>
        )
    }
}