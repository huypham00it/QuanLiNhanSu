import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false, 
            test: ''
        };
    }

    toggleNav() {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }

    render() {
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/home">
                            <img src="/assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/staffs">
                                        <span className="fa fa-users fa-lg"></span> Nhân viên
                                    </NavLink>                                
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/departments">
                                        <span className="fa fa-address-card-o fa-lg"></span> Phòng ban
                                    </NavLink>                                
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/salary">
                                        <span className="fa fa-money fa-lg"></span> Bảng lương
                                    </NavLink>                                
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <input onChange={(e) => this.setState({test:e.target.value})} />
                    </div>
                </Navbar>
            </>
        );
    }
}

export default Header;
