import types from './actionTypes'
let {
	HIDE,
	SHOW
} = types

/**
 * Displays the specified component inside a modal, which can be easily closed
 * @function
 * @param {?React.Component|JSX.Element} component
 * @return {function(*): ReduxAction}
 *
 * @memberOf storeState.componentsActions
 */
export let showModal = (component) => dispatch => {
	return dispatch({
		type: SHOW,
		payload: component
	})
}

/**
 * Close the modal and remove all refs to its component
 * @function
 * @return {function(*): ReduxAction}
 *
 * @memberOf storeState.componentsActions
 */
export let hideModal = () => dispatch => {
	return dispatch({
		type: HIDE
	})
}