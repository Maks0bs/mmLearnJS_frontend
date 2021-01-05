import types from './actionTypes'
import {clearError, updateCourse} from '../../../services/actions'
let {
	COPY_SECTIONS_FROM_OLD_DATA,
	UPDATE_SECTIONS,
	ADD_SECTION,
	ADD_ENTRY,
	EDIT_ENTRY,
	DELETE_ENTRY,
	DELETE_SECTION,
	EDIT_SECTION,
	PRE_DELETE_ENTRY,
	PRE_DELETE_SECTION,
	RESTORE_DELETED_ENTRY,
	RESTORE_DELETED_SECTION,
	CLEANUP,
	ADD_ERROR
} = types;

/**
 * @namespace storeState.views.classroom.course.editContent.editContentServicesActions
 */

/**
 * @description copies the sections from already existing
 * course data in the
 * {@link storeState.views.classroom.course.courseServicesActions}-Reducer
 * and puts the sections data into the
 * {@link storeState.views.classroom.course.editContent.editContentServicesReducer}-Reducer
 * @function
 * @return {function(*): Promise<ReduxAction>|Object}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let copySectionsFromOldData = () => (dispatch, getState) => {
	return dispatch({
		type: COPY_SECTIONS_FROM_OLD_DATA,
		payload: getState().views.classroom.course.services.course.sections
	})
}

/**
 * @description Sends updates section data
 * through {@link updateCourse}.
 * @async
 * @function
 * @param {CourseSection[]} sections
 * @param {string} id - the id of the course to update
 * @return {function(*): Promise<ReduxAction|Response|any>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let saveChangesSections = (sections, id) => (dispatch) => {
	let form = new FormData();
	let filePositions = [];
	let newSections = [];
	dispatch(clearError());
	// Remove sections that have been marked as to be deleted
	for (let i = 0; i < sections.length; i++){
		if (sections[i].deleted) continue;

		newSections.push({...sections[i]});
		newSections[newSections.length - 1].entries = [];
		if (!Array.isArray(sections[i].entries)){
			dispatch({
				type: ADD_ERROR,
				payload: 'One section does not have entries'
			})
			// Mock async performance even if no request has been made
			return new Promise((resolve) => {
				resolve(true);
			})
		}
		for (let j = 0; j < sections[i].entries.length; j++){
			let entry = sections[i].entries[j];
			if (entry.kind === 'deleted') continue;

			newSections[newSections.length - 1].entries.push(entry);
		}
	}

	console.log('nssssss', newSections);

	for (let i = 0; i < newSections.length; i++){
		for (let j = 0; j < newSections[i].entries.length; j++){
			let entry = newSections[i].entries[j];
			let fileIsUpdated = !entry.content.file || entry.content.fileIsNew;
			switch (entry.kind) {
				case 'EntryFile': {
					if (fileIsUpdated){
						// append newly added files to the form
						// to upload the to the server
						// see API docs for details
						form.append('files', entry.content.file);
						filePositions.push({ section: i, entry: j})
					}
					newSections[i].entries[j] = { ...entry, ...entry.content}
					break;
				}
				case 'EntryForum': {
					newSections[i].entries[j].forum = {...entry.content}
					break;
				}
				case 'EntryText':
				default: {
					newSections[i].entries[j] = { ...entry, ...entry.content };
					break;
				}
			}
		}
	}

	let newCourseData = {sections: newSections}
	form.set('newCourse', JSON.stringify(newCourseData));
	form.set('filesPositions', JSON.stringify(filePositions));

	return dispatch(updateCourse(form, id))
}

/**
 * @function
 * @param {CourseSection[]} sections
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let updateSectionsLocal = (sections) => (dispatch) => {
	return dispatch({
		type:  UPDATE_SECTIONS,
		payload: sections
	})
}

/**
 * @function
 * @param {Object} section - the data of the new section
 * @param {string} section.name
 * @param {?string} [section.description]
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let addSection = (section) => (dispatch) => {
	return dispatch({
		type: ADD_SECTION,
		payload: {
			...section,
			entries: []
		}
	})
}

/**
 * @function
 * @param {Object} section - the data of the new section
 * @param {string} section.name
 * @param {?string} [section.description]
 * @param {number} sectionNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let editSection = (section, sectionNum) => dispatch => {
	return dispatch({
		type: EDIT_SECTION,
		payload: { section, sectionNum }
	})
}

/**
 * @function
 * @param {number} sectionNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let preDeleteSection = (sectionNum) => dispatch => {
	return dispatch({
		type: PRE_DELETE_SECTION,
		payload: { sectionNum }
	})
}

/**
 * @function
 * @param {number} sectionNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let deleteSection = (sectionNum) => (dispatch) => {
	return dispatch({
		type: DELETE_SECTION,
		payload: { sectionNum }
	})
}

/**
 * @function
 * @param {number} sectionNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let restoreDeletedSection = (sectionNum) => dispatch => {
	return dispatch({
		type: RESTORE_DELETED_SECTION,
		payload: {sectionNum}
	})
}

/**
 * @function
 * @param {CourseEntry} entry
 * @param {number} sectionNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let addEntry = (entry, sectionNum) => dispatch => {
	return dispatch({
		type: ADD_ENTRY,
		payload: {entry, sectionNum}
	})
}

/**
 * @function
 * @param {CourseEntry} entry
 * @param {number} sectionNum
 * @param {number} entryNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let editEntry = (entry, sectionNum, entryNum) => dispatch => {
	return dispatch({
		type: EDIT_ENTRY,
		payload: { entry, sectionNum, entryNum }
	})
}

/**
 * @function
 * @param {number} sectionNum
 * @param {number} entryNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let preDeleteEntry = (sectionNum, entryNum) => dispatch => {
	return dispatch({
		type: PRE_DELETE_ENTRY,
		payload: { sectionNum, entryNum }
	})
}

/**
 * @function
 * @param {number} sectionNum
 * @param {number} entryNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let deleteEntry = (sectionNum, entryNum) => dispatch => {
	return dispatch({
		type: DELETE_ENTRY,
		payload: { sectionNum, entryNum }
	})
}

/**
 * @function
 * @param {number} sectionNum
 * @param {number} entryNum
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let restoreDeletedEntry = (sectionNum, entryNum) => dispatch => {
	return dispatch({
		type: RESTORE_DELETED_ENTRY,
		payload: { sectionNum, entryNum }
	})
}

/**
 * @function
 * @return {function(*): Promise<ReduxAction>}
 * @memberOf storeState.views.classroom.course.editContent.editContentServicesActions
 */
export let cleanup = () => dispatch => {
	return dispatch({type: CLEANUP})
}