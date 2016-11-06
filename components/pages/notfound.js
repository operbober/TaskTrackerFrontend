import React from 'react'
import {Jumbotron, Col, Glyphicon} from 'react-bootstrap'

export default class Login extends React.Component{
    render(){
        return(
            <Col smOffset={4}>
                <h2><Glyphicon glyph="warning-sign"/> Error 404. Page Not Found!</h2>
            </Col>
        )
    }
}