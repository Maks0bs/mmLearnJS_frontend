import types from './actionTypes'
let {
	API_GET_UPDATES_BY_DATE,
	UPDATE_STARTING_INDEX,
	CLEANUP,
	UPDATE_FILTER
} = types;

/**
 * @typedef DashboardState
 * @type Object
 * @property {string} lastDataFrom - the date, starting from
 * which the news should be shown and which was used during the last api call
 * @property {string} lastDataTo - the date till which the news should be shown
 * and which was used during the last api call
 * @property {string|Object} error
 * @property {?Object[]} updatesData - the data with the news
 * about courses to which the user is subscribed to.
 * See API docs for details
 * @property {boolean} noMoreUpdates - true if the the user has already loaded
 * all news that are available to them.
 * @property {number} startingIndex - the index which defines the start of
 * the list with news, returned by the api call if the user loads more news.
 * See API docs fro details
 * @property {string} curDateFrom
 * @property {string} curDateTo
 * @property {string} coursesFilterType - can be `"all"` or `"choose"`
 * @property {string[]} chosenCourses
 */

let initialState = {
	lastDateFrom: '',
	lastDateTo: '',
	error: '',
	updatesData: null,
	noMoreUpdates: false,
	startingIndex: 0,
	curDateFrom: '',
	curDateTo: '',
	coursesFilterType: 'all'
}
/**
 * @function dashboardReducer
 * @param {DashboardState} state
 * @param {string} state.lastDataFrom
 * @param {string} state.lastDataTo
 * @param {string|Object} state.error
 * @param {?Object[]} state.updatesData - the data with the news
 * about courses to which the user is subscribed to.
 * See API docs for details
 * @param {boolean} state.noMoreUpdates - true if the the user has already loaded
 * all news that are available to them.
 * @param {number} state.startingIndex - the index which defines the start of
 * the list with news, returned by the api call if the user loads more news.
 * See API docs fro details
 * @param {string} state.curDateFrom
 * @param {string} state.curDateTo
 * @param {ReduxAction} action
 * @param {string} state.coursesFilterType - can be `"all"` or `"choose"`
 * @param {string[]} state.chosenCourses
 * @return {DashboardState}
 *
 * @memberOf storeState.views.classroom
 */
export default function(state = initialState, action) {
	switch(action.type){
		case CLEANUP: {
			return initialState;
		}
		case UPDATE_FILTER: {
			return {
				...state,
				...action.payload
			}
		}
		case UPDATE_STARTING_INDEX: {
			return {
				...state,
				startingIndex: action.payload
			}
		}
		case API_GET_UPDATES_BY_DATE: {

			if (action.payload.data.error){
				return {
					...state,
					error: action.payload.data.error.message,
					updatesData: null
				}
			} else {
				let newState = {
					...state,
					lastDateFrom: action.payload.dateFrom,
					lastDateTo: action.payload.dateTo,
					error: ''
				}
				newState.noMoreUpdates = action.payload.data.length < action.payload.cnt;

				if (action.payload.starting === 0){
					newState.updatesData = action.payload.data;
				} else {
					newState.updatesData = [...state.updatesData].concat(action.payload.data);
				}
				return newState;
			}
		}
		default:
			return state;
	}
}
