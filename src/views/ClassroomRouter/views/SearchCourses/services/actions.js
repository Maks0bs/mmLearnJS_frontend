import types from './actionTypes'
import { getCoursesFiltered } from '../../../../../services/actions'
import {REACT_APP_API_URL} from "../../../../../constants";
let {
	API_SEARCH_COURSES
} = types;

export let searchCourses = (key) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			searchWord: key,
			select: ['_id', 'name', 'about', 'type', 'updates']
		},
		API_SEARCH_COURSES
	))
}

