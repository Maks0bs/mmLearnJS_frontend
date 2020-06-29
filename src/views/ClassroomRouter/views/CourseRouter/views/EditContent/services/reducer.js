import types from './actionTypes'
import { cloneDeep, assign, extend } from 'lodash'
import { v1 as uuidv1 } from 'uuid';
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
	API_GET_FILE_BY_ID,
	PRE_DELETE_ENTRY,
	PRE_DELETE_SECTION,
	RESTORE_DELETED_ENTRY,
	RESTORE_DELETED_SECTION
} = types;

let initialState = {
	message: '',
	error: '',
	oldCourseData: {},
	courseData: {},
	filesToDelete: [],
	deletedSections: {},
	deletedEntries: {}
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
			let newSections = cloneDeep(state.courseData.sections);
			assign(newSections[action.payload.sectionNum], action.payload.section);
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: newSections
				}
			}
		}
		case PRE_DELETE_SECTION: {
			let { sectionNum } = action.payload;
			// Deep cloning is not necessary here, but using it now
			// TODO get rid of deep cloning
			let newSections = cloneDeep(state.courseData.sections);
			// Using uuid here, because newly created entries don't have id,
			// because they weren't pushed to mongo 
			let curId = uuidv1();
			let deletedSection = cloneDeep(newSections[sectionNum]);
			let deletedName = newSections[sectionNum].name;
			newSections[sectionNum] = {
				deletedId: curId,
				deleted: true,
				name: deletedName
			}
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: newSections
				},
				deletedSections: {
					...state.deletedSections,
					[curId]: deletedSection
				}
			}
		}
		case RESTORE_DELETED_SECTION: {
			let { sectionNum } = action.payload;
			let curId = state.courseData.sections[sectionNum].deletedId;
			let newSections = cloneDeep(state.courseData.sections);
			newSections[sectionNum] = cloneDeep(state.deletedSections[curId]);
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: newSections
				},
				deletedSections: {
					...state.deletedSections,
					[curId]: undefined
				}
			}
		}
		case DELETE_SECTION: {
			let newSections = cloneDeep(state.courseData.sections);
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
			let newSections = cloneDeep(state.courseData.sections);
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
			let newSections = cloneDeep(state.courseData.sections);
			newSections[sectionNum].entries[entryNum] = extend(newSections[sectionNum].entries[entryNum], entry);
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: newSections
				}
			}
		}
		case PRE_DELETE_ENTRY: {
			let { sectionNum, entryNum } = action.payload;
			// Deep cloning is not necessary here, but using it now
			// TODO get rid of deep cloning
			let newSections = cloneDeep(state.courseData.sections);
			// Using uuid here, because newly created entries don't have id,
			// because they weren't pushed to mongo 
			let curId = uuidv1();
			let deletedEntry = cloneDeep(newSections[sectionNum].entries[entryNum]);
			let deletedName = newSections[sectionNum].entries[entryNum].name;
			newSections[sectionNum].entries[entryNum] = {
				deletedId: curId,
				type: 'deleted',
				name: deletedName
			}
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: newSections
				},
				deletedEntries: {
					...state.deletedEntries,
					[curId]: deletedEntry
				}
			}
		}
		case RESTORE_DELETED_ENTRY: {
			let { sectionNum, entryNum } = action.payload;
			let curId = state.courseData.sections[sectionNum].entries[entryNum].deletedId;
			let newSections = cloneDeep(state.courseData.sections);
			newSections[sectionNum].entries[entryNum] = cloneDeep(state.deletedEntries[curId]);
			console.log('new data', newSections[sectionNum].entries[entryNum]);
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: newSections
				},
				deletedEntries: {
					...state.deletedEntries,
					[curId]: undefined
				}
			}
		}
		case DELETE_ENTRY: {
			let { sectionNum, entryNum } = action.payload;
			let newSections = cloneDeep(state.courseData.sections);
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
		case API_EDIT_COURSE: {
			//TODO remove unused refs
			return {
				...initialState,
				oldCourseData: state.oldCourseData,
				courseData: state.courseData
			}
		}
		default:
			return state;
	}
}