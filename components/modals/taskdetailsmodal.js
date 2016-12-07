import React from 'react'
import {Modal, Well, Label, Button, Glyphicon, Form, FormControl, FormGroup} from 'react-bootstrap'
import TagsInput from '../details/tagsinput'

import getDevelopers from '../../actions/users/getDevelopers'

export default class TaskDetailsModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments:[],
            selectDeveloper:false,
            developers:[]
        }
    }
    
    componentDidMount(){
        if (this.context.user.role.name === "ROLE_MANAGER"){
            getDevelopers((err, developers) => {
                this.setState({developers:developers})
            })
        }
    }

    _switchStatus = () => {
        const {switchStatus ,index} = this.props;
        switchStatus(index);
    };

    _selectDeveloper = (e) =>{
        const {selectDeveloper ,index} = this.props;
        const {developers} = this.state;
        selectDeveloper(index,
            e.target.value != -1
            ? developers[e.target.value]
            : null
        )
    };
    
    _saveTags = (tags) => {
        const {index, saveTags} = this.props;
        saveTags(index, tags);
    };

    render(){
        const {user} = this.context;
        const {developers} = this.state;
        const {show ,close, task}  = this.props;
        const tags = task.tags.map((tag) => tag.name);

        if (developers.length > 0 && user.role && user.role.name === "ROLE_MANAGER") {
            var selectedDeveloperIndex = -1;
            if (task.developer != null) {
                developers.find((developer, index)=> {
                    if (developer.id === task.developer.id) {
                        selectedDeveloperIndex = index;
                        return true;
                    }
                    return false;
                });
            }

            var developersOptions = developers.map((developer, index) =>
                <option key={index} value={index}>{developer.username}</option>
            );
            developersOptions.push(<option key="-1" value="-1">not selected</option>);
        }

        return(
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            user.role.name === "ROLE_MANAGER"
                                ?task.status
                                    ?<Label bsStyle="success">closed</Label>
                                    :<Label bsStyle="success">open</Label>
                                :task.status
                                    ? <Button bsStyle="success" onClick={this._switchStatus}><Glyphicon glyph="ok"/> closed </Button>
                                    : <Button bsStyle="danger" onClick={this._switchStatus}><Glyphicon glyph="remove"/> open </Button>
                        }
                        {" "}
                        Task : {task.name}
                        <div>
                            <TagsInput 
                                tags={tags} 
                                saveTags={this._saveTags}
                            />
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Project : {task.project.name} </p>
                    {
                        user.role.name === "ROLE_MANAGER"
                        ? <Form inline>
                            Developer{' '}:{' '}
                            <FormGroup bsSize='small'>
                                <FormControl componentClass="select" value={selectedDeveloperIndex} onChange={this._selectDeveloper}>
                                    {developersOptions}
                                </FormControl>
                            </FormGroup>
                          </Form>
                        : <p>Developer: {task.developer.username}</p>
                    }
                    <p>Description : </p>
                    <Well>{task.description}</Well>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
        )
    }
}

TaskDetailsModal.contextTypes = {
    user: React.PropTypes.object
};