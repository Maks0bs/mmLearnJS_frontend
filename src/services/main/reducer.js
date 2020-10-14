import types from './actionTypes'
import { isEqual } from 'lodash'
let {
    API_FETCH_AUTHENTICATED_USER,
    API_LOGOUT
} = types;

/**
 * @typedef ServicesBasicState
 * @type Object
 * @property {?Object} authenticatedUser whole data about the
 * current authenticate user
 */

let initialState = {
    authenticatedUser: null
}

/**
 * @function servicesReducer
 * @param {ServicesBasicState} state
 * @param {ReduxAction} action
 * @param {?Object} state.authenticatedUser whole data about the
 * current authenticate user
 * @return {ServicesBasicState}
 *
 * @memberOf storeState
 */
export default function(state = initialState, action) {
    switch(action.type){
        case API_FETCH_AUTHENTICATED_USER:{
            /*
                Don't update state if user is the same
             */
            if (isEqual(state.authenticatedUser, action.payload)){
                return state;
            }
            /*
                If user is not authenticated, authenticatedUser should be falsy
             */
            if (action.payload === 'Not authenticated'){
                return {
                    ...state,
                    authenticatedUser: false
                }
            }
            return {
                ...state,
                authenticatedUser: action.payload
            }
        }
        case API_LOGOUT:
            return {...state}
        default:
            return state;
    }
}