import React from 'react'
import {Navbar} from 'react-bootstrap'

export default class Footer extends React.Component{
    render(){
        return(
            <Navbar fixedBottom>
                <Navbar.Header>
                    <Navbar.Brand>
                        © Copyright
                    </Navbar.Brand>
                </Navbar.Header>
            </Navbar>
        )
    }
}