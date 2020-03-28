import types from './actionTypes'

export let showSigninModal = () => dispatch => {
	dispatch({
		type: types.signinModal.SHOW
	})
}

export let hideSigninModal = () => dispatch => {
	dispatch({
		type: types.signinModal.HIDE
	})
}

