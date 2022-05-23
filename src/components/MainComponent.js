import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStaff, fetchDeleteStaff, fetchUpdateStaff, fetchStaffs, postStaff, fetchDepartments, fetchSalary } from '../redux/ActionCreators';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffFilter from './StaffFilterComponent';
import Home from './HomeComponent';
import Detail from './DetailStaffComponent'
import Department from './DepartmentComponent';
import DetailDepartment from './DetailDepartmentComponent';
import Salary from './SalaryComponent';
import Loading from './LoadingComponent';
import Test from './TestComponent';


const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        staffsSalary: state.staffsSalary
    }
}

const mapDispatchToProps = dispatch => ({
    addStaff: (staff) => {
        dispatch(addStaff(staff))
    },
    fetchStaffs: () => dispatch(fetchStaffs()),
    fetchDepartments: () => dispatch(fetchDepartments()),
    fetchSalary: () => dispatch(fetchSalary()),
    postStaff: (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary) => dispatch(postStaff(name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary)),
    fetchUpdateStaff: (staff) => dispatch(fetchUpdateStaff(staff)),
    fetchDeleteStaff: (id) => {
        dispatch(fetchDeleteStaff(id))
    },

})

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartments();
        this.props.fetchSalary();
    }
    
    render() {
        
        const staffWithId = ({match}) => {

            return(
                <Detail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]} 
                    departments={this.props.departments.departments}
                    onUpdateStaff = {this.props.fetchUpdateStaff}
                    onDeleteStaff = {this.props.fetchDeleteStaff}
                />
            )
            
        }

        const departmentWithId = ({match}) => {
            return(
                <DetailDepartment staffs={this.props.staffs.staffs.filter(staff => staff.departmentId === match.params.departmentId)} 
                                    department={this.props.departments.departments.filter(department => department.id === match.params.departmentId)[0]}
                />
            )
        }

        return (
            <>
                <Header />
                <Switch>
                    <Route path="/home" component={() => <Home 
                        staffs={this.props.staffs.staffs}  
                        departments={this.props.departments.departments}  
                        staffsLoading={this.props.staffs.isLoading}
                        departmentsLoading={this.props.departments.isLoading}
                    />} />
                    <Route exact path="/staffs" component={() => <StaffFilter staffs={this.props.staffs.staffs} 
                        departments={this.props.departments.departments} 
                        staffsLoading={this.props.staffs.isLoading}
                        staffsErrMess={this.props.staffs.errMess} 
                        postStaff={this.props.postStaff}
                    />} />
                    <Route path="/staffs/:staffId" component={staffWithId} />
                    <Route exact path="/departments" component={() => <Department departments={this.props.departments.departments} 
                        departmentsLoading={this.props.staffs.isLoading}
                        departmentsErrMess={this.props.staffs.errMess}/>} />
                    <Route path="/departments/:departmentId" component={departmentWithId} />
                    <Route exact path="/salary" component={() => <Salary staffsSalary={this.props.staffsSalary.staffsSalary} />} />
                    <Route exact path="/loading" component={() => <Loading />} />
                    <Route exact path="/test" component={() => <Test />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
