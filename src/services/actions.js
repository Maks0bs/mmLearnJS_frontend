import types from './actionTypes'
import Cookies from 'js-cookie'
import { REACT_APP_API_URL } from '../constants'
let { API_AUTHENTICATED_USER, API_LOGOUT } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let getAuthenticatedUser = () => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/auth/cur-user`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
	.then(res => res.json())
	.then(res => {console.log(res); return res})
	.then(data => dispatch({
		type: API_AUTHENTICATED_USER,
		payload: data
	}))
	.catch(err => console.log(err))
}

export let logout = () => (dispatch) => {
	console.log('logout');
	return fetch(`${REACT_APP_API_URL}/auth/logout`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
	.then(data => dispatch({
		type: API_LOGOUT
	}))
}