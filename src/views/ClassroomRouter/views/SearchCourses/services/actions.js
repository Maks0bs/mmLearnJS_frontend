import types from './actionTypes'
import { getCoursesFiltered } from '../../../../../services/actions'
let {
	API_SEARCH_COURSES,
	CLEANUP
} = types;

/**
 * @namespace storeState.views.classroom.searchCoursesActions
 */

/**
 * @async
 * @function
 * @param {string} key - the keyword of the query to filter the courses with
 * @return {function(*): Promise<any | void>}
 *
 * @memberOf storeState.views.classroom.searchCoursesActions
 */
export let searchCourses = (key) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			searchWord: key,
			select: ['_id', 'name', 'about', 'type', 'updates']
		},
		API_SEARCH_COURSES
	))
}

/**
 * Cleans any error notifications/messages
 * @function
 * @return {function(*): ReduxAction}
 *
 * @memberOf storeState.views.classroom.searchCoursesActions
 */
export let cleanup = () => (dispatch) => {
	return dispatch({
		type: CLEANUP
	})
}

