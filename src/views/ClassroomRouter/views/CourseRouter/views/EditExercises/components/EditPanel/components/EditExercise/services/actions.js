import types from './actionTypes'
let { 
	INIT_TASKS_EDITOR,
	ADD_ONE_CHOICE_TASK,
	ADD_MULTIPLE_CHOICE_TASK,
	ADD_TEXT_TASK,
	EDIT_TASK,
	UPDATE_TASKS
} = types;

export let addOneChoiceTask = () => dispatch => {
	return dispatch({
		type: ADD_ONE_CHOICE_TASK
	})
}

export let editTask = (task, num) => dispatch => {
	return dispatch({
		type: EDIT_TASK,
		payload: {
			task,
			num
		}
	})
}

export let updateTasks = (tasks) => dispatch => {
	return dispatch({
		type: UPDATE_TASKS,
		payload: tasks
	})
}

export let initTasksEditor = (tasks) => (dispatch) => {
	return dispatch({
		type: INIT_TASKS_EDITOR,
		payload: tasks
	})
}
