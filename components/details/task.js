import React from 'react'
import {Label, Button} from 'react-bootstrap'

import TaskDetailsModal from '../modals/taskdetailsmodal'

export default class Task extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showDetailsModal:false
        }
    }
    
    _showDetailsModal = () => {
        this.setState({
            showDetailsModal:true
        })
    };

    _closeDetailsModal = () => {
        this.setState({
            showDetailsModal:false
        })
    };
    
    render(){
        const {task, index, switchStatus, selectDeveloper, saveTags} = this.props;
        
        return(
            <div>
                <h3>
                {task.status
                    ? <Label bsStyle="success">Closed</Label>
                    : <Label bsStyle="danger">Open</Label>
                }
                <Button bsStyle="link" bsSize="large" onClick={this._showDetailsModal}>
                    {task.name}{" "}
                    ({task.project.name}){" "}
                    ({
                        task.developer !== null
                        ? task.developer.username
                        : "not selected"
                    })
                </Button>
                </h3>
                {
                    this.state.showDetailsModal &&
                    <TaskDetailsModal 
                        show={this.state.showDetailsModal}
                        close={this._closeDetailsModal}
                        task={task}
                        index={index}
                        switchStatus={switchStatus}
                        selectDeveloper={selectDeveloper}
                        saveTags={saveTags}
                    />
                }
            </div>
        )
    }
}

Task.contextTypes = {
    user: React.PropTypes.object
};