import types from './actionTypes'
let {
    API_GET_USER_BY_ID,
    API_UPDATE_USER,
    SET_HIDDEN_FIELDS,
    FILE_ERROR,
    CLEAR_ERROR,
    API_SEND_ACTIVATION,
    API_DELETE_USER
} = types;

let initialState = {
    user: null,
    error: '',
    redirectToProfile: false,
    newHiddenFields: [],
    message: ''
}

export default function(state = initialState, action) {
    switch(action.type){
        case CLEAR_ERROR: {
            return {
                ...state,
                error: ''
            }
        }
        case FILE_ERROR: {
            return {
                ...state,
                error: 'Photo file should not be more than 10Mb'
            }
        }
        case API_DELETE_USER: {
            if (action.payload.error) {
                return {
                    ...state,
                    error: action.payload.error && action.payload.error.message,
                }
            } else {
                return initialState;
            }
        }
        case API_SEND_ACTIVATION:
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
        case SET_HIDDEN_FIELDS: {
            return {
                ...state,
                newHiddenFields: [...action.payload]
            }
        }
        case API_GET_USER_BY_ID:
            return {
                ...state,
                user: action.payload,
                newHiddenFields: action.payload.hiddenFields
            }
        default:
            return state;
    }
}