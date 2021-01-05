import types from './actionTypes'
import { updateCourse } from '../../../services/actions'
let {
	EDIT_ENTRY_BASIC_DATA,
	EDIT_ENTRY_CONTENT,
	COPY_DATA_FROM_SERVICES,
	COPY_DATA_ERROR,
	CLEAR_ENTRY_CONTENT,
	CLEAR_ENTRY
} = types;

/**
 * @namespace storeState.views.classroom.course.editContent.editContentEntryEditorActions
 */

/**
 * @function
 * @param {number} sectionNum
 * @param {number} entryNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentEntryEditorActions
 */
export let copyDataFromServices = (sectionNum, entryNum) => (dispatch, getState) => {
	let { newSections: sections } = getState().views.classroom.course.editContent.services;
	if (!Array.isArray(sections)){
		return dispatch({ type: COPY_DATA_ERROR });
	}
	let section = sections[sectionNum];
	if (!section) {
		return dispatch({ type: COPY_DATA_ERROR });
	}
	let { entries } = section;
	if (!entries) {
		return dispatch({ type: COPY_DATA_ERROR });
	}
	let entry = entries[entryNum];
	return dispatch({
		type: COPY_DATA_FROM_SERVICES,
		payload: entry
	})
}

/**
 * @function
 * @param {Object} data
 * @param {?string} [data.name]
 * @param {?string} [data.type]
 * @param {?string} [data.access]
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentEntryEditorActions
 */
export let editEntryBasicData = (data) => (dispatch) => {
	// editing content through this action is not allowed
	if (data.content){
		return;
	}
	return dispatch({
		type:  EDIT_ENTRY_BASIC_DATA,
		payload: data
	})
}

/**
 * @function
 * @param {Object} content
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentEntryEditorActions
 */
export let editEntryContent = (content) => (dispatch) => {
	return dispatch({
		type:  EDIT_ENTRY_CONTENT,
		payload: content
	})
}

/**
 * @function
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentEntryEditorActions
 */
export let clearEntryContent = () => (dispatch) => {
	return dispatch({ type:  CLEAR_ENTRY_CONTENT })
}

/**
 * @function
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentEntryEditorActions
 */
export let clearEntry = () => (dispatch) => {
	return dispatch({ type:  CLEAR_ENTRY })
}
