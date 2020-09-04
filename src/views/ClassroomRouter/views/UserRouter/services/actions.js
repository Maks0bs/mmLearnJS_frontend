import types from './actionTypes'
import React from "react";
import { getUserById } from '../../../../../services/actions'
import {REACT_APP_API_URL} from "../../../../../constants";
import { EDITABLE_USER_FIELDS } from "./helpers";

let {
    API_GET_USER_BY_ID,
    API_UPDATE_USER,
    SET_HIDDEN_FIELDS,
    FILE_ERROR,
    API_SEND_ACTIVATION,
    API_DELETE_USER,
    CLEANUP,
    UPDATE_USER_DATA_LOCAL,
    FORBIDDEN_FIELD_ERROR
} = types;

/**
 * @namespace storeState.views.classroom.userRouterActions
 */

/**
 * @async
 * @function
 * @param {string} userId
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.userRouterActions
 */
export let getUser = (userId) => (dispatch) => {
    return dispatch(getUserById(userId, API_GET_USER_BY_ID));
}

/**
 * @async
 * @function
 * @param {string} userId
 * @param {Object} data - the data to update the user with.
 * See API docs for details
 * @return {function(*): Promise<any|void>}
 * @memberOf storeState.views.classroom.userRouterActions
 */
export let updateUser = (data, userId) => (dispatch) => {
    let form = new FormData();
    // It's only possible to transport file here using getState
    // Ref to file disappears, if we call updateUser
    // from the react component

    console.log('data', data);

    for (let key in data){
        if (data.hasOwnProperty(key)){
            if (!EDITABLE_USER_FIELDS.includes(key)){
                dispatch({
                    type: FORBIDDEN_FIELD_ERROR
                });
                // Mock async performance even if no request has been made
                return new Promise((resolve) => {
                    resolve(true);
                })
            }
        }
    }

    if (data.photoSize > 10000000){
        dispatch({
            type: FILE_ERROR
        });
        // Mock async performance even if no request has been made
        return new Promise((resolve) => {
            resolve(true);
        })
    }

    if (data.photo && data.photoSize > 0){
        form.append('files', data.photo);
        // clear file data from json body part, it's already serialized in the form
        data.fileSize = undefined
        // Notify the API that there isa new uploaded profile photo
        data.photo = 'new';
    }
    form.set('newUserData', JSON.stringify(data));

    return fetch(`${REACT_APP_API_URL}/users/${userId}`, {
        method: "PUT",
        headers: {},
        credentials: 'include',
        body: form
    })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: API_UPDATE_USER,
                payload: data
            })
        })
        .catch(err => console.log(err))
}

/**
 *
 * @function
 * @param {Object} data - new user data, that the user entered in the form
 * See API docs for details. This object should contain one of the
 * user model attributes
 * @return {function(*): Promise<ReduxAction>}
 */
export let editUserData = (data) => dispatch => {
    return dispatch({
        type: UPDATE_USER_DATA_LOCAL,
        payload: data
    })
}

/**
 * @function
 * @param {string[]} newFields
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.userRouterActions
 */
export let setHiddenFields = (newFields) => (dispatch) => {
    return dispatch({
        type: SET_HIDDEN_FIELDS,
        payload: newFields
    })
}

/**
 * @async
 * @function
 * @return {function(*): Promise<any|void>}
 * @memberOf storeState.views.classroom.userRouterActions
 */
export let sendActivation = () => (dispatch) => {
    return fetch(`${REACT_APP_API_URL}/auth/send-activation`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => dispatch({
            type: API_SEND_ACTIVATION,
            payload: data
        }))
        .catch(err => console.log(err))
}

/**
 * @async
 * @function
 * @param {string} userId
 * @return {function(*): Promise<any|void>}
 * @memberOf storeState.views.classroom.userRouterActions
 */
export let deleteUser = (userId) => (dispatch) => {
    return fetch(`${REACT_APP_API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => dispatch({
            type: API_DELETE_USER,
            payload: data
        }))
        .catch(err => console.log(err))
}

/**
 * @function
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.userRouterActions
 */
export let cleanup = () => (dispatch) => {
    return dispatch({
        type: CLEANUP
    })
}