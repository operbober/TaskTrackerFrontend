import React from 'react'
import {PanelGroup} from 'react-bootstrap'

import Task from './task';

export default class TaskList extends React.Component{
    
    
    render() {
        var tasks = this.props.tasks.map((task, index) =>
            <Task 
                key={task.id} 
                task={task}
                index={index}
                switchStatus={this.props.switchStatus}
                selectDeveloper={this.props.selectDeveloper}
                saveTags={this.props.saveTags}
            />
        );
        
        return(
            <PanelGroup>
                {tasks}
            </PanelGroup>
        )
    }
}