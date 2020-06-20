import types from './actionTypes'
import { getUserById } from '../../../../../services/actions'
import {REACT_APP_API_URL} from "../../../../../constants";
let {
    API_GET_USER_BY_ID,
    API_UPDATE_USER,
    FILE_ERROR,
    CLEAR_MESSAGES,
    REDIRECT_TO_PROFILE
} = types;

export let getUser = (userId) => (dispatch) => {
    return dispatch(getUserById(userId, API_GET_USER_BY_ID));
}

export let updateUser = (data, id) => (dispatch) => {
    let form = new FormData();

    if (data.fileSize > 10000000){
        return dispatch({
            type: FILE_ERROR
        })
    }

    if (data.photo){
        form.append('files', data.photo);
        data.fileSize = undefined;
        data.photo = undefined;
    }

    console.log(data);
    form.set('newUserData', JSON.stringify(data));

    return fetch(`${REACT_APP_API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
        },
        credentials: 'include',
        body: form
    })
        .then(res => res.json())
        .then(data => {
            console.log('received data', data);
            dispatch({
                type: API_UPDATE_USER,
                payload: data
            })
        })
        .catch(err => console.log(err))
}

export let clearMessages = () => (dispatch) => {
    return dispatch({
        type: CLEAR_MESSAGES
    })
}
