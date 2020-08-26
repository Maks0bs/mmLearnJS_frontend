import types from './actionTypes'

/**
 * Displays the toast and puts it to the stack of already existing toasts
 * @function
 * @param {React.Component | JSX.Element} component the component that should
 * be displayed inside the toast
 * @param {?Object} options
 * @param {string} options.type the type of the toast
 * @return {function(*): ReduxAction}
 */
export let addToast = (component, options) => dispatch => {
	return dispatch({
		type: types.ADD_TOAST,
		component: component,
		options: options
	})
}

/**
 * removes the first toasts that has been displayed from the stack
 * @function
 * @return {function(*): ReduxAction}
 */
export let deleteFirstToast = () => dispatch => {
	return dispatch({
		type: types.DELETE_FIRST_TOAST
	})
}