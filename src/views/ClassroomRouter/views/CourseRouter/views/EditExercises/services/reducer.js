import types from './actionTypes'
import { cloneDeep, assign } from 'lodash'
import { v1 as uuidv1 } from 'uuid';
import { combineReducers } from "redux";
import editorReducer from '../components/EditPanel/components/EditExercise/services/reducer'
let { 
	API_GET_COURSE_BY_ID,
	UPDATE_EXERCISES,
	ADD_EXERCISE,
	EDIT_EXERCISE,
	DELETE_EXERCISE,
	RESTORE_DELETED_EXERCISE,
	PRE_DELETE_EXERCISE,
	API_UPDATE_EXERCISES,
	CLEAR_MESSAGES,
} = types;

let initialState = {
	oldCourseData: {},
	courseData: {},
	deletedExercises: {},
	error: ''
}

let servicesReducer = function(state = initialState, action) {
	switch(action.type){
		case API_GET_COURSE_BY_ID: {
			return {
				...state,
				oldCourseData: action.payload[0],
				courseData: action.payload[0]
			}
		}
		case UPDATE_EXERCISES:
			return {
				...state,
				courseData: {
					...state.courseData,
					exercises: action.payload
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
				courseData: {
					...state.courseData,
					exercises: [...state.courseData.exercises, newExercise]
				}
			}
		}
		case EDIT_EXERCISE: {
			let newExercises = cloneDeep(state.courseData.exercises);
			assign(newExercises[action.payload.num], action.payload.exercise);
			return {
				...state,
				courseData: {
					...state.courseData,
					exercises: newExercises
				}
			}
		}
		case DELETE_EXERCISE: {
			let newExercises = cloneDeep(state.courseData.exercises);
			newExercises.splice(action.payload.num, 1);
			return {
				...state,
				courseData: {
					...state.courseData,
					exercises: newExercises
				}
			}
		}
		case PRE_DELETE_EXERCISE: {
			let { num } = action.payload;
			// TODO get rid of deep cloning
			let newExercises = cloneDeep(state.courseData.exercises);
			let curId = uuidv1();
			let deletedExercise = cloneDeep(newExercises[num]);
			let deletedName = newExercises[num].name;
			newExercises[num] = {
				deletedId: curId,
				deleted: true,
				name: deletedName
			}
			return {
				...state,
				courseData: {
					...state.courseData,
					exercises: newExercises
				},
				deletedExercises: {
					...state.deletedExercises,
					[curId]: deletedExercise
				}
			}
		}
		case RESTORE_DELETED_EXERCISE: {
			let { num } = action.payload;
			let curId = state.courseData.exercises[num].deletedId;
			let newExercises = cloneDeep(state.courseData.exercises);
			newExercises[num] = cloneDeep(state.deletedExercises[curId]);
			return {
				...state,
				courseData: {
					...state.courseData,
					exercises: newExercises
				},
				deletedExercises: {
					...state.deletedExercises,
					[curId]: undefined
				}
			}
		}
		case API_UPDATE_EXERCISES: {
			//TODO remove unused refs
			return {
				...initialState,
				oldCourseData: state.oldCourseData,
				courseData: state.courseData
			}
		}
		case CLEAR_MESSAGES: {
			return {
				...state,
				error: ''
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