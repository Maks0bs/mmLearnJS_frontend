import types from './actionTypes'
let {
	API_GET_UPDATES_BY_DATE
} = types;

let initialState = {
	lastDateFrom: '',
	lastDateTo: '',
	error: '',
	updatesData: null
}

export default function(state = initialState, action) {
	switch(action.type){
		case API_GET_UPDATES_BY_DATE: {
			if (action.payload.data.error){
				return {
					...state,
					error: action.payload.data.error.message
				}
			} else {
				return {
					...state,
					lastDateFrom: action.payload.dateFrom,
					lastDateTo: action.payload.dateTo,
					updatesData: action.payload.data
				}
			}
		}
		default:
			return state;
	}
}
