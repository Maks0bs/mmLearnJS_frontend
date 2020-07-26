import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../../../constants'
let {
	GET_EXERCISE_FROM_COURSE
} = types;


export let getExerciseFromCourse = (courseData, exerciseId) => (dispatch) => {
	if (!courseData.exercises){
		return dispatch({
			type: GET_EXERCISE_FROM_COURSE,
			payload: 'not accessible'
		})
	}
	for (let e of courseData.exercises){
		if (e && e._id === exerciseId){
			return dispatch({
				type: GET_EXERCISE_FROM_COURSE,
				payload: e
			})
		}
	}

}
