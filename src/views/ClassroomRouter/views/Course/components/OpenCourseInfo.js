import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCourseById, getEnrollmentStatus } from '../services/actions'

class OpenCourseInfo extends Component {
	render() {
		return (
			<div>
				<h1>Open course info</h1>
				{JSON.stringify(this.props.courseData)}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course
	}
}

export default connect(
	mapStateToProps
)(OpenCourseInfo);
