import { combineReducers } from 'redux'
import homeReducer from '../views/Home/services/reducer'
import signupReducer from '../views/Signup/services/reducer'
import activateAccountReducer from '../views/ActivateAccount/services/reducer'
import componentsReducer from '../components/services/reducer'

// here we collect ALL reducers from views directory
export default combineReducers({
	home: homeReducer,
	signup: signupReducer,
	activateAccount: activateAccountReducer,
	components: componentsReducer
})