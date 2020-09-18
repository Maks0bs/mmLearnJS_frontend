/**
 *
 * @param {CourseData} course
 * @param {UserData} user
 * @return {string} - the status 'relationship' of the
 * current authenticated user to the given course
 * according to {@link COURSE_USER_STATUS}
 */
export let getCurUserCourseStatus = (course, user) => {
	let {
		NOT_ENROLLED, ENROLLED, TEACHER, INVITED_TEACHER,
		INVITED_TEACHER_ENROLLED, CREATOR, NOT_AUTHENTICATED
	} = COURSE_USER_STATUS;
	let {enrolledCourses, teacherCourses } = user;
	if (!user || !user._id){
		return NOT_AUTHENTICATED
	}

	if (course.creator && (
		user._id === course.creator || user._id === course.creator._id
	)){
		return CREATOR
	}

	if (course.invitedTeachers){
		for (let it of course.invitedTeachers){
			if (it === user._id || it._id === user._id){
				for (let ec of enrolledCourses) {
					if (ec === course._id){
						return INVITED_TEACHER_ENROLLED
					}
				}
				return INVITED_TEACHER
			}
		}
	}

	for (let tc of teacherCourses) {
		if (tc === course._id || tc._id === course._id){
			return TEACHER
		}
	}
	for (let ec of enrolledCourses) {
		if (ec === course._id || ec._id === course._id){
			return ENROLLED
		}
	}
	return NOT_ENROLLED
}

// "Status" is a plural of "status", pronounced [statoos]
export let COURSE_USER_STATUS = {
	NOT_ENROLLED: 'not enrolled',
	ENROLLED: 'enrolled',
	TEACHER: 'teacher',
	INVITED_TEACHER: 'invited teacher',
	INVITED_TEACHER_ENROLLED: 'invited teacher enrolled',
	CREATOR: 'creator',
	NOT_AUTHENTICATED: 'not logged in'
}

export let removeLastUrlParam = (url) => {
	let copy = `${url}`;
	let splitted = copy.split('/');
	let last = splitted[splitted.length - 1];
	return copy.slice(0, -(last.length + 1) );
}