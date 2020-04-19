import modalRootReducer from '../ModalRoot/services/reducer'
import { combineReducers } from 'redux'

export default combineReducers({
    modalRoot: modalRootReducer
})