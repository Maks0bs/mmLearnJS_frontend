import actionTypes from './actionTypes'
import { toast } from 'react-toastify'

/**
 * @typedef ToastRootState
 * @type Object
 * @property {Object[]} toastsList the list of toasts that were manually displayed
 */

const initialState = {
     toastsList: []
}

/**
 * @function toastRootReducer
 * @param {ToastRootState} state
 * @param {ReduxAction} action
 * @param {Object[]} state.toastsList  the list of toasts that were manually displayed
 * @return {ToastRootState}
 *
 * @memberOf storeState.components
 */
export default (state = initialState, action) => {
  	switch (action.type) {
        case actionTypes.ADD_TOAST:
            let options = action.options;
            let t;
            if (!options || !options.type){
                t = toast(action.component);
            } else if (options && options.type){

                switch (options.type){
                    case 'info':
                        t = toast.info(action.component);
                        break;
                    case 'success':
                        t = toast.success(action.component);
                        break;
                    case 'error':
                        t = toast.error(action.component);
                        break;
                    default:
                        t = toast(action.component)
                }
            }
      		return {
                toastsList: [...state.toastsList, t]
            }
    	default:
      		return state
  	}
}