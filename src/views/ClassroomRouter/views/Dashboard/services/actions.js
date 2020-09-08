import types from './actionTypes'
import {REACT_APP_API_URL} from "../../../../../constants";
let {
    API_GET_UPDATES_BY_DATE,
    CLEANUP,
    UPDATE_STARTING_INDEX,
    UPDATE_FILTER
} = types;
/**
 * @namespace storeState.views.classroom.dashboardActions
 */
/**
 * @async
 * @function
 * @param {string} dateFrom
 * @param {string} dateTo
 * @param {string[]} courses - the IDs of courses from which the client
 * wants to get updates
 * @param {number} starting - the number of the first index to start from
 * in the whole list of updates/news from which the API should
 * return the data. See API docs for details
 * @param {number} cnt - the max amount of news/updates entries that the user
 * wants to fetch. See API docs for details
 * @return {function(*): Promise<any|void>}
 * @memberOf storeState.views.classroom.dashboardActions
 */
export let getUpdatesByDate = (dateFrom, dateTo,
                               courses, starting, cnt
) => (dispatch) => {
    return fetch(`${REACT_APP_API_URL}/users/updates-by-date`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
            dateFrom,
            dateTo,
            courses,
            starting,
            cnt
        })
    })
        .then(res => res.json())
        .then(data => dispatch({
            type: API_GET_UPDATES_BY_DATE,
            payload: {
                data: data,
                dateFrom: dateFrom,
                dateTo: dateTo,
                cnt: cnt,
                starting: starting
            }
        }))
        .catch(err => console.log(err))
}
/**
 * @function
 * @param {number} index
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.dashboardActions
 */
export let updateStartingIndex = (index) => (dispatch) => {
    return dispatch({
        type: UPDATE_STARTING_INDEX,
        payload: index
    })
}
/**
 * @function
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.dashboardActions
 */
export let cleanup = () => (dispatch) => {
    return dispatch({type: CLEANUP})
}
/**
 * @function
 * @param {Object} data
 * @param {?string} data.from
 * @param {?string} data.to
 * @param {?string} data.coursesFilterType
 * @param {?string[]} data.chosenCourses
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.dashboardActions
 */
export let updateFilter = (data) => (dispatch) => {
    return dispatch({
        type: UPDATE_FILTER,
        payload: data
    })
}
