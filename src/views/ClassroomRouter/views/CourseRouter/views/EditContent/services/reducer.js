import types from './actionTypes'
import { cloneDeep, assign } from 'lodash'
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

/**
 * @typedef EditContentState
 * @type Object
 * @property {?Object|string} error
 * @property {CourseSection[]} newSections - the sections that are stored
 * while the teacher is editing the course
 * @property {Object.<string, CourseSection>} deletedSections - locally deleted
 * sections during the edit process. Can be restored
 * @property {Object.<string, CourseEntry>} deletedEntries - locally deleted
 * entries during the edit process. Can be restored
 */

let initialState = {
	error: '',
	newSections: null,
	deletedSections: {},
	deletedEntries: {}
}


/**
 * @function editContentReducer
 * @param {EditContentState} state
 * @param {?Object|string} state.error
 * @param {CourseSection[]} state.newSections - the sections that are stored
 * while the teacher is editing the course
 * @param {Object.<string, CourseSection>} state.deletedSections - locally deleted
 * sections during the edit process. Can be restored
 * @param {Object.<string, CourseEntry>} state.deletedEntries - locally deleted
 * entries during the edit process. Can be restored
 * @param {ReduxAction} action
 * @return {EditContentState}
 *
 * @memberOf storeState.views.classroom.course
 */
export default function(state = initialState, action) {
	switch(action.type){
		case UPDATE_SECTIONS:
		case COPY_SECTIONS_FROM_OLD_DATA: {
			return {
				...state,
				newSections: cloneDeep(action.payload)
			}
		}
		case ADD_SECTION:
			return {
				...state,
				newSections: [...state.newSections, action.payload]
			}
		case EDIT_SECTION: {
			let newSections = cloneDeep(state.newSections);
			assign(newSections[action.payload.sectionNum], action.payload.section);
			return {
				...state,
				newSections: newSections
			}
		}
		case PRE_DELETE_SECTION: {
			let { sectionNum } = action.payload;
			let newSections = cloneDeep(state.newSections);
			// Using uuid instead of API IDs here,
			// because newly created sections don't have an id yet
			// but still have to be uniquely addressed somehow
			let curId = uuidv1();
			let deletedSection = cloneDeep(newSections[sectionNum]);
			newSections[sectionNum] = {
				deletedId: curId,
				deleted: true,
				name: newSections[sectionNum].name
			}
			return {
				...state,
				newSections: newSections,
				deletedSections: {
					...state.deletedSections,
					[curId]: deletedSection
				}
			}
		}
		case DELETE_SECTION: {
			let newSections = cloneDeep(state.newSections);
			newSections.splice(action.payload.sectionNum, 1);
			return {
				...state,
				newSections: newSections
			}
		}
		case RESTORE_DELETED_SECTION: {
			let { sectionNum } = action.payload;
			let newSections = cloneDeep(state.newSections);
			let curId = state.newSections[sectionNum].deletedId;
			newSections[sectionNum] = cloneDeep(state.deletedSections[curId]);
			return {
				...state,
				newSections: newSections,
				deletedSections: {
					...state.deletedSections,
					[curId]: undefined
				}
			}
		}
		case ADD_ENTRY: {
			let newSections = cloneDeep(state.newSections);
			newSections[action.payload.sectionNum].entries.push(action.payload.entry);
			return {
				...state,
				newSections: newSections
			}
		}
		case EDIT_ENTRY: {
			let { entry, sectionNum, entryNum } = action.payload;
			let newSections = cloneDeep(state.newSections);
			newSections[sectionNum].entries[entryNum] =
				assign(newSections[sectionNum].entries[entryNum], entry);
			return {
				...state,
				newSections
			}
		}
		case PRE_DELETE_ENTRY: {
			let { sectionNum, entryNum } = action.payload;
			let newSections = cloneDeep(state.newSections);
			// Using uuid instead of API IDs here,
			// because newly created entries don't have an id yet
			// but still have to be uniquely addressed somehow
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
				newSections: newSections,
				deletedEntries: {
					...state.deletedEntries,
					[curId]: deletedEntry
				}
			}
		}
		case RESTORE_DELETED_ENTRY: {
			let { sectionNum, entryNum } = action.payload;
			let curId = state.newSections[sectionNum].entries[entryNum].deletedId;
			let newSections = cloneDeep(state.newSections);
			newSections[sectionNum].entries[entryNum] =
				cloneDeep(state.deletedEntries[curId]);
			return {
				...state,
				newSections: newSections,
				deletedEntries: {
					...state.deletedEntries,
					[curId]: undefined
				}
			}
		}
		case DELETE_ENTRY: {
			let { sectionNum, entryNum } = action.payload;
			let newSections = cloneDeep(state.newSections);
			newSections[sectionNum].entries.splice(entryNum, 1);
			return {
				...state,
				newSections: newSections
			}
		}
		default:
			return state;
	}
}