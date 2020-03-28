import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_ACTIVATE_ACCOUNT } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let activateAccount = (token) => (dispatch) => {
	console.log('token', token);
	return fetch(`${REACT_APP_API_URL}/auth/activate`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({token})
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: API_ACTIVATE_ACCOUNT,
		payload: data
	}))
	.catch(err => console.log(err))
}