import types from './actionTypes'
let {
    API_GET_USER_BY_ID,
    API_UPDATE_USER,
    FILE_ERROR,
    CLEAR_MESSAGES
} = types;

let initialState = {
    user: null,
    error: '',
    redirectToProfile: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case FILE_ERROR: {
            return {
                ...state,
                error: 'Image size should be less than 10Mb'
            }
        }
        case API_UPDATE_USER:
            if (action.payload.error){
                return {
                    ...state,
                    error: action.payload.error && action.payload.error.message,
                }
            } else{
                return {
                    ...state,
                    redirectToProfile: true
                }
            }
        case API_GET_USER_BY_ID:
            return {
                ...state,
                user: action.payload
            }
        case CLEAR_MESSAGES: {
            return {
                ...state,
                error: ''
            }
        }
        default:
            return state;
    }
}