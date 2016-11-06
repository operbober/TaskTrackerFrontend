import React from 'react'
import ReactDOM from 'react-dom'
import {Row, Col, Button, Glyphicon} from 'react-bootstrap'

import DeveloperList from '../details/developerlist'
import AddOrUpdateDeveloperModal from '../modals/addorupdatedevmodal'
import ConfirmModal from '../modals/confirmmodal'

import getDevelopers from '../../actions/users/getDevelopers'
import addOrUpdateDeveloper from '../../actions/users/addOrUpdateDeveloper'
import deleteDeveloper from '../../actions/users/deleteDeveloper'


export default class Developers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            developers: [],
            showEditModal: false,
            modalType: "",
            editedUserIndex: -1,
            showDeleteModal: false,
            deletedUserIndex: -1
        }
    }

    componentDidMount(){
        if (this.context.user.username) {
            getDevelopers((err, developers)=>{
                this.setState({developers:developers});
            });
        }
    }

    _showModalAdd = () =>{
        this.setState({
            showEditModal: true,
            modalType: "add"
        })
    };

    showModalEdit = (index) =>{
        this.setState({
            showEditModal: true,
            modalType: "edit",
            editedUserIndex: index
        })
    };

    showModalDelete = (index) =>{
        this.setState({
            showDeleteModal: true,
            deletedUserIndex: index
        })
    };

    closeModalEdit = () =>{
        this.setState({
            showEditModal: false
        })
    };

    closeModalDelete = () =>{
        this.setState({
            showDeleteModal: false
        })
    };
    
    _addOrUpdateDeveloper = (user) => {
        const type = user.id ? "edit" : "add";
        addOrUpdateDeveloper(user, (err, developer) =>{
            if (!err) {
                var developers = this.state.developers;
                if (type === "add") {
                    developers.push(developer);
                } else {
                    developers[this.state.editedUserIndex] = developer;
                }
                this.setState({
                    developers: developers,
                    editedUserIndex: -1,
                    showEditModal: false
                });
            } else {
                console.log(err);
            }
        })
    };

    _deleteDeveloper = () => {
        const {developers, deletedUserIndex} = this.state;
        console.log(developers);
        console.log(deletedUserIndex);
        console.log(developers[deletedUserIndex]);
        deleteDeveloper(developers[deletedUserIndex].id, (err)=>{
            if (!err) {
                var updatedDevelopers = developers;
                updatedDevelopers.splice(deletedUserIndex, 1);
                this.setState({
                    developers: updatedDevelopers,
                    deletedUserIndex: -1,
                    showDeleteModal: false
                });
            }
        })
    };

    render(){
        const{developers, showEditModal, modalType, editedUserIndex, showDeleteModal, deletedUserIndex} = this.state;
        return(
            <div>
                <Col sm={6}>
                    <Row>
                        <h1>
                            Developers {" "} <Button bsStyle="primary" onClick={this._showModalAdd}><Glyphicon glyph="plus"/></Button>
                        </h1>
                    </Row>
                    <Row>
                        <DeveloperList developers={this.state.developers} 
                                       showModalEdit={this.showModalEdit} 
                                       showModalDelete={this.showModalDelete}
                        />
                    </Row>
                </Col>
                {
                    showEditModal &&
                    modalType === "add"
                        ? <AddOrUpdateDeveloperModal show={showEditModal} close = {this.closeModalEdit} action={this._addOrUpdateDeveloper}/>
                        : <AddOrUpdateDeveloperModal show={showEditModal} close = {this.closeModalEdit} action={this._addOrUpdateDeveloper}
                                                     editedUser={developers[editedUserIndex]}/>
                }
                {   showDeleteModal &&
                    (<ConfirmModal
                        show={showDeleteModal}
                        header="Delete Developer"
                        body={"Delete developer "+developers[deletedUserIndex].username+" ?"}
                        action={this._deleteDeveloper}
                        close={this.closeModalDelete}
                    />)
                }
            </div>
        )
    }
}

Developers.contextTypes = {
    user: React.PropTypes.object
};