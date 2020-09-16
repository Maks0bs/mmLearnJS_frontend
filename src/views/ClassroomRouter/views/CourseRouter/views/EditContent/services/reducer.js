import types from './actionTypes'
import { cloneDeep, assign } from 'lodash'
import { v1 as uuidv1 } from 'uuid';
import {combineReducers} from "redux";
import entryEditorReducer from '../components/EntryEditor/services/reducer'
import { removeItemShallow} from "../../../../../../../services/helpers";
let {
	UPDATE_SECTIONS,
	CLEANUP,
	ADD_ERROR,
	ADD_ENTRY,
	EDIT_ENTRY,
	DELETE_ENTRY,
	ADD_SECTION,
	EDIT_SECTION,
	DELETE_SECTION,
	PRE_DELETE_ENTRY,
	PRE_DELETE_SECTION,
	RESTORE_DELETED_ENTRY,
	RESTORE_DELETED_SECTION,
	COPY_SECTIONS_FROM_OLD_DATA,
} = types;

/**
 * @namespace storeState.views.classroom.course.editContent
 */

/**
 * @typedef EditContentServicesState
 * @type Object
 * @property {?Object|string} editorError
 * @property {CourseSection[]} newSections - the sections that are stored
 * while the teacher is editing the course
 * @property {Object.<string, CourseSection>} deletedSections - locally deleted
 * sections during the edit process. Can be restored
 * @property {Object.<string, CourseEntry>} deletedEntries - locally deleted
 * entries during the edit process. Can be restored
 */

let initialState = {
	editorError: '',
	newSections: null,
	deletedSections: {},
	deletedEntries: {}
}
/**
 * @function editContentServicesReducer
 * @param {EditContentServicesState} state
 * @param {?Object|string} state.editorError
 * @param {CourseSection[]} state.newSections - the sections that are stored
 * while the teacher is editing the course
 * @param {Object.<string, CourseSection>} state.deletedSections - locally deleted
 * sections during the edit process. Can be restored
 * @param {Object.<string, CourseEntry>} state.deletedEntries - locally deleted
 * entries during the edit process. Can be restored
 * @param {ReduxAction} action
 * @return {EditContentServicesState}
 *
 * @memberOf storeState.views.classroom.course.editContent
 */
let editContentServicesReducer = function(state = initialState, action) {
	switch(action.type){
		case COPY_SECTIONS_FROM_OLD_DATA: {
			return {
				...state,
				newSections: cloneDeep(action.payload)
			}
		}
		case UPDATE_SECTIONS: {
			return {
				...state,
				newSections: [...action.payload]
			}
		}
		case ADD_SECTION:
			return {
				...state,
				newSections: [...state.newSections, action.payload]
			}
		case EDIT_SECTION: {
			let newSections = [...state.newSections]
			assign(newSections[action.payload.sectionNum], action.payload.section);
			return {
				...state,
				newSections: newSections
			}
		}
		case PRE_DELETE_SECTION: {
			let { sectionNum } = action.payload;
			let newSections = [...state.newSections]
			// Using uuid instead of API IDs here,
			// because newly created sections don't have an id yet
			// but still have to be uniquely addressed somehow
			let curId = uuidv1();
			let deletedSection = {...newSections[sectionNum]}
			newSections[sectionNum] = {
				deletedId: curId,
				deleted: true,
				name: deletedSection.name
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
			return {
				...state,
				newSections: removeItemShallow(
					state.newSections, action.payload.sectionNum
				)
			}
		}
		case RESTORE_DELETED_SECTION: {
			let { sectionNum } = action.payload;
			let newSections = [...state.newSections];
			let curId = newSections[sectionNum].deletedId;
			newSections[sectionNum] = {...state.deletedSections[curId]}
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
			let { sectionNum, entry} = action.payload;
			let newSections = [...state.newSections];
			newSections[sectionNum].entries =
				[...newSections[sectionNum].entries, entry];
			return {
				...state,
				newSections: newSections
			}
		}
		case EDIT_ENTRY: {
			let { entry, sectionNum, entryNum } = action.payload;
			let newSections = [...state.newSections];
			let newEntries = [...newSections[sectionNum].entries];
			newEntries[entryNum] = assign(newEntries[entryNum], entry);
			newSections[sectionNum].entries = newEntries;
			return {
				...state,
				newSections: newSections
			}
		}
		case PRE_DELETE_ENTRY: {
			let { sectionNum, entryNum } = action.payload;
			let newSections = [...state.newSections];
			let newEntries = [...newSections[sectionNum].entries];
			// Using uuid instead of API IDs here,
			// because newly created entries don't have an id yet
			// but still have to be uniquely addressed somehow
			let curId = uuidv1();
			let deletedEntry = {...newEntries[entryNum]}
			newEntries[entryNum] = {
				deletedId: curId,
				type: 'deleted',
				name: deletedEntry.name
			}
			newSections[sectionNum].entries = newEntries;
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
			let newSections = [...state.newSections];
			let newEntries = [...newSections[sectionNum].entries];
			let curId = newEntries[entryNum].deletedId;
			newEntries[entryNum] = {...state.deletedEntries[curId]}
			newSections[sectionNum].entries = newEntries;
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
			let newSections = [...state.newSections];
			newSections[sectionNum].entries = removeItemShallow(
				newSections[sectionNum].entries, entryNum
			)
			return {
				...state,
				newSections: newSections
			}
		}
		case ADD_ERROR: {
			return {
				...state,
				editorError: action.payload
			}
		}
		case CLEANUP: {
			return initialState;
		}
		default:
			return state;
	}
}
export default combineReducers({
	services: editContentServicesReducer,
	entryEditor: entryEditorReducer
})