import types from './actionTypes'
let { 
	API_CREATE_TOPIC, 
	API_GET_FORUM_BY_ID,
	API_ANSWER_TOPIC_POST,
	API_DELETE_TOPIC_POST,
	CLEANUP
} = types;

let initialState = {
	forum: null,
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
		case API_GET_FORUM_BY_ID: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error && action.payload.error.message
				}
			}
			return {
				...state,
				forum: action.payload
			}
		}
		case CLEANUP: {
			return initialState
		}
		default:
			return state;
	}
}