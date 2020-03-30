import types from './actionTypes'
import { REACT_APP_API_URL } from '../constants'
let { EXTEND_SESSION } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let extendSession = () => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/auth/extend-session`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
	.then(res => res.json())
	.then(res => {console.log(res); return res;})
	.then(data => dispatch({
		type: EXTEND_SESSION,
		payload: data
	}))
	.catch(err => console.log(err))
}