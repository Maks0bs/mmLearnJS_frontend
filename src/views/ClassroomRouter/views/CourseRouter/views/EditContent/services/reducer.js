import types from './actionTypes'
import { cloneDeep, assign, extend } from 'lodash'
import { v1 as uuidv1 } from 'uuid';
let {
	UPDATE_SECTIONS,
	ADD_SECTION,
	ADD_ENTRY,
	EDIT_ENTRY,
	DELETE_ENTRY,
	EDIT_SECTION,
	DELETE_SECTION,
	PRE_DELETE_ENTRY,
	PRE_DELETE_SECTION,
	RESTORE_DELETED_ENTRY,
	RESTORE_DELETED_SECTION,
	COPY_SECTIONS_FROM_OLD_DATA
} = types;

let initialState = {
	message: '',
	error: '',
	newSections: null,
	filesToDelete: [],
	deletedSections: {},
	deletedEntries: {}
}

export default function(state = initialState, action) {
	switch(action.type){
		case COPY_SECTIONS_FROM_OLD_DATA: {
			return {
				...state,
				newSections: cloneDeep(action.payload)
			}
		}
		case UPDATE_SECTIONS:
			return {
				...state,
				courseData: {
					...state.courseData,
					sections: action.payload
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
		default:
			return state;
	}
}