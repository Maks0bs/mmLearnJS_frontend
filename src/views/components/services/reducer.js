import actionTypes from './actionTypes'

const initialState = {
     modalType: null
}

export default (state = initialState, action) => {
  	switch (action.type) {
    	case actionTypes.signinModal.SHOW:
      		return {
                modalType: action.modalType
            }
    	case actionTypes.signinModal.HIDE:
      		return initialState
    	default:
      		return state
  	}
}