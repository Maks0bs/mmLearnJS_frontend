import types from './actionTypes'
import { REACT_APP_API_URL } from '../../../../../../../constants'
import { getCoursesFiltered, uploadFiles } from '../../../../../../../services/actions'
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
	EDIT_SECTION
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
	let fileData = new FormData();
	let filePositions = [];
	let { sections } = courseData;
	for (let i = 0; i < sections.length; i++){
		for (let j = 0; j < sections[i].entries.length; j++){
			let entry = sections[i].entries[j];
			if (entry.type === 'file' && !entry.content.id){
				fileData.append('files', entry.content);
				filePositions.push({ section: i, entry: j})
			}
		}
	}

	return fetch(`${REACT_APP_API_URL}/files/upload`, {
		method: "POST",
		headers: {
			Accept: "application/json"
		},
		credentials: 'include',
		body: fileData
	})
	.then(res => res.json())
	.then(data => {
		console.log('data received ldfldflsd;', data);
		for (let i = 0; i < filePositions.length; i++){
			let pos = filePositions[i];
			courseData.sections[pos.section].entries[pos.entry].content = data.files[i];
		}
		console.log('data to send', courseData)
		return data
	})
	.then(data => {
		return fetch(`${REACT_APP_API_URL}/courses/update`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			credentials: 'include',
			body: JSON.stringify(courseData)
		})
	})
	.then(res => res.json())
	.then(data => {
		console.log('received data', data);
		dispatch({
		type: API_EDIT_COURSE,
		payload: data
	})})
	.catch(err => console.log(err))
}

export let getCourseById = (courseId) => (dispatch) => {
	return dispatch(getCoursesFiltered(
		{
			courseId: courseId
		},
		API_GET_COURSE_BY_ID
	))
}

// add actions to change message explicitely

export let clearMessages = () => (dispatch) => {
	return dispatch({
		type: CLEAR_MESSAGES
	})
}
