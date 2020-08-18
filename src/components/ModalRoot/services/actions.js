import types from './actionTypes'

export let showModal = (component) => dispatch => {
	dispatch({
		type: types.signinModal.SHOW,
		modalComponent: component
	})
}

export let hideModal = () => dispatch => {
	dispatch({
		type: types.signinModal.HIDE
	})
}