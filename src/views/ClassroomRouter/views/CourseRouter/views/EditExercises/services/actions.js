import types from './actionTypes'
import {updateCourse, clearError} from "../../../services/actions";
import { cloneDeep } from 'lodash';
let {
    CLEANUP,
    ADD_NEW_TASK,
    EDIT_TASK,
    DELETE_TASK,
    ADD_ERROR,
    UPDATE_EXERCISES,
    ADD_EXERCISE,
    EDIT_EXERCISE,
    DELETE_EXERCISE,
    PRE_DELETE_EXERCISE,
    RESTORE_DELETED_EXERCISE,
    COPY_EXERCISES_FROM_OLD_DATA
} = types;

/**
 * @namespace storeState.views.classroom.course.editExercisesActions
 */

/**
 * @description copies the exercises from already existing
 * course data in the
 * {@link storeState.views.classroom.course.courseServicesActions}-Reducer
 * and puts the exercises data into the
 * {@link storeState.views.classroom.course.editExercisesReducer}-Reducer
 * @function
 * @return {function(*): Promise<ReduxAction>|Object}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let copyExercisesFromOldData = () => (dispatch, getState) => {
    return dispatch({
        type: COPY_EXERCISES_FROM_OLD_DATA,
        payload: getState().views.classroom.course.services.course.exercises
    })
}

/**
 * @description Sends updated exercises data
 * through {@link updateCourse}.
 * @async
 * @function
 * @param {CourseExercise[]} exercises
 * @param {string} id - the id of the course to update
 * @return {function(*): Promise<ReduxAction|Response|any>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let saveChangesExercises = (exercises, id) => (dispatch) => {
    let form = new FormData();
    let newExercises = [];
    dispatch(clearError());

    for (let i = 0; i < exercises.length; i++){
        if (exercises[i].deleted){
            continue;
        }
        newExercises.push(cloneDeep(exercises[i]))
        newExercises[newExercises.length - 1].tasks = [];
        // expanded property is not a part of the API
        delete newExercises[newExercises.length - 1].expanded;
        if (!Array.isArray(exercises[i].tasks)){
            dispatch({
                type: ADD_ERROR,
                payload: 'One exercise does not have tasks'
            })
            // Mock async performance even if no request has been made
            return new Promise((resolve) => {
                resolve(true);
            })
        }
        for (let j = 0; j < exercises[i].tasks.length; j++){
            let task = {...exercises[i].tasks[j]};
            if (task.deleted){
                continue;
            }
            // expanded property is not a part of the API
            delete task.expanded;
            newExercises[newExercises.length - 1].tasks.push(task);
        }
    }
    let newCourseData = {exercises: newExercises}
    form.set('newCourseData', JSON.stringify(newCourseData));
    return dispatch(updateCourse(form, id))
}

/**
 * @function
 * @param {CourseExercise[]} exercises
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let updateExercises = (exercises) => (dispatch) => {
    return dispatch({
        type:  UPDATE_EXERCISES,
        payload: exercises
    })
}

/**
 * @function
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let addExercise = () => (dispatch) => {
    return dispatch({ type: ADD_EXERCISE })
}

/**
 * @function
 * @param {?CourseExercise|Object} exercise
 * @param {number} num
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let editExercise = (exercise, num) => dispatch => {
    return dispatch({
        type: EDIT_EXERCISE,
        payload: { num, exercise }
    })
}

/**
 * @function
 * @param {number} num
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let preDeleteExercise = (num) => (dispatch) => {
    return dispatch({
        type: PRE_DELETE_EXERCISE,
        payload: { num }
    })
}

/**
 * @function
 * @param {number} num
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let deleteExercise = (num) => (dispatch) => {
    return dispatch({
        type: DELETE_EXERCISE,
        payload: { num }
    })
}

/**
 * @function
 * @param {number} num
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let restoreDeletedExercise = (num) => dispatch => {
    return dispatch({
        type: RESTORE_DELETED_EXERCISE,
        payload: { num }
    })
}

/**
 * @function
 * @param {string} type
 * @param {number} exerciseNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let addNewTask = (type, exerciseNum) => dispatch => {
    return dispatch({
        type: ADD_NEW_TASK,
        payload: { type, exerciseNum }
    })
}

/**
 * @function
 * @param {CourseTask} task
 * @param {number} exerciseNum
 * @param {number} taskNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let editTask = (task, exerciseNum, taskNum) => dispatch => {
    return dispatch({
        type: EDIT_TASK,
        payload: { task, exerciseNum, taskNum}
    })
}

/**
 * @function
 * @param {number} exerciseNum
 * @param {number} taskNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let deleteTask = (exerciseNum, taskNum) => dispatch => {
    return dispatch({
        type: DELETE_TASK,
        payload: { exerciseNum, taskNum}
    })
}

/**
 * @function
 * @param {number} exerciseNum
 * @param {boolean} value
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let toggleExpandExercise = (exerciseNum, value) => dispatch => {
    return dispatch(editExercise({ expanded: value}, exerciseNum))
}

/**
 * @function
 * @param {number} exerciseNum
 * @param {number} taskNum
 * @param {boolean} value
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let toggleExpandTask = (exerciseNum, taskNum, value) => dispatch => {
    return dispatch(editTask( { expanded: value }, exerciseNum, taskNum));
}

/**
 * @function
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercisesActions
 */
export let cleanup = () => dispatch => {
    return dispatch({ type: CLEANUP })
}