import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//ADD STAFF
export const addStaff = (staff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: staff
})

export const postStaff = (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image, salary) => (dispatch) => {
    const newStaff = {
        name,
        doB,
        salaryScale,
        startDate,
        departmentId,
        annualLeave,
        overTime,
        image,
        salary
    }

    return fetch(baseUrl + '/staffs', {
        method: 'POST',
        body: JSON.stringify(newStaff),
        headers: { 'Content-Type': 'application/json'},
        credentials: 'same-origin'
    })

    .then(response => {
        if(response.ok){
            return response;
        }else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })

    .then(response => response.json())
    .then(response => dispatch(addStaff(response)))
    .catch(error => {
        console.log('Post staff ', error.message);
        alert('Your staff could not be posted\nError: ' + error.message)
    })
}

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

//delete
export const deleteStaff = (id) => ({
    type: ActionTypes.DELETE_STAFF,
    payload: id
})

export const deleteStaffLoading = () => ({
    type: ActionTypes.DELETE_STAFF_LOADING,
});

//update staff
export const updateStaff = (staff) => ({
    type: ActionTypes.UPDATE_STAFF,
    payload: staff
})

export const fetchUpdateStaff = (staff) => (dispatch) => {
    console.log(staff)
    return fetch(baseUrl + "/staffs",  {
        method: "PATCH",
        body: JSON.stringify(staff),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })

    .then(response => {
        if(response.ok){
            return response;
        } else {
            var error = new Error(
                "Error " + response.status + ": " + response.statusText
            );
            error.response = response;
            throw error;
        }
    },
        (error) => {
            throw error;
        }
    )
    .then((response) => response.json())
    .then((response) => dispatch(updateStaff(response)))
    .catch((error) => {
        console.log("Updated staffs", error.message);
        alert("Your staff could not be updated\nError: " + error.message)
    })
}

export const fetchDeleteStaff = (id) => (dispatch) => {
    if(window.confirm("Are you sure to delete this staff?")){
        return fetch(baseUrl + '/staffs/' + id, {
            method: 'DELETE'
        }).then(() => {
            window.location.href="/staffs"
            dispatch(deleteStaff(id))
        });
    }else return;
}

//staff

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

//departments

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

//salary

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
