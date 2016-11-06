import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import Body from './components/body';
import {Login, Projects, Tasks, Developers, NotFound} from './components/pages'

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Body}>
            <IndexRoute component = {Login}/>
            <Route path="login" component = {Login}/>
            <Route path="projects" component={Projects}/>
            <Route path="tasks/:projectId" component={Tasks}/>
            <Route path="developers" component={Developers}/>
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>
), document.getElementById('react'));