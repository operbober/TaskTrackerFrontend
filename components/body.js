import React from 'react'
import {browserHistory} from 'react-router'
import cookie from 'react-cookie';
import {Col} from 'react-bootstrap'

import {Header, Footer} from './common'

import getUserMe from '../actions/users/getUserMe';

export default class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:{}
        }
    }

    componentWillMount() {
        if (cookie.load('authToken')) {
            this.removeAuthTokenCookie();
        }
    }

    getChildContext() {
        return {
            user: this.state.user
        };
    }
    
    setAuthTokenCookie = (authToken) => {
        cookie.save('authToken', authToken);
        getUserMe((err, user)=> {
            if (err) {
                this.removeAuthTokenCookie();
            } else {

            this.setState({user: user});
            browserHistory.push('/projects')
            }
        });
    };

    removeAuthTokenCookie = () => {
        cookie.remove('authToken');
        this.setState({user : {}});
        browserHistory.push('/login');
    };

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                setAuthTokenCookie: this.setAuthTokenCookie,
                removeAuthTokenCookie: this.removeAuthTokenCookie
            })
        );
        return(
            <Col>
                <Header removeAuthTokenCookie={this.removeAuthTokenCookie}/>
                <Col smOffset={2} sm={8}>
                    {childrenWithProps}
                </Col>
                <Footer/>
            </Col>
        )
    }
}

Body.childContextTypes = {
    user: React.PropTypes.object
};
