import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../constants'
let { 
	API_CREATE_TOPIC, 
	GET_FORUM_FROM_COURSE, 
	CLEAR_FORUM_DATA,
	API_ANSWER_TOPIC_POST,
	API_DELETE_TOPIC_POST,
	CLEANUP
} = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let getForumFromCourse = (courseData, forumId) => (dispatch, getState) => {
	if (!courseData.sections){
		return dispatch({
			type: GET_FORUM_FROM_COURSE,
			payload: 'not accessible'
		})
	}
	for (let section of courseData.sections){
		for (let entry of section.entries){
			if (entry && entry._id === forumId){
				return dispatch({
					type: GET_FORUM_FROM_COURSE,
					payload: entry
				})
			}
		}
	}
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
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/forum/${forumId}/topic/
		${topicId}/post/${postId}/answer`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
		body: JSON.stringify({
			content: post
		})
	})
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


