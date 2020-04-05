import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCourseById, getEnrollmentStatus } from './services/actions'
import OpenCourseInfo from './components/OpenCourseInfo'
import CourseEnrollForm from './components/CourseEnrollForm'
import { getAuthenticatedUser } from '../../../../services/actions'

class Course extends Component {

	componentDidMount(){
		let courseId = this.props.match.params.courseId;	
		this.props.getCourseById(courseId)
		this.props.getEnrollmentStatus(courseId, this.props.authenticatedUser);
	}

	render() {
		let { enrollmentStatus: status} = this.props;
		let courseStatusAlert;
		if (status === 'not logged in'){
			courseStatusAlert = (
				<div className="alert alert-info">
					Please log in to access this course
				</div>
				// add login button for convenience
			)
		}
		else if (status === 'enrolled'){
			courseStatusAlert = (
				<div className="alert alert-success">
					You are enrolled in the course
				</div>
			)
		}
		else if (status === 'not enrolled') {
			courseStatusAlert = (
				<CourseEnrollForm />
			)
		}
		return (
			//add password form
			<div className={this.props.className}>
				<OpenCourseInfo />
				{courseStatusAlert}
			</div>
		);
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
		getEnrollmentStatus: (courseId, user) => dispatch(getEnrollmentStatus(courseId, user)),
		getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Course);