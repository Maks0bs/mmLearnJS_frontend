import signinReducer from '../Signin/services/reducer'
import activationMessageReducer from '../ActivationMessage/services/reducer'
import { combineReducers } from 'redux'

export default combineReducers({
    signin: signinReducer,
    activationMessage: activationMessageReducer
})