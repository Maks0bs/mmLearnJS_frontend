import { combineReducers } from 'redux'
import publicReducer from './publicReducer'
import homeReducer from '../../views/Home/services/reducer'

// here we collect ALL reducers from views directory
export default combineReducers({
	publicReducer,
	homeReducer
})