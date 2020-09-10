import { REACT_APP_API_URL } from '../../../../../constants'
import {getCoursesFiltered} from "../../../../../services/actions";
import types from './actionTypes'
let {
	API_GET_COURSE_BY_ID,
	API_UPDATE_COURSE,
	API_UPDATE_COURSE_JSON_ONLY
} = types;

/**
 * @namespace storeState.views.classroom.course.courseServicesActions
 */

/**
 * @async
 * @function
 * @param {FormData} updateData - the form should contain a part of {@link CourseData}-Object
 * under the `"newCourseData"` key and (if necessary) files to
 * be uploaded to the server under the `"files"` key. If the files
 * are a part of an entry then provide the entry and section numbers of the
 * correspondent file under the `"filesPositions"` key. See API docs for details
 * @param {string} id - the id of the course that is going to be updated
 * @param {?string} [returnDispatchType=API_UPDATE_COURSE] - the type of
 * action to be dispatched after
 * receiving confirmation (or error) of updating the course
 * @return {function(*): Promise<ReduxAction|any|Response>}
 * @memberOf storeState.views.classroom.course.courseServicesActions
 */
export let updateCourse = (updateData, id, returnDispatchType) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/update/${id}`, {
		method: "PUT",
		headers: {},
		credentials: 'include',
		body: updateData
	})
	.then(res => res.json())
	.then(data => (
		dispatch({
			type: returnDispatchType || API_UPDATE_COURSE,
			payload: data
		})
	))
	.catch(err => console.log(err))
}

/**
 * @description see {@link updateCourse}
 * @async
 * @function
 * @param {Object} courseData - the object with new course data,
 * should be a part of {@link CourseData}-Object. See {@link updateCourse}
 * @param {string} id - the id of the course that is going to be updated
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.courseServicesActions
 */
export let updateCourseJSON = (courseData, id) => (dispatch) => {
	let form = new FormData();
	form.set('newCourseData', JSON.stringify(courseData));
	return dispatch(updateCourse(
		form, id,
		API_UPDATE_COURSE_JSON_ONLY
	))
}

/**
 * @description puts the detailed (as fas as possible) course data
 * into the {@link storeState.views.classroom.course.courseServicesReducer}-Reducer
 * @async
 * @function
 * @param {string} courseId
 * @param {?UserData} [user] - the context user to test some statements or
 * perform certain actions with that user
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.courseServicesActions
 */
export let getCourseById = (courseId, user) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			courseId: courseId,
			viewCourses: true
		},
		API_GET_COURSE_BY_ID,
		user
	))
}