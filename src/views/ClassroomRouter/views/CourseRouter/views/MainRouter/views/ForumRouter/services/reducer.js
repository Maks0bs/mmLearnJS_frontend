import types from './actionTypes'
let { 
	API_CREATE_TOPIC, 
	GET_FORUM_FROM_COURSE,
	API_ANSWER_TOPIC_POST,
	API_DELETE_TOPIC_POST,
	CLEANUP
} = types;

let initialState = {
	unread: [],
	forumData: null,
	error: ''
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_ANSWER_TOPIC_POST:
		case API_DELETE_TOPIC_POST:
		case API_CREATE_TOPIC: {
			return {
				...state,
				error: action.payload.error && action.payload.error.message
			}
		}
		case GET_FORUM_FROM_COURSE: {
			return {
				...state,
				forumData: action.payload
			}
		}
		case CLEANUP: {
			return initialState
		}
		default:
			return state;
	}
}