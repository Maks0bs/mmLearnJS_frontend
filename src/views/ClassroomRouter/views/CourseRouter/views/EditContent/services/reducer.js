import types from './actionTypes'
import _ from 'lodash'
import FileSaver from 'file-saver'
let { 
	API_EDIT_COURSE, 
	CLEAR_MESSAGES, 
	API_GET_COURSE_BY_ID,
	UPDATE_SECTIONS,
	ADD_SECTION,
	ADD_ENTRY,
	EDIT_ENTRY,
	DELETE_ENTRY,
	EDIT_SECTION,
	DELETE_SECTION,
	API_GET_FILE_BY_ID
} = types;

let initialState = {
	message: '',
	error: '',
	oldCourseData: {},
	courseData: {},
	filesToDelete: []
}

export default function(state = initialState, action) {
	switch(action.type){
		case UPDATE_SECTIONS:
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: action.payload
				}
			}
		case API_GET_COURSE_BY_ID: {
			return {
				...state,
				oldCourseData: action.payload[0],
				courseData: action.payload[0]
			}
		}
		case ADD_SECTION:
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: [...state.courseData.sections, action.payload]
				}
			}
		case EDIT_SECTION: {
			let newSections = _.cloneDeep(state.courseData.sections);
			_.assign(newSections[action.payload.sectionNum], action.payload.section);
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: newSections
				}
			}
		}
		case DELETE_SECTION: {
			let newSections = _.cloneDeep(state.courseData.sections);
			newSections.splice(action.payload.sectionNum, 1);
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: newSections
				}
			}
		}
		case ADD_ENTRY: {
			let newSections = _.cloneDeep(state.courseData.sections);
			newSections[action.payload.sectionNum].entries.push(action.payload.entry);
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: newSections
				}
			}
		}
		case EDIT_ENTRY: {
			let { entry, sectionNum, entryNum } = action.payload;
			console.log(action);
			let newSections = _.cloneDeep(state.courseData.sections);
			newSections[sectionNum].entries[entryNum] = _.extend(newSections[sectionNum].entries[entryNum], entry);
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: newSections
				}
			}
		}
		case DELETE_ENTRY: {
			let { sectionNum, entryNum } = action.payload;
			let newSections = _.cloneDeep(state.courseData.sections);
			newSections[sectionNum].entries.splice(entryNum, 1);
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: newSections
				}
			}
		}
		/*case CLEAR_MESSAGES:
			return initialState*/
		default:
			return state;
	}
}