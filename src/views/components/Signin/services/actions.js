import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../constants'
let { API_SIGNIN, CLEAR_MESSAGES } = types;

/**
 * @namespace storeState.views.components.signinActions
 */

/**
 * @async
 * @function
 * @param {Object} user - the credentials of the user, that we want to authenticate
 * @return {function(*): Promise<ReduxAction>}
 *
 * @memberOf storeState.views.components.signinActions
 */
export let signin = (user) => (dispatch) => {
	dispatch({type: CLEAR_MESSAGES});
	return fetch(`${REACT_APP_API_URL}/auth/signin`, {
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
		type: API_SIGNIN,
		payload: data
	}))
	.catch(err => console.log(err))
}


/**
 * @function
 * @return {function(*): ReduxAction}
 *
 * @memberOf storeState.views.components.signinActions
 */
export let clearMessages = () => (dispatch) => {
	return dispatch({
		type: CLEAR_MESSAGES
	})
}