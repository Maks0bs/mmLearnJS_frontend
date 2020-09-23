import types from './actionTypes'
let {
	API_GET_SUMMARIES
} = types;

/**
 * @typedef ExerciseQuickSummary
 * @type Object
 * @property {number} index - the position of this exercise in the original API ordered list
 * @property {number} maxScore - max score that the given user has achieved among all attempts
 * @property {number} attemptsAmount - the overall amount of attempts that the user took
 * to solve the exercise
 */

/**
 * @typedef UserExerciseSummary
 * @type Object
 * @property {string} id - the id of the exercise in which the user has participated
 * @property {string} name the name of the exercise in which the user has participated
 * @property {CourseExerciseAttempt[]} attempts - the list of attempts
 * which the user took to solve the exercise
 */

/**
 * @typedef GradeSummary
 * @type Object
 * @property {string} userId
 * @property {string} userName
 * @property {UserExerciseSummary[]} exercises
 */

/**
 * @typedef GradesState
 * @type Object
 * @property {?Object|string} error
 * @property {GradeSummary[]} summaries - list of summaries for each user
 * that includes the scores which the users have achieved while participating in exercises
 * and info about their attempts in these exercises
 * @property {Object.<string, Object.<string, ExerciseQuickSummary > >} userToExerciseDict -
 * the dictionary that assign a user ID to the dictionary of exercise summaries
 * for all exercises in which the user has participated. These summaries are assigned
 * to the exercise id in the object. Quite complicated, but efficient!
 */

let initialState = {
	summaries: null,
	userToExerciseDict: {},
	error: ''
}

/**
 * @function gradesReducer
 * @param {GradesState} state
 * @param {?Object|string} state.error
 * @param {GradeSummary[]} state.summaries - list of summaries for each user
 * that includes the scores which the users have achieved while participating in exercises
 * and info about their attempts in these exercises
 * @param {Object.<string, Object.<string, ExerciseQuickSummary > >} state.userToExerciseDict -
 * the dictionary that assign a user ID to the dictionary of exercise summaries
 * for all exercises in which the user has participated. These summaries are assigned
 * to the exercise id in the object. Quite complicated, but efficient!
 * @param {ReduxAction} action
 * @return {GradesState}
 *
 * @memberOf storeState.views.classroom.course
 */
export default function(state = initialState, action) {

	switch(action.type){
		case API_GET_SUMMARIES: {
			if (action.payload.error){
				return {
					...state,
					error: JSON.stringify(
						action.payload.error.message || action.payload.error
					)
				}
			}
			let summaries = action.payload, dict = {}

			for (let s of summaries){
				let index = -1;
				for (let e of s.exercises){
					index++;
					let maxScore = e.attempts.reduce((mx, a) => (
						(
							parseFloat(a.score) &&
							Math.max(parseFloat(a.score), mx)
						) || mx),
						-1
					)
					if (!dict[s.userId]){
						dict[s.userId] = {}
					}
					dict[s.userId][e.id] = {
						index: index,
						exerciseName: e.name,
						maxScore: maxScore,
						attempts: e.attempts || []
					};
				}
			}
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
