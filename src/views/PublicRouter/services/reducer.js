import { combineReducers } from 'redux'
import homeReducer from '../views/Home/services/reducer'
import signupReducer from '../views/Signup/services/reducer'
import activateAccountReducer from '../views/ActivateAccount/services/reducer'
import inviteSignupReducer from '../views/InviteSignup/services/reducer'
import forgotPasswordReducer from '../views/ForgotPassword/services/reducer'
import resetPasswordReducer from '../views/ResetPassword/services/reducer'

// here we collect ALL reducers from views directory
export default combineReducers({
	home: homeReducer,
	signup: signupReducer,
	activateAccount: activateAccountReducer,
	inviteSignup: inviteSignupReducer,
	forgotPassword: forgotPasswordReducer,
	resetPassword: resetPasswordReducer
})