import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));
    return fetch(baseUrl + '/staffs')
        .then(response => {
            if(response.ok) {
                return response;

            }
            else
                var error = new Error('Error ' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(staffs => dispatch(getStaffs(staffs)))
        .catch(error => dispatch(staffsFailed(error.message)));

}

export const getStaffs = (staffs) => ({
    type: ActionTypes.GET_STAFFS,
    payload: staffs
});

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errMess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errMess
})

export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));
    return fetch(baseUrl + '/departments')
        .then(response => {
            if(response.ok) 
                return response;
            else
                var error = new Error('Error ' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(departments => dispatch(getDepartments(departments)))
        .catch(error => dispatch(departmentsFailed(error.message)));
}

export const getDepartments = (departments) => ({
    type: ActionTypes.GET_DEPARTMENTS,
    payload: departments
});

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
});

export const departmentsFailed = (errMess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errMess
})

export const fetchSalary = () => (dispatch) => {
    dispatch(salaryLoading(true));
    return fetch(baseUrl + '/staffsSalary')
        .then(response => {
            if(response.ok) 
                return response;
            else
                var error = new Error('Error ' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
        },
        error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(staffsSalary => dispatch(getSalary(staffsSalary)))
        .catch(error => dispatch(salaryFailed(error.message)));

}

export const getSalary = (staffsSalary) => ({
    type: ActionTypes.GET_SALARY,
    payload: staffsSalary
});

export const salaryLoading = () => ({
    type: ActionTypes.SALARY_LOADING
});

export const salaryFailed = (errMess) => ({
    type: ActionTypes.SALARY_FAILED,
    payload: errMess
})
