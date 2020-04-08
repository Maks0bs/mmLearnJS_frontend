import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCourseById } from './services/actions'
import OpenCourseInfo from './components/OpenCourseInfo'
import CourseEnrollForm from './components/CourseEnrollForm'
import TeacherActions from './components/TeacherActions'
import CreatorActions from './components/CreatorActions'
import CourseData from './components/CourseData'

class Course extends Component {

	componentDidMount(){
		let courseId = this.props.match.params.courseId;
		this.props.getCourseById(courseId)
	}

	getEnrollmentStatus() {
		let course = this.props.courseData;
		let courseId = course._id;
		let user = this.props.authenticatedUser;
		let result = 'not enrolled';//change to normal constants
		if (!user || !user._id){
			return 'not logged in'
		}


		let courses = user.enrolledCourses;
		let teacherCourses = user.teacherCourses;

		if (user._id === course.creator){
			return 'creator'
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

	render() {
		let status = this.getEnrollmentStatus();
		let course;
		switch (status){
			case 'not logged in':
				course = (
					<div>
						<OpenCourseInfo />
						<div className="alert alert-info">
							Please log in to access this course
						</div>
					</div>
					// add login button for convenience
				)
				break;
			case 'enrolled':
				course = (
					<div>
						<CourseData />
						<div className="alert alert-success">
							You are enrolled in the course
						</div>
					</div>
				)
				break;
			case 'teacher':
				course =(
					<div>
						<CourseData />
						<TeacherActions />
					</div>
				)
			case 'creator':
				course = (
					<div>
						<CourseData />
						<TeacherActions />
						<CreatorActions />
					</div>
				)
				break;
			case 'not enrolled':
				course = (
					<div>
						<OpenCourseInfo />
						<CourseEnrollForm />
					</div>
				)
				break;
			default:
				course = null;
				break;
		}
		return course;
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getCourseById: (courseId) => dispatch(getCourseById(courseId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Course);