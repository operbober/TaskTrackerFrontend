import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

export default class AddProjectModal extends React.Component{
    constructor(props){
        super(props);
    }

    _onClick = () =>{
        const {name, description} = this.refs;
        var projectData = {
            name : ReactDOM.findDOMNode(name).value,
            description : ReactDOM.findDOMNode(description).value
        };
        this.props.action(projectData);
    };

    render(){
        const {show, close}  = this.props;
        
        return(
            <Modal bsStyle="sm" show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup>
                            <FormControl type="text" placeholder="Project Name" ref="name"/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl componentClass="textarea" placeholder="Description for project..." ref="description"/>
                        </FormGroup>
                    </Form>
                    <Button bsStyle="primary" onClick={this._onClick} >Save changes</Button>
                    {" "}
                    <Button onClick={close}>Close</Button>
                </Modal.Body>
            </Modal>
        )
    }
}