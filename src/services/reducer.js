import { combineReducers } from 'redux'
import viewsReducer from '../views/services/reducer'

export default combineReducers({
	views: viewsReducer
})