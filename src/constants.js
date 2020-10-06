export let REACT_APP_API_URL = (() => {
	switch(process.env.NODE_ENV){
		case 'production':
			return process.env.REACT_APP_API_URL || 'http://localhost:8080'
		case 'development':
			return process.env.REACT_APP_DEV_API_URL || 'http://localhost:8080'
		case 'test':
			return process.env.REACT_APP_TEST_API_URL || 'http://localhost:8080'
		default:
			return 'http://localhost:8080'
	}
})();
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