import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getEnrollmentStatus } from '../services/actions'

class OpenCourseInfo extends Component {
	render() {
		let { about, name, teachers } = this.props.courseData;
		return (
			<div>
				<h1>{name}</h1>
				<div className="ml-4">
					<h2 className="ml-4">Teachers:</h2>
					<p className="ml-5">{JSON.stringify(teachers)}</p>
				</div>
				<div className="ml-4">
					<h2 className="ml-4">About the course:</h2>
					<p className="ml-5">{about}</p>
				</div>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.services
	}
}

export default connect(
	mapStateToProps
)(OpenCourseInfo);
