import React from 'react'
import {Label} from 'react-bootstrap'

export default class Tag extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tag: this.props.tag
        }
    }

    _deleteTag = () => {
        const {tag} = this.state;
        this.props.delete(tag);
    };

    render() {
        var {tag} = this.state;
        return(
            <span><Label bsStyle="info" onClick={this._deleteTag}>{tag + ' x'}</Label>{' '}</span>
        )
    }
}