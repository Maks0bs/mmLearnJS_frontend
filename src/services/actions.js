import types from './actionTypes'
import { REACT_APP_API_URL } from '../constants'
let {
	API_FETCH_AUTHENTICATED_USER,
	START_FETCH_AUTHENTICATED_USER,
	API_LOGOUT
} = types;

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
	.then(data => dispatch({
		type: API_FETCH_AUTHENTICATED_USER,
		payload: data
	}))
	.catch(err => console.log(err))
}

export let logout = () => (dispatch) => {
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

export let uploadFiles = (filesForm, returnDispatchType) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/files/upload`, {
		method: "POST",
		headers: {
			Accept: "application/json"
		},
		credentials: 'include',
		body: filesForm
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: returnDispatchType,
		payload: data
	}))
	.catch(err => console.log(err))
}

export let getCoursesFiltered = (filter, returnDispatchType) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/filter`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify(filter)
	})
	.then(res => res.json())
	.then(data => dispatch({
		type: returnDispatchType,
		payload: data
	}))
	.catch(err => console.log(err))
}

export let getFilesFiltered = (filter, returnDispatchType, ref) => (dispatch) => {
	console.log('ref get files filtered', ref);
	return fetch(`${REACT_APP_API_URL}/files/filter`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify(filter)
	})
	.then(res => res.json())
	.then(data => {
		if (ref){
			if (ref.byId === true){
				ref.data = data[0];
			}
		}
		dispatch({
			type: returnDispatchType,
			payload: data
		})
	})
	.catch(err => console.log(err))
}

export let streamFileById = (fileId, returnDispatchType, options) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/files/stream/${fileId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
	//.then(res => res.json())
	.then(res => {
		console.log('response', res);
		return dispatch({
			type: returnDispatchType,
			payload: res.body,
			options: options
		})
	})
	.catch(err => console.log(err))
}

export let getUsersFiltered = (filter, returnDispatchType) => (dispatch) => {

}

export let getUserById = (userId, returnDispatchType) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/users/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		return dispatch({
			type: returnDispatchType,
			payload: data
		})
	})
	.catch(err => console.log(err))
}