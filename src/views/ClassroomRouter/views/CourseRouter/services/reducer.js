import { combineReducers } from 'redux'
import mainReducer from '../views/Main/services/reducer'
import createCourseReducer from '../views/CreateCourse/services/reducer'
import editCourseRouter from '../views/EditCourse/services/reducer'

// here we collect ALL reducers from views directory
export default combineReducers({
	main: mainReducer,
	create: createCourseReducer,
	edit: editCourseRouter
})