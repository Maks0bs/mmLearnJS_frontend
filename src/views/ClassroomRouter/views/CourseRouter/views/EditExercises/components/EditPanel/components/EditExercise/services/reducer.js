import types from './actionTypes'
import {assign, cloneDeep} from "lodash";
let {
	INIT_TASKS_EDITOR,
	ADD_TEXT_TASK,
	ADD_ONE_CHOICE_TASK,
	ADD_MULTIPLE_CHOICE_TASK,
	EDIT_TASK,
	UPDATE_TASKS
} = types;

let initialState = {
	tasks: []
}

export default function(state = initialState, action) {
	switch(action.type){
		case ADD_ONE_CHOICE_TASK: {
			let newTask = {
				description: 'Describe the task',
				score: 1,
				kind: 'OneChoiceExercise',
				options: [
					{
						text: 'Option 1',
						key: 1
					}
				]
			}
			return {
				...state,
				tasks: [...state.tasks, newTask]
			}
		}
		case UPDATE_TASKS: {
			return {
				...state,
				tasks: action.payload
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
		default:
			return state;
	}
}