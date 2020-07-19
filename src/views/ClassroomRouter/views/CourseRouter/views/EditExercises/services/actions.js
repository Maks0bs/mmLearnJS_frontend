import types from './actionTypes'
import {getCoursesFiltered} from "../../../../../../../services/actions";
import {updateCourse} from "../../../services/actions";
let { 
    API_GET_COURSE_BY_ID,
    UPDATE_EXERCISES,
    ADD_EXERCISE,
    EDIT_EXERCISE,
    DELETE_EXERCISE,
    PRE_DELETE_EXERCISE,
    RESTORE_DELETED_EXERCISE,
    API_UPDATE_EXERCISES,
    CLEAR_MESSAGES
} = types;


export let getCourseById = (courseId) => (dispatch) => {
    return dispatch(getCoursesFiltered(
        {
            courseId: courseId
        },
        API_GET_COURSE_BY_ID
    ))
}

export let updateExercises = (exercises) => (dispatch) => {
    dispatch({
        type:  UPDATE_EXERCISES,
        payload: exercises
    })
}

export let addExercise = () => (dispatch) => {
    dispatch({
        type: ADD_EXERCISE
    })
}

export let deleteExercise = (num) => (dispatch) => {
    dispatch({
        type: DELETE_EXERCISE,
        payload: {
            num
        }
    })
}

export let editExercise = (exercise, num) => dispatch => {
    dispatch({
        type: EDIT_EXERCISE,
        payload: {
            num,
            exercise
        }
    })
}

export let preDeleteExercise = (num) => (dispatch) => {
    dispatch({
        type: PRE_DELETE_EXERCISE,
        payload: {
            num
        }
    })
}

export let restoreDeletedExercise = (num) => dispatch => {
    dispatch({
        type: RESTORE_DELETED_EXERCISE,
        payload: {
            num
        }
    })
}

export let clearMessages = () => dispatch => {
    dispatch({
        type: CLEAR_MESSAGES
    })
}

export let saveChanges = (exercises) => (dispatch, getState) => {
    let form = new FormData();
    let { courseData } = getState().views.classroom.course.editExercises.services
    courseData.exercises = exercises;

    console.log('testing')

    form.set('newCourseData', JSON.stringify(courseData));
    //form.set('filesPositions', JSON.stringify(filePositions));


    return dispatch(updateCourse(
        form,
        courseData._id,
        API_UPDATE_EXERCISES
    ))
}

