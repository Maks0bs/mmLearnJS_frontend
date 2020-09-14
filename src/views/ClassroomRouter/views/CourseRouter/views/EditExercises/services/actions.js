import types from './actionTypes'
import {updateCourse} from "../../../services/actions";
let {
    UPDATE_EXERCISES,
    ADD_EXERCISE,
    EDIT_EXERCISE,
    DELETE_EXERCISE,
    PRE_DELETE_EXERCISE,
    RESTORE_DELETED_EXERCISE,
    COPY_EXERCISES_FROM_OLD_DATA
} = types;

/**
 * @namespace storeState.views.classroom.course.editExercises.editExercisesServicesActions
 */

/**
 * @description copies the exercises from already existing
 * course data in the
 * {@link storeState.views.classroom.course.courseServicesActions}-Reducer
 * and puts the exercises data into the
 * {@link storeState.views.classroom.course.editExercises.editExercisesServicesReducer}-Reducer
 * @function
 * @return {function(*): Promise<ReduxAction>|Object}
 * @memberOf storeState.views.classroom.course.editExercises.editExercisesServicesActions
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
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let saveChangesExercises = (exercises, id) => (dispatch) => {
    let form = new FormData();
    let newExercises = [];

    for (let i of exercises){
        if (!i.deleted){
            newExercises.push(i);
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
 * @memberOf storeState.views.classroom.course.editExercises.editExercisesServicesActions
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
 * @memberOf storeState.views.classroom.course.editExercises.editExercisesServicesActions
 */
export let addExercise = () => (dispatch) => {
    return dispatch({ type: ADD_EXERCISE })
}

/**
 * @function
 * @param {?CourseExercise} exercise
 * @param {number} num
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editExercises.editExercisesServicesActions
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
 * @memberOf storeState.views.classroom.course.editExercises.editExercisesServicesActions
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
 * @memberOf storeState.views.classroom.course.editExercises.editExercisesServicesActions
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
 * @memberOf storeState.views.classroom.course.editExercises.editExercisesServicesActions
 */
export let restoreDeletedExercise = (num) => dispatch => {
    return dispatch({
        type: RESTORE_DELETED_EXERCISE,
        payload: { num }
    })
}