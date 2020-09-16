import types from './actionTypes'
import { cloneDeep, assign } from 'lodash'
import { v1 as uuidv1 } from 'uuid';
import { combineReducers } from "redux";
import editorReducer from '../components/EditExercise/services/reducer'
import {newTaskByType} from "./helpers";
import {removeItemShallow} from "../../../../../../../services/helpers";
let {
	UPDATE_EXERCISES,
	ADD_EXERCISE,
	EDIT_EXERCISE,
	DELETE_EXERCISE,
	RESTORE_DELETED_EXERCISE,
	PRE_DELETE_EXERCISE,
	COPY_EXERCISES_FROM_OLD_DATA,
	ADD_ERROR,
	ADD_NEW_TASK,
	CLEANUP,
	EDIT_TASK
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
		case COPY_EXERCISES_FROM_OLD_DATA: {
			return {
				...state,
				newExercises: cloneDeep(action.payload)
			}
		}
		case UPDATE_EXERCISES: {
			return {
				...state,
				newExercises: [...action.payload]
			}
		}
		case ADD_EXERCISE: {
			let newExercise = {
				name: 'New exercise',
				participants: [],
				tasks: [],
				available: true,
				weight: 1
			}
			return {
				...state,
				newExercises: [...state.newExercises, newExercise]
			}
		}
		case EDIT_EXERCISE: {
			let newExercises = [...state.newExercises];
			assign(newExercises[action.payload.num], action.payload.exercise);
			return {
				...state,
				newExercises: newExercises
			}
		}
		case PRE_DELETE_EXERCISE: {
			let { num } = action.payload;
			let newExercises = [...state.newExercises]
			let curId = uuidv1();
			let deletedExercise = {...newExercises[num]}
			newExercises[num] = {
				deletedId: curId,
				deleted: true,
				name: deletedExercise.name
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
		case DELETE_EXERCISE: {
			return {
				...state,
				newExercises: removeItemShallow(
					state.newExercises, action.payload.num
				)
			}
		}
		case RESTORE_DELETED_EXERCISE: {
			let { num } = action.payload;
			let newExercises = [...state.newExercises]
			let curId = newExercises[num].deletedId;
			newExercises[num] = {...state.deletedExercises[curId]}
			return {
				...state,
				newExercises: newExercises,
				deletedExercises: {
					...state.deletedExercises,
					[curId]: undefined
				}
			}
		}
		case ADD_NEW_TASK: {
			let { exerciseNum, type } = action.payload;
			let newTask = newTaskByType(type)
			let newExercises = [...state.newExercises];
			newExercises[exerciseNum].tasks =
				[...newExercises[exerciseNum].tasks, newTask]
			return {
				...state,
				newExercises: newExercises
			}
		}
		case EDIT_TASK: {
			let { task, exerciseNum, taskNum } = action.payload;
			let newExercises = [...state.newExercises]
			let newTasks = [...newExercises[exerciseNum].tasks]
			newTasks[taskNum] = assign(newTasks[taskNum], task);
			newExercises[exerciseNum].tasks = newTasks;
			return {
				...state,
				newExercises: newExercises
			}
		}
		case ADD_ERROR: {
			return {
				...state,
				error: action.payload
			}
		}
		case CLEANUP: {
			return initialState;
		}
		default:
			return state;
	}
}

export default combineReducers({
	services: servicesReducer,
	editor: editorReducer
})