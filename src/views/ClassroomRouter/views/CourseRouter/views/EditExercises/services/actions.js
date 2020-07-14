import types from './actionTypes'
import {getCoursesFiltered} from "../../../../../../../services/actions";
let { 
    API_GET_COURSE_BY_ID
} = types;


export let getCourseById = (courseId) => (dispatch) => {
    return dispatch(getCoursesFiltered(
        {
            courseId: courseId
        },
        API_GET_COURSE_BY_ID
    ))
}

