import types from './actionTypes'

export let showSigninModal = () => dispatch => {
	dispatch({
		type: types.signinModal.SHOW,
		modalType: 'SIGNIN'
	})
}

export let hideSigninModal = () => dispatch => {
	dispatch({
		type: types.signinModal.HIDE
	})
}

