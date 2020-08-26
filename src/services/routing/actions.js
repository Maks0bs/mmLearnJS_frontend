import types from './actionTypes'
let {
	ADD_NAV_ITEM,
	REMOVE_NAV_ITEM
} = types;

/**
 * @typedef RouterNavItem
 * @type {Object}
 * @property {string} id
 * @property {string} name
 * @property {string} path
 * @description navigation item data, it is used in toolbar in the first place
 */

/**
 *
 * @function
 * @param {RouterNavItem} item
 * @return {function(*): ReduxAction}
 */
export let addNavItem = (item) => (dispatch) => {
	return dispatch({
		type: ADD_NAV_ITEM,
		payload: item
	})
}

/**
 *
 * @param {string} id - the id of the navigation item you want to remove
 * @return {function(*): ReduxAction}
 */
export let removeNavItem = (id) => (dispatch) => {
	return dispatch({
		type: REMOVE_NAV_ITEM,
		payload: id
	})
}
