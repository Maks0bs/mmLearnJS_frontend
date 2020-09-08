import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_RESET_PASSWORD } = types;

/**
 * @namespace storeState.views.public.resetPasswordActions
 */

/**
 * Sends a request to reset the password for the user, which is specified
 * in the `token`.
 * See API docs for details.
 * @async
 * @function
 * @param {Object} password - new password that will be set for the given user
 * @param {string} token - the token that specifies some user data
 * @return {function(*): Promise<any | void>}
 *
 * @memberOf storeState.views.public.resetPasswordActions
 */
export let resetPassword = (password, token) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/auth/reset-password`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify({
			token: token,
			newPassword: password
		})
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_RESET_PASSWORD,
		payload: data
	}))
	.catch(err => console.log(err))
}
