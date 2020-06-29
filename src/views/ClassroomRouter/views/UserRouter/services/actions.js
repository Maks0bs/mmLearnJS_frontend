import types from './actionTypes'
import React from "react";
import { getUserById } from '../../../../../services/actions'
import {REACT_APP_API_URL} from "../../../../../constants";
import toastTypes from "../../../../../components/ToastRoot/services/actionTypes";

let {
    ADD_TOAST
} = toastTypes
let {
    API_GET_USER_BY_ID,
    API_UPDATE_USER,
    SET_HIDDEN_FIELDS,
    FILE_ERROR,
    CLEAR_ERROR,
    API_SEND_ACTIVATION
} = types;

export let getUser = (userId) => (dispatch) => {
    return dispatch(getUserById(userId, API_GET_USER_BY_ID));
}

export let updateUser = (data, id) => (dispatch) => {
    let form = new FormData();

    if (data.fileSize > 10000000){
        dispatch({
            type: FILE_ERROR
        });

        return new Promise((resolve, reject) => {
            resolve(true);
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

export let setHiddenFields = (newFields) => (dispatch) => {
    return dispatch({
        type: SET_HIDDEN_FIELDS,
        payload: newFields
    })
}

export let clearError = () => (dispatch) => {
    return dispatch({
        type: CLEAR_ERROR
    })
}

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