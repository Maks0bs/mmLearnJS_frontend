let reactAppApiUrl;
if (process.env.NODE_ENV === 'production'){
	reactAppApiUrl = 'https://mmlearnjs-backend.herokuapp.com'
}
else{
	reactAppApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080'
}

export let REACT_APP_API_URL = reactAppApiUrl;
/*
	If there will be too many notification types,
	retrieve these types from the API (make a correspondent route in the API beforehand)
 */
export let notifications = {
	types: {
		ACTIVATE_ACCOUNT: 'USER_NOTIFICATION_ACTIVATE_ACCOUNT',
		COURSE_TEACHER_INVITATION: 'USER_NOTIFICATION_TEACHER_INVITATION'
	}
}