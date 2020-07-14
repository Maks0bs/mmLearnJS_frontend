import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import {clearMessages, getCourseById} from './services/actions'
import OpenCourseInfo from './components/OpenCourseInfo'
import CourseEnrollForm from './components/CourseEnrollForm'
import TeacherActions from './components/TeacherActions'
import CreatorActions from './components/CreatorActions'
import CourseData from './components/CourseData'
import InvitedTeacherInfo from './components/InvitedTeacherInfo'
import { getEnrollmentStatus } from '../../../../services/helpers'
import CourseTabs from "./components/CourseTabs";

class Info extends Component {



	render() {
		if (this.props.redirectToDashboard){
			this.props.clearMessages();
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
					<div className="container mt-3">
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
					<div className="container mt-3">
						<CourseTabs status={status}/>
						<CourseData />
					</div>
				)
				break;
			case 'teacher':
				course =(
					<div className="container mt-3">
						<CourseTabs status={status}/>
						<CourseData />
						<TeacherActions />
					</div>
				)
				break;
			case 'invited teacher':
				course = (
					<div className="container mt-3">
						<InvitedTeacherInfo />
						<OpenCourseInfo />
						<CourseEnrollForm />
					</div>
				)
				break;
			case 'invited teacher enrolled':
				course = (
					<div className="container mt-3">
						<CourseTabs status={status}/>
						<InvitedTeacherInfo />
						<CourseData />
					</div>
				)
				break;
			case 'creator':
				course = (
					<div className="container mt-3">
						<CourseTabs status={status}/>
						<CourseData />
						<TeacherActions />
						<CreatorActions />
					</div>
				)
				break;
			case 'not enrolled':
				course = (
					<div className="container mt-3">
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

let mapDispatchToProps = (dispatch) => {
	return {
		clearMessages: () => dispatch(clearMessages())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Info));