import { combineReducers } from 'redux'
import viewsReducer from '../views/services/reducer'
import types from './actionTypes'
let { API_AUTHENTICATED_USER, API_LOGOUT } = types;

let initialState = {
	authenticatedUser: null
}

let servicesReducer = function(state = initialState, action) {
	switch(action.type){
		case API_AUTHENTICATED_USER:
			console.log(action);
			return {
				...state,
				authenticatedUser: action.payload
			}
		case API_LOGOUT:
			return {
				initialState
			}
		default:
			return state;
	}
}


export default combineReducers({
	views: viewsReducer,
	services: servicesReducer
})