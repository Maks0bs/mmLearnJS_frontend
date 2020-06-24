import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { getCourseById } from './services/actions'
import OpenCourseInfo from './components/OpenCourseInfo'
import CourseEnrollForm from './components/CourseEnrollForm'
import TeacherActions from './components/TeacherActions'
import CreatorActions from './components/CreatorActions'
import CourseData from './components/CourseData'
import InvitedTeacherInfo from './components/InvitedTeacherInfo'
import { getEnrollmentStatus } from '../../../../services/helpers'

class Info extends Component {



	render() {
		if (this.props.redirectToDashboard){
			return (
				<Redirect to="/classroom/dashboard" />
			)
		}
		if (!this.props.courseData){
			return null;
		}
		let status = getEnrollmentStatus(this.props.courseData, this.props.authenticatedUser);
		let course;
		switch (status){
			case 'not logged in':
				course = (
					<div className="container">
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
					<div className="container">
						<CourseData />
					</div>
				)
				break;
			case 'teacher':
				course =(
					<div className="container">
						<CourseData />
						<TeacherActions />
					</div>
				)
				break;
			case 'invited teacher':
				course = (
					<div className="container">
						<InvitedTeacherInfo />
						<OpenCourseInfo />
						<CourseEnrollForm />
					</div>
				)
				break;
			case 'invited teacher enrolled':
				course = (
					<div className="container">
						<InvitedTeacherInfo />
						<CourseData />
					</div>
				)
				break;
			case 'creator':
				course = (
					<div className="container">
						<CourseData />
						<TeacherActions />
						<CreatorActions />
					</div>
				)
				break;
			case 'not enrolled':
				course = (
					<div className="container">
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
		...state.views.classroom.course.main.info,
		...state.views.classroom.course.main.services,
		authenticatedUser: state.services.authenticatedUser
	}
}

export default connect(
	mapStateToProps,
	null
)(withRouter(Info));