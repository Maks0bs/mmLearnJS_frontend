import signinReducer from '../Signin/services/reducer'
import { combineReducers } from 'redux'

export default combineReducers({
    signin: signinReducer
})