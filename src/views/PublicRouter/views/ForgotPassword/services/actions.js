import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_FORGOT_PASSWORD } = types;

/**
 * @namespace storeState.views.public.forgotPasswordActions
 */

/**
 * Sends the an email with instructions on how
 * to recover the password or how to set a new one.
 * See API docs for details
 * @async
 * @function
 * @param {Object} email
 * @return {function(*): Promise<any | void>}
 *
 * @memberOf storeState.views.public.forgotPasswordActions
 */
export let forgotPassword = (email) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/auth/forgot-password`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify({
			email: email
		})
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_FORGOT_PASSWORD,
		payload: data
	}))
	.catch(err => console.log(err))
}
