import actionTypes from './actionTypes'
import { toast } from 'react-toastify'
let {
    ADD_TOAST
} = actionTypes

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
        case ADD_TOAST:
            let { options, component } = action.payload
            let t;
            if (!options || !options.type){
                t = toast(component);
            } else if (options && options.type){

                switch (options.type){
                    case 'info':
                        t = toast.info(component);
                        break;
                    case 'success':
                        t = toast.success(component);
                        break;
                    case 'error':
                        t = toast.error(component);
                        break;
                    default:
                        t = toast(component)
                }
            }
      		return {
                toastsList: [...state.toastsList, t]
            }
    	default:
      		return state
  	}
}