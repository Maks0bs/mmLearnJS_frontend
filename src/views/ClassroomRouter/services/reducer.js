import { combineReducers } from 'redux'
import dashboardReducer from '../views/Dashboard/services/reducer'

// here we collect ALL reducers from views directory
export default combineReducers({
	dashboard: dashboardReducer
})