import signinReducer from '../Signin/services/reducer'
import modalRootReducer from '../ModalRoot/services/reducer'
import { combineReducers } from 'redux'

export default combineReducers({
    modalRoot: modalRootReducer,
    signin: signinReducer
})