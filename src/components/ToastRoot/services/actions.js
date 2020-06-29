import types from './actionTypes'

export let addToast = (component, options) => dispatch => {
	dispatch({
		type: types.ADD_TOAST,
		component: component,
		options: options
	})
}

export let deleteFirstToast = () => dispatch => {
	dispatch({
		type: types.DELETE_FIRST_TOAST
	})
}