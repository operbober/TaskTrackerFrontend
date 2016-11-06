import React from 'react'
import {Table} from 'react-bootstrap'

import Developer from './developer'

export default class DeveloperList extends React.Component{

    render() {
        const {showModalEdit, showModalDelete} = this.props;
        var developers = this.props.developers.map((developer, index) =>
            <Developer
                key={developer.id}
                developer={developer}
                index={index}
                showModalEdit={showModalEdit}
                showModalDelete={showModalDelete}
            />
        );
        return(
            <Table responsive>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {developers}
                </tbody>
            </Table>
        )
    }
}