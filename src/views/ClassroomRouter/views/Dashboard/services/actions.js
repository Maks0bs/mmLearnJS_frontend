import types from './actionTypes'
import {REACT_APP_API_URL} from "../../../../../constants";
let {
    API_GET_UPDATES_BY_DATE
} = types;

export let getUpdatesByDate = (dateFrom, dateTo) => (dispatch) => {
    return fetch(`${REACT_APP_API_URL}/users/updates-by-date`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
            dateFrom,
            dateTo
        })
    })
        .then(res => res.json())
        .then(data => dispatch({
            type: API_GET_UPDATES_BY_DATE,
            payload: {
                data: data,
                dateFrom: dateFrom,
                dateTo: dateTo
            }
        }))
        .catch(err => console.log(err))
}
