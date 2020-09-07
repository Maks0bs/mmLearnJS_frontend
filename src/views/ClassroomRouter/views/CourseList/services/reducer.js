import types from './actionTypes'
let {
	API_GET_OPEN_COURSES,
	API_GET_ENROLLED_COURSES,
	API_GET_TEACHER_COURSES,
	API_GET_NOT_VIEWED_NOTIFICATIONS,
	CLEANUP
} = types;

/**
 * @typedef CourseListState
 * @type Object
 * @property {Object[]} enrolledCourses
 * @property {Object[]} teacherCourses
 * @property {Object[]} openCourses
 * @property {Object} notViewedNotifications - saves the amount of updates,
 * which the user hasn't seen since the last visit. These values are saved in a map,
 * courseId = key, amount of updates = value
 * @property {string|Object} error
 */

let initialState = {
	enrolledCourses: null,
	teacherCourses: null,
	openCourses: null,
	notViewedNotifications: {},
	error: ''
}
/**
 * @function courseListReducer
 * @param {CourseListState} state
 * @param {Object[]} state.enrolledCourses
 * @param {Object[]} state.teacherCourses
 * @param {Object[]} state.openCourses
 * @param {Object} state.notViewedNotifications - saves the amount of updates,
 * which the user hasn't seen since the last visit. These values are saved in a map,
 * courseId = key, amount of updates = value
 * @param {string|Object} state.error
 * @param {ReduxAction} action
 * @return {CourseListState}
 *
 * @memberOf storeState.views.classroom
 */
export default  function(state = initialState, action) {
	switch(action.type){
		case CLEANUP: {
			return initialState;
		}
		case API_GET_NOT_VIEWED_NOTIFICATIONS: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				notViewedNotifications: {
					...state.notViewedNotifications,
					...action.payload
				}
			}
		}
		case API_GET_OPEN_COURSES: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				openCourses: action.payload
			}
		}
		case API_GET_ENROLLED_COURSES: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				enrolledCourses: action.payload
			}
		}
		case API_GET_TEACHER_COURSES: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}
			return {
				...state,
				teacherCourses: action.payload
			}
		}
		default:
			return state;
	}
}
