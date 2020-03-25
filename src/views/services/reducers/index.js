import { combineReducers } from 'redux'
import homeReducer from '../../Home/services/reducer'

// here we collect ALL reducers from views directory
export default combineReducers({
	homeReducer
})