import { LEADERS } from '../shared/leaders';
import * as ActionTypes from './ActionTypes';

//reducer for leaders
export const Leaders = (state = { isLoading: true,
    errMess: null,
    leaders:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
            //... = spread operator of es6. ...state gives current value of state
            return {...state, isLoading: false, errMess: null, leaders: action.payload};

        case ActionTypes.LEADER_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}

        case ActionTypes.LEADERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};