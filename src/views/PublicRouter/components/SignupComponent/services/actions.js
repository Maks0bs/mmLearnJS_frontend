import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_SIGNUP, CLEAR_MESSAGES } = types;
/**
 * @namespace storeState.views.public.signupActions
 */

/*
	Adapts the user data for API request
 */
let configureUserData = (user) => {
	if (user.teacherChecked){
		delete user.teacherChecked;
		user.teacher = true;
	}
}

/**
 * Sends the user data to the API to create a new account.
 * See API docs for details
 * @async
 * @function
 * @param {Object} user - the user data to create a new account with (see API docs for details)
 * @return {function(*): Promise<any | void>}
 *
 * @memberOf storeState.views.public.signupActions
 */
export let signup = (user) => (dispatch) => {
	configureUserData(user);
	return fetch(`${REACT_APP_API_URL}/auth/signup`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify(user)
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_SIGNUP,
		payload: data
	}))
	.catch(err => console.log(err))
}

/**
 * Sends the user data to the API to create a new account.
 * It sends an invitation token as well, which specifies some additional user data
 * See API docs for details
 * @async
 * @function
 * @param {Object} user - the user data to create a new account with (see API docs for details)
 * This object contains the invitation token with some details
 * @param {string} token
 * @return {function(*): Promise<ReduxAction>}
 *
 * @memberOf storeState.views.public.signupActions
 */
export let inviteSignup = (user, token) => (dispatch) => {
	configureUserData(user);
	return fetch(`${REACT_APP_API_URL}/auth/invite-signup/${token}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify(user)
	})
		.then(res => res.json())
		.then(data => dispatch({
			type: API_SIGNUP,
			payload: data
		}))
		.catch(err => console.log(err))
}

/**
 * Clears status and error messages on the sign up page
 * @function
 * @return {function(*): Promise<any | void | Response>}
 * @memberOf storeState.views.public.signupActions
 */
export let clearMessages = () => (dispatch) => {
	return dispatch({
		type: CLEAR_MESSAGES
	})
}