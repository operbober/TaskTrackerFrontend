import React from 'react'
import {Link} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

export default class Header extends React.Component{
    render(){
        const user = this.context.user;
        const LOGO = <Navbar.Header>
                        <Navbar.Brand>
                            {
                                user.username
                                ? <Link to={'/projects'}>Task Tracker</Link>
                                : <Link to={'/'}>Task Tracker</Link>
                            }

                        </Navbar.Brand>
                    </Navbar.Header>;
        var  NAV_PANEL;
        var  USER;
        if (user.role){
            if (user.role.name === "ROLE_MANAGER"){
                NAV_PANEL= <Nav>
                    <NavItem> <Link to={'/projects'}>Projects</Link></NavItem>
                    <NavItem> <Link to={'/tasks/all'}> Tasks </Link></NavItem>
                    <NavItem> <Link to={'/developers'}>Developers</Link></NavItem>
                </Nav>;
            } else {
                NAV_PANEL = <Nav>
                    <NavItem> <Link to={'/projects'}>Projects</Link></NavItem>
                    <NavItem> <Link to={'/tasks/all'}> Tasks </Link></NavItem>
                </Nav>;
            }
            USER = <Nav pullRight>
                <NavDropdown eventKey={3} title={user.username} id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1} onClick={this.props.removeAuthTokenCookie}>Sign out</MenuItem>
                </NavDropdown>
            </Nav>;
        }

        return(
            <Navbar staticTop>
                {LOGO}
                {NAV_PANEL}
                {USER}
            </Navbar>
        )
    }
}
Header.contextTypes = {
    user: React.PropTypes.object
};