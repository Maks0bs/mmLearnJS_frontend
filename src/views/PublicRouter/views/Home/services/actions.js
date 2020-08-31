import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../constants'
let { API_FETCH_NEWS, CLEANUP } = types;
/**
 * @namespace storeState.views.public.homeActions
 */

/**
 * Sends a request to receive news for the home page
 * @async
 * @function
 * @return {function(*): Promise<any | void>}
 *
 * @memberOf storeState.views.public.homeActions
 */
export const fetchNews = () => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/news`, {
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