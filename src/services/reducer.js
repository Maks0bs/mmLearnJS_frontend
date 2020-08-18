import { combineReducers } from 'redux'
import viewsReducer from '../views/services/reducer'
import componentsReducer from '../components/services/reducer'
import types from './actionTypes'
import { isEqual } from 'lodash'
let {
	API_FETCH_AUTHENTICATED_USER,
	START_FETCH_AUTHENTICATED_USER,
	API_LOGOUT,
} = types;

let initialState = {
	authenticatedUser: null,
	canLoad: true
}

let servicesReducer = function(state = initialState, action) {
	switch(action.type){
		case API_FETCH_AUTHENTICATED_USER:{
			if (action.payload === 'Not authenticated'){
				return {
					...state,
					authenticatedUser: false,
					canLoad: false
				}
			}
			return {
				...state,
				authenticatedUser: action.payload,
				canLoad: false
			}
		}
		case START_FETCH_AUTHENTICATED_USER: {
			return {
				...state,
				canLoad: true
			}
		}
		case API_LOGOUT:
			return {
				...initialState
			};
		default:
			return state;
	}
	return state;
}

let initialStateLoading = {
	loading: false
}

let loadingReducer = function(state = initialStateLoading, action) {
	switch (action.type) {
		default:
			return state;
	}
}

export default combineReducers({
	views: viewsReducer,
	services: servicesReducer,
	loading: loadingReducer,
	components: componentsReducer
})