import React from 'react';
import {Button, Modal, Form} from 'react-bootstrap'

export default class ConfirmModal extends React.Component{

    render(){
        const {show ,header, body, action, close}  = this.props;
        return(
            <Modal bsSize="sm" show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <p>{body}</p>
                        <Button bsStyle="primary" onClick={action}>OK</Button>
                        {" "}
                        <Button onClick={close}>Close</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}