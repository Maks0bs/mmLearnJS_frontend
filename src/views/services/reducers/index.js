import { combineReducers } from 'redux'
import publicReducer from '../../PublicRouter/services/reducers'

// here we collect ALL reducers from views directory
export default combineReducers({
	public: publicReducer
})