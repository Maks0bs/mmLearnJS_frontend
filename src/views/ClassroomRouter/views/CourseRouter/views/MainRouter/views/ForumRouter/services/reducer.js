import types from './actionTypes'
let { 
	API_CREATE_TOPIC, 
	GET_FORUM_FROM_COURSE, 
	CLEAR_FORUM_DATA,
	API_ANSWER_TOPIC_POST
} = types;

let initialState = {
	unread: [],
	forumData: null,
	error: ''
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_ANSWER_TOPIC_POST:
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
		case CLEAR_FORUM_DATA: {
			return {
				...state,
				forumData: {}
			}
		}
		default:
			return state;
	}
}