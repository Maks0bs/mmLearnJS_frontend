import types from './actionTypes'
import { cloneDeep, assign } from 'lodash'
import { v1 as uuidv1 } from 'uuid';
import { combineReducers } from "redux";
import editorReducer from '../components/EditExercise/services/reducer'
let {
	UPDATE_EXERCISES,
	ADD_EXERCISE,
	EDIT_EXERCISE,
	DELETE_EXERCISE,
	RESTORE_DELETED_EXERCISE,
	PRE_DELETE_EXERCISE,
	COPY_EXERCISES_FROM_OLD_DATA
} = types;

/**
 * @namespace storeState.views.classroom.course.editExercises
 */

/**
 * @typedef EditExercisesServicesState
 * @type Object
 * @property {?Object|string} editorError
 * @property {CourseExercise[]} newExercises - the exercises that are stored
 * while the teacher is editing the course
 * @property {Object.<string, CourseExercise>} deletedExercises - locally deleted
 * sections during the edit process. Can be restored.
 */

let initialState = {
	newExercises: null,
	deletedExercises: {},
	editorError: ''
}

/**
 * @function editExercisesServicesReducer
 * @param {EditExercisesServicesState} state
 * @param {ReduxAction} action
 * @param {?Object|string} state.editorError
 * @param {CourseExercise[]} state.newExercises - the exercises that are stored
 * while the teacher is editing the course
 * @param {Object.<string, CourseExercise>} state.deletedExercises - locally deleted
 * sections during the edit process. Can be restored.
 * @return {EditExercisesServicesState}
 *
 * @memberOf storeState.views.classroom.course.editExercises
 */
let servicesReducer = function(state = initialState, action) {
	switch(action.type){
		case UPDATE_EXERCISES:
		case COPY_EXERCISES_FROM_OLD_DATA: {
			return {
				...state,
				newExercises: cloneDeep(action.payload)
			}
		}
		case ADD_EXERCISE: {
			let newExercise = {
				name: 'New exercise',
				participants: [],
				tasks: [],
				available: true,
				weight: '1'
			}
			return {
				...state,
				newExercises: [...state.newExercises, newExercise]
			}
		}
		case EDIT_EXERCISE: {
			let newExercises = cloneDeep(state.newExercises);
			assign(newExercises[action.payload.num], action.payload.exercise);
			return {
				...state,
				newExercises: newExercises
			}
		}
		case DELETE_EXERCISE: {
			let newExercises = cloneDeep(state.newExercises);
			newExercises.splice(action.payload.num, 1);
			return {
				...state,
				newExercises: newExercises
			}
		}
		case PRE_DELETE_EXERCISE: {
			let { num } = action.payload;
			let newExercises = cloneDeep(state.newExercises);
			let curId = uuidv1();
			let deletedExercise = cloneDeep(newExercises[num]);
			newExercises[num] = {
				deletedId: curId,
				deleted: true,
				name: newExercises[num].name
			}
			return {
				...state,
				newExercises: newExercises,
				deletedExercises: {
					...state.deletedExercises,
					[curId]: deletedExercise
				}
			}
		}
		case RESTORE_DELETED_EXERCISE: {
			let { num } = action.payload;
			let curId = state.newExercises[num].deletedId;
			let newExercises = cloneDeep(state.newExercises);
			newExercises[num] = cloneDeep(state.deletedExercises[curId]);
			return {
				...state,
				newExercises: newExercises,
				deletedExercises: {
					...state.deletedExercises,
					[curId]: undefined
				}
			}
		}
		default:
			return state;
	}
}

export default combineReducers({
	services: servicesReducer,
	editor: editorReducer
})