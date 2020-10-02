import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_ACTIVATE_ACCOUNT, CLEAR_MESSAGES } = types;

/**
 * @namespace storeState.views.public.activateAccountActions
 */

/**
 * Sends the a request to the api to activate the account, which
 * is encoded in the token.
 * See API docs for details
 * @async
 * @function
 * @param {Object} token - the token which contains the encoded user data
 * @return {function(*): Promise<any | void>}
 *
 * @memberOf storeState.views.public.activateAccountActions
 */
export let activateAccount = (token) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/auth/activate/${token}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_ACTIVATE_ACCOUNT,
		payload: data
	}))
	.catch(err => console.log(err))
}

/**
 * @function
 * @return {function(*): Promise<any | void | Response>}
 * @memberOf storeState.views.public.activateAccountActions
 */
export let clearMessages = () => (dispatch) => {
	return dispatch({
		type: CLEAR_MESSAGES
	})
}