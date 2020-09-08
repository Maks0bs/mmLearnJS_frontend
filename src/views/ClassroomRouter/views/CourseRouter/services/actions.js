import { REACT_APP_API_URL } from '../../../../../constants'
import {getCoursesFiltered} from "../../../../../services/actions";
import types from './actionTypes'
let {
	API_GET_COURSE_BY_ID,
	API_UPDATE_COURSE
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
 * @param {?string} [returnDispatchType=] - the type of action to be dispatched after
 * receiving confirmation (or error) of updating the course
 * @return {function(*): Promise<ReduxAction|any|Response>}
 * @memberOf storeState.views.classroom.course.courseServicesActions
 */
export let updateCourse = (updateData, id, returnDispatchType) => (dispatch) => {
	console.log(returnDispatchType);
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
 * @async
 * @function
 * @param {string} courseId
 * @return {function(*): Promise<any|Response>}
 * @memberOf storeState.views.classroom.course.courseServicesActions
 */
export let getCourseById = (courseId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			courseId: courseId,
			viewCourses: true
		},
		API_GET_COURSE_BY_ID
	))
}