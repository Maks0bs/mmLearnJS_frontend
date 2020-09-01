import { combineReducers } from 'redux'
import mainReducer from '../views/MainRouter/services/reducer'
import createCourseReducer from '../../CreateCourse/services/reducer'
import editContentReducer from '../views/EditContent/services/reducer'
import editInfoReducer from '../views/EditInfo/services/reducer'
import editExercisesReducer from '../views/EditExercises/services/reducer'

export default combineReducers({
	main: mainReducer,
	editContent: editContentReducer,
	editInfo: editInfoReducer,
	editExercises: editExercisesReducer
})