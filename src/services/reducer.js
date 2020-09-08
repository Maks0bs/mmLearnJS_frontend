import viewsReducer from '../views/services/reducer'
import componentsReducer from '../components/services/reducer'
import routingReducer from './routing/reducer'
import { combineReducers } from "redux";
import servicesReducer from './main/reducer'

/**
 * @namespace storeStateActions
 */

/**
 * @typedef ErrorAndMessageState
 * @type Object
 * @property {string} message - message about the page status after performing a certain action
 * or a an affirmative response from the API
 * @property {string|Object} error - error that occurs after calling an async
 * request from the API.
 */

/**
 *
 * @property views - the reducer for actions inside all views inside the app
 * @property components - the reducer to for components, that are commonly used across the app
 * @property services - the basic information from the api: authenticated user...
 * @property routing - the reducer used for navigation, primarily for the navigation bars
 * @namespace storeState
 */
export default combineReducers({
	views: viewsReducer,
	services: servicesReducer,
	routing: routingReducer,
	components: componentsReducer
})