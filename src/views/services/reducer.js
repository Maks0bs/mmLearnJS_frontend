import { combineReducers } from 'redux'
import publicReducer from '../PublicRouter/services/reducer'
import componentsReducer from '../components/services/reducer'

// here we collect ALL reducers from views directory
export default combineReducers({
	public: publicReducer,
	components: componentsReducer
})