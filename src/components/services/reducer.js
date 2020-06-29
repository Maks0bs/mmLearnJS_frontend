import modalRootReducer from '../ModalRoot/services/reducer'
import toastRootReducer from '../ToastRoot/services/reducer'
import { combineReducers } from 'redux'

export default combineReducers({
    modalRoot: modalRootReducer,
    toastRoot: toastRootReducer
})