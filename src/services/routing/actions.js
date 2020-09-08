import types from './actionTypes'
let {
	ADD_NAV_ITEM,
	REMOVE_NAV_ITEM
} = types;

/**
 * @namespace storeState.routingActions
 */

/**
 * @typedef RouterNavItem
 * @type {Object}
 * @property {string} id
 * @property {string} name
 * @property {string} path
 * @description navigation item data, it is used in toolbar in the first place
 */

/**
 * Adds the specified navigation item to the routing stack
 * @function
 * @param {RouterNavItem} item
 * @return {function(*): ReduxAction}
 *
 * @memberOf storeState.routingActions
 */
export let addNavItem = (item) => (dispatch) => {
	return dispatch({
		type: ADD_NAV_ITEM,
		payload: item
	})
}

/**
 * Removes the navigation item with the specified id from the routing stack
 * @function
 * @param {string} id - the id of the navigation item you want to remove
 * @return {function(*): ReduxAction}
 *
 * @memberOf storeState.routingActions
 */
export let removeNavItem = (id) => (dispatch) => {
	return dispatch({
		type: REMOVE_NAV_ITEM,
		payload: id
	})
}
