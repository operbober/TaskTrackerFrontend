import React from 'react';
import {Link} from 'react-router';
import {Row ,Panel, Button, Glyphicon, Nav} from 'react-bootstrap';

export default class Project extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const user = this.context.user;
        const {project} = this.props;
        return(
            <div>
                <Row>
                    <h3><Button bsStyle="link" bsSize="large"><Link to={'/tasks/'+project.id}> {project.name} </Link></Button></h3>
                </Row>
                { project.description &&
                <Panel>
                    <h4>Description: </h4>
                    {project.description}
                </Panel>
                }
            </div>
        )
    }
}

Project.contextTypes = {
    user: React.PropTypes.object
};