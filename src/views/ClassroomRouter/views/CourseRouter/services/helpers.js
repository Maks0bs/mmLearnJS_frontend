export let getEnrollmentStatus = (course, user) => {
	let courseId = course._id;
	let result = 'not enrolled';//change to normal constants
	if (!user || !user._id){
		return 'not logged in'
	}

	let courses = user.enrolledCourses;
	let teacherCourses = user.teacherCourses;

	if (course.creator && user._id === course.creator._id){
		return 'creator'
	}

	if (course.invitedTeachers){
		for (let i of course.invitedTeachers){
			if (i === user._id || i._id === user._id){
				for (let j of courses) {
					if (j === courseId){
						return 'invited teacher enrolled'
					}
				}
				return 'invited teacher'
			}
		}
	}

	for (let i of teacherCourses) {
		if (i === courseId){
			return 'teacher'
		}
	}

	for (let i of courses) {
		if (i === courseId){
			return 'enrolled'
		}
	}

	return 'not enrolled'
}

export let removeLastUrlParam = (url) => {
	let copy = `${url}`;
	let splitted = copy.split('/');
	let last = splitted[splitted.length - 1];
	return copy.slice(0, -(last.length + 1) );
}