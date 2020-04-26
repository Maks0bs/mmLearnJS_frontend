import types from './actionTypes'
let { API_CREATE_TOPIC, GET_FORUM_FROM_COURSE } = types;

let initialState = {
	unread: [],
	forumDat: {}
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_CREATE_TOPIC: {
			console.log('create topic');
			return {
				...state
			}
		}
		case GET_FORUM_FROM_COURSE: {
			return {
				...state
			}
		}
		default:
			return state;
	}
}