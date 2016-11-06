import React from 'react';
import ReactDOM from 'react-dom';
import {Col, Button, Glyphicon, Modal, Form, FormGroup, FormControl} from 'react-bootstrap'

import ProjectList from '../details/projectList'
import AddProjectModal from '../modals/addprojectmodal'

import getProjectsAll from '../../actions/projects/getProjectsAll'
import getProjectsMy from '../../actions/projects/getProjectsMy'
import addProject from '../../actions/projects/addProject'

export default class Projects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects:[],
            showAddModal:false
        }
    }

    componentDidMount(){
        const user = this.context.user;
        if (user.username) {
            var get = user.role.name === "ROLE_DEVELOPER"
                ? getProjectsMy
                : getProjectsAll;

            get((err, projects) => {
                if (err) {
                    err.status == 401 && this.props.removeAuthTokenCookie();
                    console.log(err);
                } else {
                    this.setState({projects: projects});
                }
            });
        }
    }

    _openAddModal = () =>{
        this.setState({showAddModal: true})
    };

    _closeAddModal = () =>{
        this.setState({showAddModal: false})
    };

    _addProject = (projectData) => {
        addProject(projectData, (err, project) =>{
            var projects = this.state.projects;
            projects.push(project);
            this.setState({projects: projects});
            this._closeAddModal();
        });
    };

    render(){
        const user = this.context.user;

        return(
            <div>
                <Col sm={6}>
                    <h1>
                        Projects {" "}
                        { user.role && user.role.name === "ROLE_MANAGER" &&
                            <Button bsStyle="primary" onClick={this._openAddModal}><Glyphicon glyph="plus"/></Button>
                        }
                    </h1>
                    <ProjectList
                        projects={this.state.projects}
                    />
                </Col>
                {
                    this.state.showAddModal &&
                    <AddProjectModal
                        show={this.state.showAddModal}
                        close={this._closeAddModal}
                        action={this._addProject}
                    />
                }
            </div>
        )
    }
}

Projects.contextTypes = {
    user: React.PropTypes.object
};