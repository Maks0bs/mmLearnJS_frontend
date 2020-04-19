import { REACT_APP_API_URL } from '../../../../../constants'

export let updateCourse = (updateData, id, returnDispatchType) => (dispatch) => {
	return fetch(`${REACT_APP_API_URL}/courses/update/${id}`, {
		method: "PUT",
		headers: {
		},
		credentials: 'include',
		body: updateData
	})
	.then(res => res.json())
	.then(data => {
		console.log('received data', data);
		dispatch({
			type: returnDispatchType,
			payload: data
		})
	})
	.catch(err => console.log(err))
}