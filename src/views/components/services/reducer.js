import signinReducer from '../Signin/services/reducer'
import activationMessageReducer from '../ActivationMessage/services/reducer'
import { combineReducers } from 'redux'

/**
 * @namespace storeState.views.components
 */
/**
 * @namespace components.views.components
 */

/**
 *
 * @description `signin` - the reducer for the signin component, it handles user authentication
 * @description `activationMessage` - reducer for notifying the user, if their account
 * is not activated (displayed above the navigation bar at the top of each page)
 */
export default combineReducers({
    signin: signinReducer,
    activationMessage: activationMessageReducer
})