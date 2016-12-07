import React from 'react'
import {Col, Button, Glyphicon} from 'react-bootstrap'

import TaskList from '../details/tasklist'
import AddTaskModal from '../modals/addtaskmodal'

import getTaskBy from '../../actions/tasks/getTasksBy'
import addTask from '../../actions/tasks/addTask'
import switchStatusTask from '../../actions/tasks/swithchStatusTask'
import selectDeveloperTask from '../../actions/tasks/selectDeveloperTask'
import saveTags from '../../actions/tags/setTaskTags'


export default class Tasks extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[],
            showAddModal:false,
            projects:[],
            developers:[]
        }
    }
    
    componentDidMount(){
        this._getTasks();
    }

    componentDidUpdate(prevProps){
        if (prevProps.params.projectId !== this.props.params.projectId){
            this._getTasks();
        }
    }

    _getTasks = () =>{
        const user = this.context.user;
        if (user.username) {
            
            const projectId = this.props.params.projectId;
            var by = "", id = "";
            if (user.role.name === "ROLE_DEVELOPER"){
                if (projectId != "all") {
                    by = "project&developer/";
                    id = projectId;
                } else {
                    by = "developer/";
                    id = user.id;
                }
            } else {
                if (projectId != "all") {
                    by = "project/";
                    id = projectId;
                }
            }
            getTaskBy(by, id, (err, tasks) => {
                if (err){
                    err.status == 401 && this.props.removeAuthTokenCookie();
                    console.log(err);
                }else {
                    this.setState({tasks:tasks});
                }
            });
        }
    };

    _openAddModal = () =>{
        this.setState({
            showAddModal: true
        })
    };

    _closeAddModal = () =>{
        this.setState({showAddModal: false})
    };

    _addTask = (taskData) => {
        addTask(taskData, (err, task) =>{
            if (err) {
                console.log(err);
            } else {
                var tasks = this.state.tasks;
                tasks.push(task);
                this.setState({tasks: tasks});
                this._closeAddModal();
            }
        })
    };

    _switchStatus = (index) => {
        var tasks = this.state.tasks;
        switchStatusTask(tasks[index].id, (err, task)=>{
            if (!err) {
                tasks[index] = task;
                this.setState({tasks:tasks});
            }
        })
    };
    
    _selectDeveloper = (index, develoepr) => {
        var {tasks} = this.state;
        selectDeveloperTask(tasks[index].id, develoepr, (err, task)=>{
            if (!err){
                tasks[index] = task;
                this.setState({tasks:tasks});
            }
        })
    };
    
    _saveTags = (index, tags) => {
        let {tasks} = this.state;
        let task = tasks[index];
        tags = tags.map((tag) => {
            return {'name' : tag};
        });
        task.tags = tags;
        saveTags(task, (err, task) => {
            if (err != null){
                console.log(err);
            } else {
                tasks[index] = task;
                this.setState({
                    tasks: tasks
                })
            }
        });
    };

    render(){
        var {showAddModal} = this.state;
        var {projectId} = this.props.params;
        
        return(
            <div>
                <Col sm={8}>
                    <h1>
                        Tasks {" "}
                        <Button bsStyle="primary" onClick={this._openAddModal}><Glyphicon glyph="plus"/></Button>
                    </h1>
                    <TaskList
                        tasks={this.state.tasks}
                        switchStatus={this._switchStatus}
                        selectDeveloper={this._selectDeveloper}
                        saveTags = {this._saveTags}
                    />
                </Col>
                {
                    showAddModal &&
                    <AddTaskModal
                        show={showAddModal}
                        close={this._closeAddModal}
                        action={this._addTask}
                        projectId={projectId}
                    />
                }
            </div>
        )
    }
}

Tasks.contextTypes = {
    user: React.PropTypes.object
};