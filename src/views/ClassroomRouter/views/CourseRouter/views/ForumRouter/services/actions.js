import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../constants'
let {
	API_CREATE_TOPIC,
	API_GET_FORUM_BY_ID,
	API_ANSWER_TOPIC_POST,
	API_DELETE_TOPIC_POST,
	CLEANUP
} = types;

/**
 * @namespace storeState.views.classroom.course.forumActions
 */

/**
 * @function
 * @async
 * @param {string} courseId
 * @param {string} forumId
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.forumActions
 */
export let getForumById = (courseId, forumId) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/forum/${forumId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
		.then(res => res.json())
		.then(data => {
			return dispatch({
				type: API_GET_FORUM_BY_ID,
				payload: data
			})
		})
		.catch(err => console.log(err))
}

/**
 * @function
 * @async
 * @param {string} courseId
 * @param {string} forumId
 * @param {string|Object} content
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.forumActions
 */
export let createTopic = (courseId, forumId, content) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/forum/${forumId}/new-topic`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify(content)
	})
	.then(res => res.json())
	.then(data => {
		dispatch({
			type: API_CREATE_TOPIC,
			payload: data
		})
	})
	.catch(err => console.log(err))
}
/**
 * @function
 * @async
 * @param {string} courseId
 * @param {string} forumId
 * @param {string} topicId
 * @param {string} postId
 * @param {string|Object} post
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.forumActions
 */
export let answerTopicPost = (
	courseId, forumId, topicId, postId, post
) => dispatch => {
	return fetch(
		`${REACT_APP_API_URL}/courses/${courseId}/forum/${forumId}/topic/` +
		`${topicId}/post/${postId}/answer`,
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			credentials: 'include',
			body: JSON.stringify({
				content: post
			})
		}
	)
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: API_ANSWER_TOPIC_POST,
				payload: data
			})
		})
		.catch(err => console.log(err))
}

/**
 * @function
 * @async
 * @param {string} courseId
 * @param {string} forumId
 * @param {string} topicId
 * @param {string} postId
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.forumActions
 */
export let deleteTopicPost = (
	courseId, forumId, topicId, postId
) => dispatch => {
	return fetch(
		`${REACT_APP_API_URL}/courses/${courseId}/forum/${forumId}/topic/` +
		`${topicId}/post/${postId}`,
		{
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			credentials: 'include'
		}
	)
		.then(res => res.json())
		.then(data => (
			dispatch({
				type: API_DELETE_TOPIC_POST,
				payload: data
			})
		))
		.catch(err => console.log(err))
}

/**
 * @function
 * @async
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.forumActions
 */
export let cleanup = () => (dispatch) => {
	return dispatch({ type: CLEANUP })
}