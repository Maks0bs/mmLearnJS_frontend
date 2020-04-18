import { REACT_APP_API_URL } from '../../../../../constants'

export let updateCourse = (updateData, id, returnDispatchType) => (dispatch) => {

	let form = new FormData();
	if (updateData.files) {
		form.set('files', updateData.files)
	}
	delete updateData.files;
	for (let i of Object.keys(updateData)){
		if (!updateData[i]){
			continue;
		}
		form.set(i, JSON.stringify(updateData[i]));
	}
	//form.set('newCourseData', JSON.stringify(updateData.newCourseData));

	return fetch(`${REACT_APP_API_URL}/courses/update/${id}`, {
		method: "PUT",
		headers: {
		},
		credentials: 'include',
		body: form
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