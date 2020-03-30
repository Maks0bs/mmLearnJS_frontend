import { combineReducers } from 'redux'
import viewsReducer from '../views/services/reducer'
import types from './actionTypes'
let { EXTEND_SESSION } = types;

let initialState = {
	user: null
}

let servicesReducer = function(state = initialState, action) {
	switch(action.type){
		case EXTEND_SESSION:
			return {
				...state,
				user: action.payload
			}
		default:
			return state;
	}
}


export default combineReducers({
	views: viewsReducer,
	services: servicesReducer
})