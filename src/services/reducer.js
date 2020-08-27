import viewsReducer from '../views/services/reducer'
import componentsReducer from '../components/services/reducer'
import routingReducer from './routing/reducer'
import { combineReducers } from "redux";
import servicesReducer from './main/reducer'


/**
 *
 * @description `views` - the reducer for actions inside all views inside the app
 * @description `components` - the reducer to for components, that are commonly used across the app
 * @description `services` - the basic information from the api: authenticated user...
 * @description `routing` - the reducer used for navigation, primarily for the navigation bars
 */
export default combineReducers({
	views: viewsReducer,
	services: servicesReducer,
	routing: routingReducer,
	components: componentsReducer
})