import types from './actionTypes'
let { 
	GET_EXERCISE_FROM_COURSE
} = types;

let initialState = {
	exercise: {}
}

export default function(state = initialState, action) {
	switch(action.type){
		case GET_EXERCISE_FROM_COURSE: {
			return {
				...state,
				exercise: action.payload
			}
		}
		default:
			return state;
	}
}