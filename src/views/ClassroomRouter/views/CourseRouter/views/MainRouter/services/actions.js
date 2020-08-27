import { getCoursesFiltered } from '../../../../../../../services/actions'
import { REACT_APP_API_URL } from '../../../../../../../constants'
import types from './actionTypes'

let { 
	API_GET_COURSE_BY_ID,
	API_VIEW_COURSE,
	CLEANUP,
	GET_FIRST_TIME_STATUS
} = types;

/**
 *
 * @return {function(*): Promise<boolean>}
 */
export let getFirstTimeStatus = () => (dispatch) => {

	/**
	 * Reading from local storage might be async, return promise
	 * @return {Promise} promise that resolves the storage operation and dispatching action afterwards
	 */
	return new Promise((resolve => {
		let value = true;
		if (window && (typeof window !== 'undefined') && localStorage.getItem(GET_FIRST_TIME_STATUS	)){
			value = JSON.parse(localStorage.getItem(GET_FIRST_TIME_STATUS));
		} else {
			localStorage.setItem(GET_FIRST_TIME_STATUS, 'false');
		}

		resolve(value);
	}))
		.then((v) => {
			dispatch({
				type: GET_FIRST_TIME_STATUS,
				payload: v
			})

			return v;
		})
}

export let getCourseById = (courseId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			courseId: courseId,
			viewCourses: true
		},
		API_GET_COURSE_BY_ID
	))
}

export let viewCourse = (courseId) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/view/${courseId}`, {
		method: "POST",
		headers: {
		},
		credentials: 'include'
	})
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: API_VIEW_COURSE,
				payload: data
			})
		})
		.catch(err => console.log(err))
}

export let cleanup = () => (dispatch) => {
	return dispatch({
		type: CLEANUP
	})
}