import viewsReducer from '../views/services/reducer'
import componentsReducer from '../components/services/reducer'
import routingReducer from './routing/reducer'
import { combineReducers } from "redux";
import servicesReducer from './main/reducer'



export default combineReducers({
	views: viewsReducer,
	services: servicesReducer,
	routing: routingReducer,
	components: componentsReducer
})