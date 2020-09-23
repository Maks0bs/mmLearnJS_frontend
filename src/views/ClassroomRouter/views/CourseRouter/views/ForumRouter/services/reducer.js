import types from './actionTypes'
let { 
	API_CREATE_TOPIC, 
	API_GET_FORUM_BY_ID,
	API_ANSWER_TOPIC_POST,
	API_DELETE_TOPIC_POST,
	CLEANUP
} = types;

/**
 * @typedef ForumTopicPost
 * @type Object
 * @property {string} _id
 * @property {string} name
 * @property {?string|UserData} creator
 * @property {?string|Date} created
 * @property {?string|Date} updated
 * @property {string} content
 * @property {?string|ForumTopicPost[]} [answers]
 */

/**
 * @typedef ForumTopic
 * @type Object
 * @property {string} _id
 * @property {string} name
 * @property {?string|UserData} creator
 * @property {?string|Date} created
 * @property {ForumTopicPost[]} posts
 */
/**
 * @typedef ForumData
 * @type Object
 * @property {string} _id
 * @property {string} description
 * @property {boolean} teachersOnly - true if only teachers can post at this forum
 * @property {ForumTopic[]} topics
 */
/**
 * @typedef ForumState
 * @type Object
 * @property {?Object|string} error
 * @property {?ForumData} forum
 */

let initialState = {
	forum: null,
	error: ''
}

/**
 * @function forumReducer
 * @param {ForumState} state
 * @property {?Object|string} error
 * @property {?ForumData} forum
 * @param {ReduxAction} action
 * @return {ForumState}
 *
 * @memberOf storeState.views.classroom.course
 */
export default function(state = initialState, action) {
	switch(action.type){
		case API_ANSWER_TOPIC_POST:
		case API_DELETE_TOPIC_POST:
		case API_CREATE_TOPIC: {
			return {
				...state,
				error: action.payload.error && JSON.stringify(
					action.payload.error.message || action.payload.error
				)
			}
		}
		case API_GET_FORUM_BY_ID: {
			if (action.payload.error){
				return {
					...state,
					error: JSON.stringify(
						action.payload.error.message || action.payload.error
					)
				}
			}
			return {
				...state,
				forum: action.payload,
				error: ''
			}
		}
		case CLEANUP: {
			return initialState
		}
		default:
			return state;
	}
}