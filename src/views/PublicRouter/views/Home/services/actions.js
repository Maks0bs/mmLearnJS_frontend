import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_FETCH_NEWS, CLEANUP } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export const fetchNews = () => (dispatch) => {
	fetch(`${REACT_APP_API_URL}/news`, {
		method: "GET",
		credentials: 'include'
	})
	.then(res => res.json())
	.then(news => dispatch({
		type: API_FETCH_NEWS,
		payload: news
	}))
	.catch(err => console.log(err))
}

export let cleanup = () => (dispatch) => {
	dispatch({
		type: CLEANUP
	})
}