import types from './actionTypes'
import { updateCourse } from '../../../services/actions'
import { REACT_APP_API_URL } from '../../../../../../../constants'
import { getCoursesFiltered, uploadFiles, streamFileById } from '../../../../../../../services/actions'
let { 
	API_EDIT_COURSE, 
	CLEAR_MESSAGES, 
	API_GET_COURSE_BY_ID, 
	UPDATE_SECTIONS,
	ADD_SECTION,
	ADD_ENTRY,
	EDIT_ENTRY,
	DELETE_ENTRY,
	DELETE_SECTION,
	EDIT_SECTION,
	API_GET_FILE_BY_ID
} = types;

// all api requests related to Home view will be placed here
// all nested components should only use these actions for backend requests

export let updateSections = (sections) => (dispatch) => {
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

export let deleteEntry = (sectionNum, entryNum, type, content) => dispatch => {
	console.log('delete entry data', sectionNum, entryNum, type, content);
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

export let saveChanges = (courseData) => (dispatch) => {	
	let form = new FormData();
	let filePositions = [];
	let { sections } = courseData;
	for (let i = 0; i < sections.length; i++){
		for (let j = 0; j < sections[i].entries.length; j++){
			let entry = sections[i].entries[j];
			if (entry.type === 'file' && !entry.content.id){
				form.append('files', entry.content);
				filePositions.push({ section: i, entry: j})
			}
		}
	}

	form.set('newCourseData', JSON.stringify(courseData));
	form.set('filesPositions', JSON.stringify(filePositions));


	return dispatch(updateCourse(
		form,
		courseData._id,
		API_EDIT_COURSE
	))
}

export let getCourseById = (courseId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			courseId: courseId
		},
		API_GET_COURSE_BY_ID
	))
}

export let getFileById = (fileId, name) => (dispatch) => {
	return dispatch(streamFileById(
		fileId,
		API_GET_FILE_BY_ID,
		{
			name
		}
	))
}

// add actions to change message explicitely

export let clearMessages = () => (dispatch) => {
	return dispatch({
		type: CLEAR_MESSAGES
	})
}
