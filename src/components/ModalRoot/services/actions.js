import types from './actionTypes'

export let showModal = (Component) => dispatch => {
	dispatch({
		type: types.signinModal.SHOW,
		ModalComponent: Component
	})
}

export let hideModal = () => dispatch => {
	dispatch({
		type: types.signinModal.HIDE
	})
}