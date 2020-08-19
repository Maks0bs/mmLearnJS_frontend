import { combineReducers } from 'redux'
import viewsReducer from '../views/services/reducer'
import componentsReducer from '../components/services/reducer'
import types from './actionTypes'
import { cloneDeep, isEqual } from 'lodash'
let {
	API_FETCH_AUTHENTICATED_USER,
	API_LOGOUT,
	ADD_NAV_ITEM,
	REMOVE_NAV_ITEM
} = types;

let initialState = {
	authenticatedUser: null
}

let servicesReducer = function(state = initialState, action) {
	switch(action.type){
		case API_FETCH_AUTHENTICATED_USER:{
			if (isEqual(state.authenticatedUser, action.payload)){
				return state;
			}
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
			return {
				initialState
			}
		default:
			return state;
	}
}

let initialStateRouting = {
	navItems: []
}

let routingReducer = function(state = initialStateRouting, action) {
	switch (action.type) {
		case ADD_NAV_ITEM: {
			return {
				...state,
				navItems: [...state.navItems, action.payload]
			}
		}
		case REMOVE_NAV_ITEM: {
			let navItems = cloneDeep(state.navItems);
			for (let i = 0; i < navItems.length; i++){
				if (navItems[i].id === action.payload){
					navItems.splice(i, 1);
					break;
				}
			}
			if (navItems.length === state.navItems.length){
				return state;
			}
			return {
				...state,
				navItems: navItems
			}
		}
		default:
			return state;
	}
}

export default combineReducers({
	views: viewsReducer,
	services: servicesReducer,
	routing: routingReducer,
	components: componentsReducer
})