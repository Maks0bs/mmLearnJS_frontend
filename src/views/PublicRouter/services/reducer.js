import { combineReducers } from 'redux'
import homeReducer from '../views/Home/services/reducer'
import signupReducer from '../components/SignupComponent/services/reducer'
import activateAccountReducer from '../views/ActivateAccount/services/reducer'
import forgotPasswordReducer from '../views/ForgotPassword/services/reducer'
import resetPasswordReducer from '../views/ResetPassword/services/reducer'
/**
 * @namespace storeState.views.public
 */

export default combineReducers({
	home: homeReducer,
	signup: signupReducer,
	activateAccount: activateAccountReducer,
	forgotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer
})