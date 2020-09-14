import signinReducer from '../Signin/services/reducer'
import activationMessageReducer from '../ActivationMessage/services/reducer'
import { combineReducers } from 'redux'

/**
 * @namespace components.views.serviceComponents
 */

/**
 * @description `signin` - the reducer for the signin component, it handles user authentication
 * @description `activationMessage` - reducer for notifying the user, if their account
 * is not activated (displayed above the navigation bar at the top of each page)
 * @namespace storeState.views.serviceComponents
 * @memberOf storeState.views
 */
export default combineReducers({
    signin: signinReducer,
    activationMessage: activationMessageReducer
})