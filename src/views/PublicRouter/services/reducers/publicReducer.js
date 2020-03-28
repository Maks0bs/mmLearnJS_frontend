import actionTypes from '../actionTypes'

const initialState = {}

export default (state = initialState, action) => {
  	switch (action.type) {
    	case actionTypes.signinModal.SHOW:
      		return state
    	case actionTypes.signinModal.HIDE:
      		return state
    	default:
      		return state
  	}
}