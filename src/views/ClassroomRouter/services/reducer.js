import { combineReducers } from 'redux'
import dashboardReducer from '../views/Dashboard/services/reducer'
import createCourseReducer from '../views/CreateCourse/services/reducer'
import courseReducer from '../views/Course/services/reducer'

// here we collect ALL reducers from views directory
export default combineReducers({
	dashboard: dashboardReducer,
	createCourse: createCourseReducer,
	course: courseReducer
})