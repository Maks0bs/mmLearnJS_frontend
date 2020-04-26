import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../../../constants'
let { API_CREATE_TOPIC, GET_FORUM_FROM_COURSE } = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let getForumFromCourse = (forumId) => (dispatch) => {

}

export let createTopic = (/*args!!!!!!!!!!!!!!!!*/) => (dispatch) => {
	
	return dispatch({
		type: API_CREATE_TOPIC,
		payload: 'topic'
	})
}
