import actionTypes from './actionTypes'

const initialState = {
     modalComponent: null
}

export default (state = initialState, action) => {
  	switch (action.type) {
    	case actionTypes.signinModal.SHOW:
      		return {
				modalComponent: action.modalComponent
            }
    	case actionTypes.signinModal.HIDE:
      		return initialState
    	default:
      		return state
  	}
}