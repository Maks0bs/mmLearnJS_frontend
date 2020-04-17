import types from './actionTypes'
import { getUserById } from '../../../../../services/actions'
let { API_GET_USER_BY_ID } = types;

export let getUser = (userId) => (dispatch) => {
	return dispatch(getUserById(userId, API_GET_USER_BY_ID));
}