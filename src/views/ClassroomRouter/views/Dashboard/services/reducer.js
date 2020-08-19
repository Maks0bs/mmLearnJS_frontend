import types from './actionTypes'
let {
	API_GET_UPDATES_BY_DATE
} = types;

let initialState = {
	lastDateFrom: '',
	lastDateTo: '',
	error: '',
	updatesData: null,
	noMoreUpdates: false
}

export default function(state = initialState, action) {
	switch(action.type){
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
