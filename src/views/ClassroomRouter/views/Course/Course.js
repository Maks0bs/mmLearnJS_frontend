import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCourseById } from './services/actions'
import OpenCourseInfo from './components/OpenCourseInfo'
import CourseEnrollForm from './components/CourseEnrollForm'
import TeacherActions from './components/TeacherActions'
import CourseData from './components/CourseData'
import { getAuthenticatedUser } from '../../../../services/actions'

class Course extends Component {

	componentDidMount(){
		console.log('mounted courses');
		let courseId = this.props.match.params.courseId;
		this.props.getCourseById(courseId)
	}

	getEnrollmentStatus(user, courseId) {
		let result = 'not enrolled';//change to normal constants
		if (!user || !user._id){
			return 'not logged in'
		}


		let courses = user.enrolledCourses;
		let teacherCourses = user.teacherCourses;

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

	render() {
		let courseId = this.props.match.params.courseId;
		let user = this.props.authenticatedUser;
		let status = this.getEnrollmentStatus(user, courseId);
		let course;
		if (status === 'not logged in'){
			course = (
				<div>
					<OpenCourseInfo />
					<div className="alert alert-info">
						Please log in to access this course
					</div>
				</div>
				// add login button for convenience
			)
		}
		else if (status === 'enrolled'){
			course = (
				<div>
					<CourseData />
					<div className="alert alert-success">
						You are enrolled in the course
					</div>
				</div>
			)
		}
		else if (status === 'teacher') {
			course =(
				<div>
					<CourseData />
					<TeacherActions />
				</div>
			)
		}
		else if (status === 'not enrolled') {
			course = (
				<div>
					<OpenCourseInfo />
					<CourseEnrollForm />
				</div>
			)
		}
		return course;
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getCourseById: (courseId) => dispatch(getCourseById(courseId)),
		getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Course);