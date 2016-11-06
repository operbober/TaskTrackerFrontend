import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Modal, Form, FormGroup, FormControl} from 'react-bootstrap'

export default class AddOrUpdateDeveloperModal extends React.Component{
    constructor(props){
        super(props);
    }

    _onClick = () =>{
        const {usernameRef, passwordRef} = this.refs;
        var user = {
            username:ReactDOM.findDOMNode(usernameRef).value,
            password:ReactDOM.findDOMNode(passwordRef).value
        };
        if (this.props.editedUser) user.id = this.props.editedUser.id;
        this.props.action(user);
    };

    render(){
        const {show, editedUser, close}  = this.props;
        return(
            <Modal bsSize="sm" show={show} onHide={close}>
                <Modal.Header closeButton>
                    {
                        !editedUser
                        ? <Modal.Title > Add Developer</Modal.Title>
                        : <Modal.Title > Edit Developer</Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup>
                            {
                                !editedUser
                                ?< FormControl type="text" placeholder="username" ref="usernameRef"/>
                                :<FormControl type="text" placeholder="username" ref="usernameRef" defaultValue={editedUser.username}/>
                            }
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="password" placeholder="password" ref="passwordRef"/>
                        </FormGroup>
                    </Form>
                    <Button bsStyle="primary" onClick={this._onClick}>
                        {!editedUser ? "Save" : "Edit"}
                    </Button>
                    {" "}
                    <Button onClick={close}>Close</Button>
                </Modal.Body>
            </Modal>
        )
    }
}