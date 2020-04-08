import actionTypes from './actionTypes'

const initialState = {
     ModalComponent: null
}

export default (state = initialState, action) => {
  	switch (action.type) {
    	case actionTypes.signinModal.SHOW:
      		return {
                ModalComponent: action.ModalComponent
            }
    	case actionTypes.signinModal.HIDE:
      		return initialState
    	default:
      		return state
  	}
}