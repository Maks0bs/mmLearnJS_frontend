import { combineReducers } from 'redux'
import courseListReducer from '../views/CourseList/services/reducer'
import courseReducer from '../views/CourseRouter/services/reducer'
import dashboardReducer from '../views/Dashboard/services/reducer'
import userReducer from '../views/UserRouter/services/reducer'
import searchCoursesReducer from '../views/SearchCourses/services/reducer'
import createCourseReducer from '../views/CreateCourse/services/reducer'
/**
 * @namespace storeState.views.classroom
 * @memberOf storeState.views
 */
export default combineReducers({
	courseList: courseListReducer,
	dashboard: dashboardReducer,
	course: courseReducer,
	user: userReducer,
	searchCourses: searchCoursesReducer,
	createCourse: createCourseReducer
})