import React from 'react';
import ReactDOM from 'react-dom';
import {Form, FormGroup, Col, FormControl, Button, Alert} from 'react-bootstrap';

import login from '../../actions/login';

const AUTH_ERROR = "Invalid Username or Password!!!"

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {authError:false}
    }
    
    componentDidMount(){
        this.setState({authError:false});
    }

    _login = () =>{
        const {username, password} = this.refs;
        login(ReactDOM.findDOMNode(username).value, ReactDOM.findDOMNode(password).value, (err, authToken) => {
            if (err) { 
                this.setState({authError : true})
            } else {
                this.props.setAuthTokenCookie(authToken);    
            }
            
        })
    };

    render(){
        return(
            <Col smOffset={4} sm={4}>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                            <FormControl type="username" placeholder="Username" ref="username"/>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                            <FormControl type="password" placeholder="Password" ref="password"/>
                    </FormGroup>

                    <FormGroup>
                            <Button bsStyle="success" onClick={this._login}>
                                Sign in
                            </Button>
                    </FormGroup>
                </Form>
                {this.state.authError &&
                    <Alert bsStyle="warning">
                        {AUTH_ERROR}
                    </Alert>
                }
            </Col>
        )
    }
}