import { combineReducers } from 'redux'
import dashboardReducer from '../views/Dashboard/services/reducer'
import courseReducer from '../views/CourseRouter/services/reducer'
import userReducer from '../views/UserRouter/services/reducer'

// here we collect ALL reducers from views directory
export default combineReducers({
	dashboard: dashboardReducer,
	course: courseReducer,
	user: userReducer
})