import types from './actionTypes'
let {
	API_GET_SUMMARIES
} = types;

let initialState = {
	summaries: null,
	userToExerciseDict: {},
	error: ''
}

export default function(state = initialState, action) {

	switch(action.type){
		case API_GET_SUMMARIES: {
			if (action.payload.error){
				return {
					...state,
					error: action.payload.error.message || action.payload.error
				}
			}

			let summaries = action.payload, dict = {}

			for (let s of summaries){
				for (let e = 0; e < s.exercises.length; e++){
					let ex = s.exercises[e];
					let maxScore = -1;
					for (let a of ex.attempts){
						if (a.score && a.score > maxScore){
							maxScore = a.score;
						}
					}
					if (!dict[s.id]){
						dict[s.id] = {}
					}
					dict[s.id][ex.id] = {
						index: e,
						maxScore: maxScore,
						attemptsAmount: ex.attempts.length
					};
				}
			}

			console.log('reduce', summaries)

			return {
				...state,
				summaries: summaries,
				userToExerciseDict: dict
			}
		}
		default:
			return state;
	}
}
