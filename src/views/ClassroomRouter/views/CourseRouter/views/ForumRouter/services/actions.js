import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../constants'
let { 
	API_CREATE_TOPIC, 
	GET_FORUM_FROM_COURSE, 
	API_GET_FORUM_BY_ID,
	API_ANSWER_TOPIC_POST,
	API_DELETE_TOPIC_POST,
	CLEANUP
} = types;

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
			console.log('rf', data);
			return dispatch({
				type: API_GET_FORUM_BY_ID,
				payload: data
			})
		})
		.catch(err => console.log(err))
}

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
		console.log('received data new topic', data);
		dispatch({
			type: API_CREATE_TOPIC,
			payload: data
		})
	})
	.catch(err => console.log(err))
}

export let answerTopicPost = (courseId, forumId, topicId, postId, post) => dispatch => {
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

export let deleteTopicPost = (courseId, forumId, topicId, postId) => dispatch => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/forum/${forumId}/topic/
		${topicId}/post/${postId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
	.then(res => res.json())
	.then(data => {
		dispatch({
			type: API_DELETE_TOPIC_POST,
			payload: data
		})
	})
	.catch(err => console.log(err))
}

export let cleanup = () => (dispatch) => {
	return dispatch({
		type: CLEANUP
	})
}


