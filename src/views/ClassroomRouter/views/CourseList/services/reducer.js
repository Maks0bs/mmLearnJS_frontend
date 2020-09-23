import types from './actionTypes'
let {
	API_GET_OPEN_COURSES,
	API_GET_ENROLLED_COURSES,
	API_GET_TEACHER_COURSES,
	API_GET_NOT_VIEWED_NOTIFICATIONS,
	CLEANUP,
	SET_LOADING
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
 * @property {Object} loading - the properties `"enrolled"`, `"teacher"` or `"open"`
 * are true if the correspondent course data is being loaded atm
 * @property {string|Object} error
 */

let initialState = {
	enrolledCourses: null,
	teacherCourses: null,
	openCourses: null,
	loading: {},
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
 * @param {Object} state.loading - the properties `"enrolled"`, `"teacher"` or `"open"`
 * are true if the correspondent course data is being loaded atm
 * @param {ReduxAction} action
 * @return {CourseListState}
 *
 * @memberOf storeState.views.classroom
 */
export default  function(state = initialState, action) {
	switch(action.type){
		case SET_LOADING: {
			return {
				...state,
				loading: {
					...state.loading,
					[action.payload.listName]: action.payload.value
				}
			}
		}
		case CLEANUP: {
			return {
				...state,
				notViewedNotifications: {},
				error: ''
			};
		}
		case API_GET_NOT_VIEWED_NOTIFICATIONS: {
			if (action.payload.error){
				return {
					...state,
					error: JSON.stringify(
						action.payload.error.message || action.payload.error
					)
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
					error: JSON.stringify(
						action.payload.error.message || action.payload.error
					),
					loading: {
						...state.loading,
						open: false
					}
				}
			}
			return {
				...state,
				openCourses: action.payload,
				loading: {
					...state.loading,
					open: false
				}
			}
		}
		case API_GET_ENROLLED_COURSES: {
			if (action.payload.error){
				return {
					...state,
					error: JSON.stringify(
						action.payload.error.message || action.payload.error
					),
					loading: {
						...state.loading,
						enrolled: false
					}
				}
			}
			return {
				...state,
				enrolledCourses: action.payload,
				loading: {
					...state.loading,
					enrolled: false
				}
			}
		}
		case API_GET_TEACHER_COURSES: {
			if (action.payload.error){
				return {
					...state,
					error: JSON.stringify(
						action.payload.error.message || action.payload.error
					),
					loading: {
						...state.loading,
						teacher: false
					}
				}
			}
			return {
				...state,
				teacherCourses: action.payload,
				loading: {
					...state.loading,
					teacher: false
				}
			}
		}
		default:
			return state;
	}
}