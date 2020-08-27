import {REACT_APP_API_URL} from '../constants'

/**
 * @typedef ReduxDispatchType
 * @type string
 * @description a string which specifies, what redux action you want to dispatch,
 * all located in actionTypes.js files
 */
/**
 *
 * @async
 * @param {FormData} filesForm
 * @param {ReduxDispatchType} returnDispatchType
 * @return {function(*): Promise<any | void>}
 */
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

/**
 *
 * @async
 * @param {Object} filter - specifies the way, how the API should filter result courses
 * @param {ReduxDispatchType} returnDispatchType
 * @return {function(*): Promise<any | void>}
 */
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

/**
 * @deprecated
 * @async
 * @param {Object} filter - specifies the way, how the API should filter result courses
 * @param {ReduxDispatchType} returnDispatchType
 * @return {function(*): Promise<any | void>}
 */
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
		/*
			Don't do res.json(), because files are binary
		 */
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

/**
 *
 * @async
 * @param {string} fileId
 * @param {ReduxDispatchType} returnDispatchType
 * @param {Object} options
 * @return {function(*): Promise<Response | void>}
 */
export let streamFileById = (fileId, returnDispatchType, options) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/files/stream/${fileId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
		/*
			Don't do res.json(), because files are binary
		 */
	.then(res => {
		return dispatch({
			type: returnDispatchType,
			payload: res.body,
			options: options
		})
	})
	.catch(err => console.log(err))
}

/**
 * @async
 * @param {string} userId
 * @param {ReduxDispatchType} returnDispatchType
 * @return {function(*): Promise<any | void>}
 */
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