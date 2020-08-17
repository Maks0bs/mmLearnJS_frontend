import { combineReducers } from 'redux'
import viewsReducer from '../views/services/reducer'
import componentsReducer from '../components/services/reducer'
import types from './actionTypes'
let {
	API_AUTHENTICATED_USER,
	API_LOGOUT,
	TOGGLE_LOADING
} = types;

let initialState = {
	authenticatedUser: false,
	loading: false
}

let servicesReducer = function(state = initialState, action) {
	switch(action.type){
		case TOGGLE_LOADING: {
			return {
				...state,
				loading: action.payload.loading
			}
		}
		case API_AUTHENTICATED_USER:
			return {
				...state,
				authenticatedUser: action.payload
			}
		case API_LOGOUT:
			return {
				...initialState
			};
		default:
			return state;
	}
}


export default combineReducers({
	views: viewsReducer,
	services: servicesReducer,
	components: componentsReducer
})