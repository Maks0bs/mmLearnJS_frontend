import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './services/reducer'
/**
 * @typedef ReduxAction
 * @type Object
 * @property {string} type - The type of the action to be dispatched
 * @property {?any|Object} payload - data, provided by the action (if any). Normally it's
 * clear what kind of payload is provided by the type of action
 * or by the api call that is performed
 */

let initialState = {};

let middleware = [thunk];

let store = createStore(
	rootReducer, 
	initialState, 
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ ?
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
)

export default store;