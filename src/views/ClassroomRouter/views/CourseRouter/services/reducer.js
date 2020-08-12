import { combineReducers } from 'redux'
import mainReducer from '../views/MainRouter/services/reducer'
import createCourseReducer from '../views/CreateCourse/services/reducer'
import editContentReducer from '../views/EditContent/services/reducer'
import editInfoReducer from '../views/EditInfo/services/reducer'
import editExercisesReducer from '../views/EditExercises/services/reducer'

// here we collect ALL reducers from views directory
export default combineReducers({
	main: mainReducer,
	create: createCourseReducer,
	editContent: editContentReducer,
	editInfo: editInfoReducer,
	editExercises: editExercisesReducer
})