import { combineReducers } from 'redux'
import publicReducer from '../PublicRouter/services/reducer'
import componentsReducer from '../components/services/reducer'
import classroomReducer from '../ClassroomRouter/services/reducer'

/**
 * @namespace storeState.views
 */



/**
 *
 * @description `public` - the reducer for actions inside the public router (public pages,
 * that are visible to all users without logging in)
 * @description `components` - the reducer to for all general components
 * @description `classroom` - the reducer for actions inside the classroom (pages for logged in users)
 */
export default combineReducers({
	public: publicReducer,
	classroom: classroomReducer,
	components: componentsReducer
})