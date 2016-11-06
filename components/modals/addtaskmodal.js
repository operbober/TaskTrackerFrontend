import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

import getDevelopers from '../../actions/users/getDevelopers'
import getProjects from '../../actions/projects/getProjectsAll'

export default class AddTaskModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects:[],
            developers: []
        }
    }

    componentDidMount(){
        const user = this.context.user;
        const projectId = this.props.projectId;

        var projects;
        
        getProjects((err, downloadedProjects) => {
            if (projectId === "all") {
                projects = downloadedProjects;
            } else {
                var project = downloadedProjects.find((downloadedProject)=> {return downloadedProject.id === projectId});
                projects = [project];
            }

            if (user.role.name === "ROLE_DEVELOPER") {
                this.setState({
                    projects: projects,
                    developers:[user]
                })
            } else {
                getDevelopers((err, downloadedDevelopers) => {
                    this.setState({
                        projects: projects,
                        developers: downloadedDevelopers
                    })
                });
            }
        });

        
    }

    _onClick = () =>{
        const {developers, projects} = this.state;
        const {name, description, projectIndex, developerIndex} = this.refs;
        var taskData = {
            name : ReactDOM.findDOMNode(name).value,
            description : ReactDOM.findDOMNode(description).value,
            project : projects[ReactDOM.findDOMNode(projectIndex).value],
            developer: ReactDOM.findDOMNode(developerIndex).value != -1
                ? developers[ReactDOM.findDOMNode(developerIndex).value]
                : null
        };
        this.props.action(taskData);
    };

    render(){
        const {projects, developers} = this.state;
        const {show, close}  = this.props;
        
        var projectsOptions = projects.map((project, index) =>
            <option key={project.id} value={index}>{project.name}</option>
        );
        var developersOptions = developers.map((developer, index) =>
            <option key={developer.id} value={index}>{developer.username}</option>
        );
        developersOptions.push(<option key={0} value={-1}>not selected</option>);
        
        return(
            <Modal bsStyle="sm" show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup>
                            <FormControl type="text" placeholder="Task Name" ref="name"/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl componentClass="textarea" placeholder="Description for task..." ref="description"/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Project</ControlLabel>
                            <FormControl componentClass="select" ref="projectIndex">
                                {projectsOptions}
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Developer</ControlLabel>
                            <FormControl componentClass="select" placeholder="-1" ref="developerIndex">
                                {developersOptions}
                            </FormControl>
                        </FormGroup>
                        <Button bsStyle="primary" onClick={this._onClick} >Save changes</Button>
                        {" "}
                        <Button onClick={close}>Close</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

AddTaskModal.contextTypes = {
    user: React.PropTypes.object
};