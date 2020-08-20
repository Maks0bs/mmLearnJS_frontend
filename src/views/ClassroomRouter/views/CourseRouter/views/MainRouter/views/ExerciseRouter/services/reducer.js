import types from './actionTypes'
import { combineReducers } from 'redux'
import attemptReducer from '../views/Attempt/services/reducer'
let { 
	API_GET_EXERCISE_BY_ID,
	GET_STUDENT_ATTEMPTS,
	API_NEW_ATTEMPT,
	CLEANUP
} = types;

let initialState = {
	exercise: null,
	attempts: null,//they are sorted by time, the first one is always the latest one, may not be finished
	error: '',
	newAttemptId: null
}

let servicesReducer =  function(state = initialState, action) {

	switch(action.type){
		case GET_STUDENT_ATTEMPTS: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}


			return {
				...state,
				attempts: action.payload.attempts
			}
		}
		case API_GET_EXERCISE_BY_ID: {
			return {
				...state,
				exercise: action.payload
			}
		}
		case API_NEW_ATTEMPT: {
			return {
				...state,
				newAttemptId: action.payload.newAttempt._id
			}
		}
		case CLEANUP: {
			return initialState;
		}
		default:
			return state;
	}
}

export default combineReducers({
	services: servicesReducer,
	attempt: attemptReducer
})