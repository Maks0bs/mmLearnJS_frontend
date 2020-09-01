import types from './actionTypes'
import { cloneDeep } from 'lodash'
let {
	ADD_NAV_ITEM,
	REMOVE_NAV_ITEM
} = types;

/**
 * @typedef RoutingState
 * @type Object
 * @property {Object[]} navItems the list of navigation items, that
 * are currently present in the path of the page
 */

let initialState = {
	navItems: []
}

/**
 * @function routingReducer
 * @param {RoutingState} state
 * @param {ReduxAction} action
 * @param {Object[]} state.navItems the list of navigation items, that
 * are currently present in the path of the page
 * @return {RoutingState}
 *
 * @memberOf storeState
 */
export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_NAV_ITEM: {
			/*
				Don't add an item, that is already present
			 */
			for (let i of state.navItems){
				if (action.payload.id === i.id){
					return state;
				}
			}
			return {
				...state,
				navItems: [...state.navItems, action.payload]
			}
		}
		case REMOVE_NAV_ITEM: {

			/*
				Search for the specified id and delete the item, if present.
				Clone the items beforehand to avoid updating redux state
				outside of the final dispatch process
			 */
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
