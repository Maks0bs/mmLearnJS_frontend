import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './services/reducer'
/**
 * @typedef ReduxAction
 * @type Object
 * @property type - The type of the action to be dispatched
 * @type string
 * @property payload - data, provided by the action (if any)
 * @type ?Object
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