import React from 'react'
import {Nav ,Button, Glyphicon} from 'react-bootstrap'


export default class Developer extends React.Component{
    _edit = () => {
        const {index, showModalEdit} = this.props;
        showModalEdit(index);
    };

    _delete = () =>{
        const {index, showModalDelete} = this.props;
        showModalDelete(index);
    };

    render(){
        const {developer} = this.props;
        return(
                <tr>
                    <td>{developer.username}</td>
                    <td>
                        {" "}<Button bsStyle="warning" onClick={this._edit}><Glyphicon glyph="pencil"/></Button>
                        {" "}<Button bsStyle="danger" onClick={this._delete}><Glyphicon glyph="trash"/></Button>
                    </td>
                </tr>
        )
    }
}