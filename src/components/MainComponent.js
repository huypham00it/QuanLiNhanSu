import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffFilter from './StaffFilterComponent';
import Home from './HomeComponent';
import Detail from './DetailStaffComponent'
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import {STAFFS} from '../shared/staffs';
import {DEPARTMENTS} from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        if(!localStorage.getItem('staffs')){
            localStorage.setItem('staffs', JSON.stringify(STAFFS));
        }
        const staffs = JSON.parse(localStorage.getItem('staffs'));
        
        const staffWithId = ({match}) => {
            return(
                <Detail staff={staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]} />
            )
            
        }

        return (
            <>
                <Header />
                <Switch>
                    <Route path="/home" component={() => <Home staffs={staffs} departments={DEPARTMENTS} />} />
                    <Route exact path="/staffs" component={() => <StaffFilter staffs={staffs} departments={DEPARTMENTS} />} />
                    <Route path="/staffs/:staffId" component={staffWithId} />
                    <Route exact path="/department" component={() => <Department departments={DEPARTMENTS} />} />
                    <Route exact path="/salary" component={() => <Salary staffs={staffs} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </>
        );
    }
}

export default Main;