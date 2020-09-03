import types from './actionTypes'
let {
    API_GET_USER_BY_ID,
    API_UPDATE_USER,
    SET_HIDDEN_FIELDS,
    FILE_ERROR,
    API_SEND_ACTIVATION,
    API_DELETE_USER,
    CLEANUP,
    EDIT_PHOTO,
    UPDATE_USER_DATA_LOCAL,
    FORBIDDEN_FIELD_ERROR
} = types;

/**
 * @typedef UserRouterState
 * @type Object
 * @property {Object} user - all relevant user data. See API docs for details
 * @property {Object} newUserData - the data that user entered while using
 * the form
 * @property {Object} newPhotoData - the data of the newly uploaded photo, not yet
 * sent to the server
 * @property {BinaryType} newPhotoData.photo - the reference to the uploaded file
 * @property {number} newPhotoData.fileSize
 * @property {string|Object} error
 * @property {string} message
 * @property {boolean} redirectToProfile
 * @property {string[]} newHiddenFields - list of field names, that
 * should not be displayed to users, who are viewing the profile
 */
let initialState = {
    user: null,
    error: '',
    redirectToProfile: false,
    newHiddenFields: [],
    newUserData: {
        name: "", email: "", about: "",
        oldPassword: "", newPassword: "",
    },
    newPhotoData: {
        photo: null,
        fileSize: 0
    },
    message: ''
}


/**
 * @function userRouterReducer
 * @param {UserRouterState} state
 * @param {Object} state.user - all relevant user data. See API docs for details
 * @param {Object} state.newUserData - the data that user entered while using
 * the form
 * @param {Object} state.newPhotoData - the data of the newly uploaded photo, not yet
 * sent to the server
 * @param {BinaryType} state.newPhotoData.photo - the reference to the uploaded file
 * @param {number} state.newPhotoData.fileSize
 * @param {string|Object} state.error
 * @param {string} state.message
 * @param {boolean} state.redirectToProfile
 * @param {string[]} state.newHiddenFields - list of field names, that
 * should not be displayed to users, who are viewing the profile
 * @param {ReduxAction} action
 * @return {UserRouterState}
 *
 * @memberOf storeState.views.classroom
 */
export default function(state = initialState, action) {
    switch(action.type){
        case FILE_ERROR: {
            return {
                ...state,
                error: 'Photo file should not be more than 10Mb'
            }
        }
        case FORBIDDEN_FIELD_ERROR: {
            return {
                ...state,
                error: 'There are some fields that you cannot update in the user data. Refreshing' +
                    'the page might help'
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
        case UPDATE_USER_DATA_LOCAL: {
            return {
                ...state,
                newUserData: {
                    ...state.newUserData,
                    ...action.payload
                },
                error: ''
            }
        }
        case EDIT_PHOTO: {
            return {
                ...state,
                newPhotoData: action.payload,
                error: ''
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
        case CLEANUP: {
            return initialState;
        }
        default:
            return state;
    }
}