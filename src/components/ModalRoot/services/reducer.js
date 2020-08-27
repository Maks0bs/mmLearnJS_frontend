import actionTypes from './actionTypes'


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
    	case actionTypes.signinModal.SHOW:
      		return {
      			...state,
				modalComponent: action.payload
            }
    	case actionTypes.signinModal.HIDE:
      		return initialState
    	default:
      		return state
  	}
}