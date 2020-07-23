import types from './actionTypes'
import {assign, cloneDeep} from "lodash";
import { v1 as uuidv1 } from 'uuid';
let {
	INIT_TASKS_EDITOR,
	ADD_NEW_TASK,
	EDIT_TASK,
	TOGGLE_TASK_EXPAND,
	CLEANUP
} = types;


let initialState = {
	tasks: [],
	expandedTasks: {}
}

export default function(state = initialState, action) {
	switch(action.type){
		case ADD_NEW_TASK: {
			let newTask;
			switch(action.payload.type){
				case 'OneChoice': {
					newTask = {
						description: 'Describe the task',
						score: 1,
						kind: 'OneChoiceExercise',
						options: [
							{
								text: 'Option 1',
								key: uuidv1()
							}
						]
					}
					break;
				}
				default: {
					newTask = {}
				}
			}
			return {
				...state,
				tasks: [...state.tasks, newTask]
			}
		}
		case EDIT_TASK: {
			let newTasks = cloneDeep(state.tasks);
			assign(newTasks[action.payload.num], action.payload.task);
			return {
				...state,
				tasks: newTasks
			}
		}
		case INIT_TASKS_EDITOR: {
			return {
				...state,
				tasks: action.payload
			}
		}
		case TOGGLE_TASK_EXPAND: {
			console.log(state);
			return {
				...state,
				expandedTasks: {
					...state.expandedTasks,
					[action.payload.num]: action.payload.expand
				}
			}
		}
		case CLEANUP: {
			return initialState;
		}
		default:
			return state;
	}
}