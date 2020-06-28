import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getEnrolledCourses, getNotViewedNotification } from '../../services/actions'
import CourseListItem from "../CourseListItem";

class StudentList extends Component {

	componentDidMount(){
		this.props.getEnrolledCourses(this.props.authenticatedUser._id);
	}

	render() {
		if (!this.props.enrolledCourses){
			return null;
		}
		return (
			<div className={this.props.className}>
				<h1>Enrolled courses:</h1>
				{this.props.enrolledCourses.map((course, i) => (
					<div key={i}>
						<CourseListItem
							course={course}
						/>
					</div>
				))}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.courseList,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getEnrolledCourses: (userId) => dispatch(getEnrolledCourses(userId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentList);