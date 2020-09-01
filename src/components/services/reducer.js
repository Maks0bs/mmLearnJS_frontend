import modalRootReducer from '../ModalRoot/services/reducer'
import toastRootReducer from '../ToastRoot/services/reducer'
import { combineReducers } from 'redux'
/**
 * @namespace storeState.componentsActions
 */

/**
 *
 * @description `modalRoot` - the reducer for handling modal component and displaying / closing it,
 * `toastRoot` - the reducer to display / hide toasts
 * @namespace storeState.components
 * @memberOf storeState
 *
 */
export default combineReducers({
    modalRoot: modalRootReducer,
    toastRoot: toastRootReducer
})