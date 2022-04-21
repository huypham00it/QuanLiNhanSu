import * as ActionTypes from './ActionTypes';

export const Staffs = (state = {
    isLoading: true,
    errMess: null,
    staffs: []
}, action) => {
    switch(action.type){
        case ActionTypes.GET_STAFFS:
            return {...state, isLoading: false, errMess: null, staffs: action.payload};
        case ActionTypes.STAFFS_LOADING:
            return {...state, isLoading: true, errMess: null, staffs: []};
        case ActionTypes.STAFFS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, staffs: []};
        case ActionTypes.ADD_STAFF:
            var staff = action.payload;
            return {...state, staffs: state.staffs.concat(staff)};
        case ActionTypes.DELETE_STAFF_LOADING:
            return {...state, isLoading: true, errMess: null, staffs: []}
        case ActionTypes.DELETE_STAFF:
            var filteredStaffs = state.staffs.filter(staff => staff.id !== action.payload);
            return {...state, isLoading: false, staffs: filteredStaffs};
        case ActionTypes.UPDATE_STAFF:
            return {...state, staffs: action.payload};
        default:
            return state;
    }
}