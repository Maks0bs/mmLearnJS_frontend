import types from './actionTypes'
import { updateCourse } from '../../../services/actions'
import { cloneDeep } from 'lodash'
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
	RESTORE_DELETED_SECTION
} = types;

/**
 * @namespace storeState.views.classroom.course.editContentActions
 */

/**
 * @description copies the sections from already existing
 * course data in the
 * {@link storeState.views.classroom.course.courseServicesActions}-Reducer
 * and puts the sections data into the
 * {@link storeState.views.classroom.course.editContentActions}-Reducer
 * @function
 * @return {function(*): Promise<ReduxAction>|Object}
 * @memberOf storeState.views.classroom.course.editContentActions
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
 * @memberOf storeState.views.classroom.course.editContentActions
 */
export let saveChangesSections = (sections, id) => (dispatch) => {
	let form = new FormData();
	let filePositions = [];
	let newSections = [];
	for (let i = 0; i < sections.length; i++){
		if (sections[i].deleted){
			continue;
		}
		newSections.push(cloneDeep(sections[i]));
		newSections[newSections.length - 1].entries = [];
		for (let j = 0; j < sections[i].entries.length; j++){
			let entry = sections[i].entries[j];
			if (entry.type === 'deleted'){
				continue;
			}

			newSections[newSections.length - 1].entries.push(entry);
		}
	}

	for (let i = 0; i < newSections.length; i++){
		for (let j = 0; j < newSections[i].entries.length; j++){
			let entry = newSections[i].entries[j];
			if (entry.type === 'file' && !entry.content.id){
				form.append('files', entry.content);
				filePositions.push({ section: i, entry: j})
			}
		}
	}

	let newCourseData = {sections: newSections}
	form.set('newCourseData', JSON.stringify(newCourseData));
	form.set('filesPositions', JSON.stringify(filePositions));

	return dispatch(updateCourse(form, id))
}


export let updateSectionsLocal = (sections) => (dispatch) => {
	dispatch({
		type:  UPDATE_SECTIONS,
		payload: sections
	})
}

export let addEntry = (entry, sectionNum) => dispatch => {
	dispatch({
		type: ADD_ENTRY,
		payload: {
			entry,
			sectionNum
		}
	})
}

export let editEntry = (entry, sectionNum, entryNum) => dispatch => {
	dispatch({
		type: EDIT_ENTRY,
		payload: {
			entry,
			sectionNum,
			entryNum
		}
	})
}

export let preDeleteEntry = (sectionNum, entryNum) => dispatch => {
	dispatch({
		type: PRE_DELETE_ENTRY,
		payload: {
			sectionNum,
			entryNum
		}
	})
}

export let restoreDeletedEntry = (sectionNum, entryNum) => dispatch => {
	dispatch({
		type: RESTORE_DELETED_ENTRY,
		payload: {
			sectionNum,
			entryNum
		}
	})
}

export let deleteEntry = (sectionNum, entryNum) => dispatch => {
	dispatch({
		type: DELETE_ENTRY,
		payload: {
			sectionNum,
			entryNum
		}
	})
}

export let addSection = (section) => (dispatch) => {
	dispatch({
		type: ADD_SECTION,
		payload: {
			...section,
			entries: []
		}
	})
}

export let preDeleteSection = (sectionNum) => dispatch => {
	dispatch({
		type: PRE_DELETE_SECTION,
		payload: {
			sectionNum
		}
	})
}

export let restoreDeletedSection = (sectionNum) => dispatch => {
	dispatch({
		type: RESTORE_DELETED_SECTION,
		payload: {
			sectionNum
		}
	})
}

export let deleteSection = (sectionNum) => (dispatch) => {
	dispatch({
		type: DELETE_SECTION,
		payload: {
			sectionNum
		}
	})
}

export let editSection = (section, sectionNum) => dispatch => {
	dispatch({
		type: EDIT_SECTION,
		payload: {
			section,
			sectionNum
		}
	})
}