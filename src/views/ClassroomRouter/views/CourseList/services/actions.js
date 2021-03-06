import types from './actionTypes'
import { getCoursesFiltered } from '../../../../../services/actions'
import {REACT_APP_API_URL} from "../../../../../constants";
import {LIST_TYPES} from "./helpers";
let {
	API_GET_OPEN_COURSES,
	API_GET_TEACHER_COURSES,
	API_GET_ENROLLED_COURSES ,
	API_GET_NOT_VIEWED_NOTIFICATIONS,
	CLEANUP,
	SET_LOADING
} = types;
/**
 * @namespace storeState.views.classroom.courseListActions
 */

/**
 * @async
 * @function
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.courseListActions
 */
export let getOpenCourses = () => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			type: 'open',
			select: ['_id', 'name', 'about', 'type', 'updates']
		},
		API_GET_OPEN_COURSES
	))
}

/**
 * @async
 * @function
 * @param {string} userId
 * @return {function(*): Promise<any | void>}
 *
 * @memberOf storeState.views.classroom.courseListActions
 */
export let getEnrolledCourses = (userId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			enrolled: userId,
			select: ['_id', 'name', 'about', 'type', 'updates']
		},
		API_GET_ENROLLED_COURSES
	))
}

/**
 * @async
 * @function
 * @param {string} userId
 * @return {function(*): Promise<any | void>}
 *
 * @memberOf storeState.views.classroom.courseListActions
 */
export let getTeacherCourses = (userId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			teacher: userId,
			select: ['_id', 'name', 'about', 'type']
		},
		API_GET_TEACHER_COURSES
	))
}

/**
 * @function
 * @return {function(*): ReduxAction}
 *
 * @memberOf storeState.views.classroom.courseListActions
 */
export let cleanup = () => (dispatch) => {
	return dispatch({
		type: CLEANUP
	})
}

/**
 * Adds notifications that specify, that the users hasn't viewed the courses, the IDs of
 * which are mentioned in the `courses` param (the user is subscribed to these courses).
 * This notification means, that there have been some update in the course, but the user hasn't yet
 * seen this new content. See API docs for details.
 * @async
 * @function
 * @param {string[]} courses - the list of IDs, for which the notifications should be added
 * @return {function(*): Promise<any | void>}
 *
 * @memberOf storeState.views.classroom.courseListActions
 */
export let addNotViewedNotifications = (courses) => (dispatch) => {
	let url = `${REACT_APP_API_URL}/users/updates-notifications`
	let query = courses.length > 0 ? ('?courses=' + courses.join('&courses=')) : ''
	return fetch(url + query, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		credentials: 'include',
	})
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: API_GET_NOT_VIEWED_NOTIFICATIONS,
				payload: data
			})
		})
		.catch(err => console.log(err))
}

/**
 * @function
 * @param {string} listName - should be `"enrolled"`, `"teacher"` or `"open"`
 * @param {boolean} value
 * @return {function(*): ReduxAction}
 *
 * @memberOf storeState.views.classroom.courseListActions
 */
export let setLoading = (listName, value) => (dispatch) => {
	if (!LIST_TYPES.includes(listName)) return;

	return dispatch({
		type: SET_LOADING,
		payload: {listName, value}
	})
}