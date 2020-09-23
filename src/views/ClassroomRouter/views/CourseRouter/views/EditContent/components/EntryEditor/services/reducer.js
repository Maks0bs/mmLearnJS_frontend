import types from './actionTypes'
let {
	EDIT_ENTRY_CONTENT,
	EDIT_ENTRY_BASIC_DATA,
	COPY_DATA_FROM_SERVICES,
	COPY_DATA_ERROR,
	CLEAR_ENTRY_CONTENT,
	CLEAR_ENTRY
} = types;

/**
 * @typedef EditContentEntryEditorState
 * @type CourseEntry
 * @property {?string} _id
 * @property {?string} error
 * @property {string} name
 * @property {Object|any} content
 * @property {string} type
 * @property {string} access
 *
 */

let initialState = {
	_id: '',
	error: '',
	name: '',
	type: '',
	access: 'students',
	content: {}
}
/**
 * @function editContentEntryEditorReducer
 * @param {EditContentEntryEditorState} state
 * @param {?string} state._id
 * @param {string} state.name
 * @param {Object|any} state.content
 * @param {string} state.type
 * @param {string} state.access
 * @param {string} state.error
 * @param {ReduxAction} action
 * @return {EditContentEntryEditorState}
 *
 * @memberOf storeState.views.classroom.course.editContent
 */
export default function(state = initialState, action) {
	switch(action.type){
		case COPY_DATA_FROM_SERVICES:
		case EDIT_ENTRY_BASIC_DATA: {
			return {
				...state,
				...action.payload,
				error: ''
			}
		}
		case EDIT_ENTRY_CONTENT: {
			return {
				...state,
				content: {
					...state.content,
					...action.payload
				},
				error: ''
			}
		}
		case CLEAR_ENTRY_CONTENT: {
			return {
				...state,
				content: {},
				error: ''
			}
		}
		case CLEAR_ENTRY: {
			return initialState
		}
		case COPY_DATA_ERROR: {
			return {
				...state,
				error: 'Error while trying to copy entry data'
			}
		}
		default:
			return state;
	}
}
