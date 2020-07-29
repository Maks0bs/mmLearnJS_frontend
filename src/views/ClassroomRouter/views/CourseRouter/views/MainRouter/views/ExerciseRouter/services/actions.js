import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../../../constants'
let {
	GET_EXERCISE_FROM_COURSE,
	GET_STUDENT_ATTEMPTS,
	API_NEW_ATTEMPT,
	CLEANUP
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

export let getCurUserAttempts = (courseId, exerciseId) => dispatch => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/exercise/${exerciseId}/user-attempts`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
		.then(res => res.json())
		.then((data) => {
			//test delay
			return new Promise(resolve => {
				setTimeout(() => resolve(data), 1000)
			})
		})
		.then(data => dispatch({
			type: GET_STUDENT_ATTEMPTS,
			payload: data
		}))
		.catch(err => console.log(err))
}

export let newAttempt = (courseId, exerciseId) => dispatch => {
	return fetch(`${REACT_APP_API_URL}/courses/${courseId}/exercise/${exerciseId}/new-attempt`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
		.then(res => res.json())
		.then(data => dispatch({
			type: API_NEW_ATTEMPT,
			payload: data
		}))
		.catch(err => console.log(err))
}

export let cleanup = () => dispatch => {
	return dispatch({
		type: CLEANUP
	})
}
