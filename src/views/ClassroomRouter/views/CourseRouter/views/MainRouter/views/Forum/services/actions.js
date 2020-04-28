import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../../../constants'
let { API_CREATE_TOPIC, GET_FORUM_FROM_COURSE } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let getForumFromCourse = (courseData, forumId) => (dispatch, getState) => {
	console.log('course', courseData);
	for (let section of courseData.sections){
		for (let entry of section.entries){
			if (entry._id === forumId){
				return dispatch({
					type: GET_FORUM_FROM_COURSE,
					payload: entry
				})
			}
		}
	}
}

export let createTopic = (/*args!!!!!!!!!!!!!!!!*/) => (dispatch) => {
	
	return dispatch({
		type: API_CREATE_TOPIC,
		payload: 'topic'
	})
}
