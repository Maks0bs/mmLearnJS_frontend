import {REACT_APP_API_URL} from "../../constants";
import types from './actionTypes'
let {
    API_LOGOUT,
    API_FETCH_AUTHENTICATED_USER
} = types;

/**
 * Puts the authenticated user to redux store
 * Even though this function returns a promise with user data,
 * prefer using the updated prop in the component
 * @async
 * @function
 * @return {function(*): Promise<Object|string|Response>}
 */
export let getAuthenticatedUser = () => (dispatch) => {
    return fetch(`${REACT_APP_API_URL}/auth/cur-user`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: API_FETCH_AUTHENTICATED_USER,
                payload: data
            })
            return data;
        })
        .catch(err => console.log(err))
}

/**
 * Clears the current authenticated user cookie thus logging the user out
 * @async
 * @function
 * @returns {function(*): Promise<Response>}
 */
export let logout = () => (dispatch) => {
    return fetch(`${REACT_APP_API_URL}/auth/logout`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })
        .then(() => dispatch({
            type: API_LOGOUT
        }))
}