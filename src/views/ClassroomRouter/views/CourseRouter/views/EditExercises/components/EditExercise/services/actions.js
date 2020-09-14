import types from './actionTypes'
let { 
	INIT_TASKS_EDITOR,
	ADD_NEW_TASK,
	EDIT_TASK,
	TOGGLE_TASK_EXPAND,
	CLEANUP
} = types;

export let addNewTask = (type) => dispatch => {
	return dispatch({
		type: ADD_NEW_TASK,
		payload: {
			type
		}
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

export let initTasksEditor = (tasks) => (dispatch) => {
	return dispatch({
		type: INIT_TASKS_EDITOR,
		payload: tasks
	})
}

export let cleanup = () => (dispatch) => {
	return dispatch({
		type: CLEANUP
	})
}

/**
 * @param num the number of the task to expand / hide in the current tasks array
 * @param expand true if task should be expanded, false to hide the task
 * @returns {function(*): *}
 */
export let toggleTaskExpand = (num, expand) => (dispatch) => {
	return dispatch({
		type: TOGGLE_TASK_EXPAND,
		payload: {
			num,
			expand
		}
	})
}
