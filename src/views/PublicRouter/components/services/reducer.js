import { combineReducers } from 'redux'
import signinReducer from '../Signin/services/reducer'

export default combineReducers({
	signin: signinReducer
})