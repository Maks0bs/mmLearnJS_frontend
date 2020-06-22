export let getEnrollmentStatus = (course, user) => {
	let courseId = course._id;
	let result = 'not enrolled';//change to normal constants
	if (!user || !user._id){
		return 'not logged in'
	}

	let courses = user.enrolledCourses;
	let teacherCourses = user.teacherCourses;

	for (let i of courses) {
		if (i === courseId){
			return 'enrolled'
		}
	}

	if (course.invitedTeachers){
		return 'invited teacher'
	}

	if (course.creator && user._id === course.creator._id){
		return 'creator'
	}

	for (let i of teacherCourses) {
		if (i === courseId){
			return 'teacher'
		}
	}

	return 'not enrolled'
}