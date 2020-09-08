import types from './actionTypes'
let {
	HIDE,
	SHOW
} = types
/**
 * @typedef ModalRootState
 * @type Object
 * @property {?React.Component|JSX.Element } modalComponent the component that should be
 * displayed inside the modal root
 * that should be displayed inside the modal
 */

const initialState = {
	modalComponent: null
}
/**
 * @function modalRootReducer
 * @param {ModalRootState} state
 * @param {ReduxAction} action
 * @param {React.Component|JSX.Element} state.modalComponent the component, that should be
 * displayed inside the modal root
 * @return {ModalRootState}
 *
 * @memberOf storeState.components
 */
export default (state = initialState, action) => {
  	switch (action.type) {
    	case SHOW:
      		return {
      			...state,
				modalComponent: action.payload
            }
    	case HIDE:
      		return initialState
    	default:
      		return state
  	}
}