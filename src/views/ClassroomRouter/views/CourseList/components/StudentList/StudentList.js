import React, { Component } from 'react';
import { connect } from 'react-redux'
import CourseListItem from "../CourseListItem";
import {getUserSubscribedSet} from "../../services/helpers";

class StudentList extends Component {

	render() {
		let subscribedSet = getUserSubscribedSet(this.props.authenticatedUser);
		return (
			<div className={this.props.className}>
				<h1>Enrolled courses:</h1>
				{this.props.enrolledCourses.map((course, i) => (
					<div key={i}>
						<CourseListItem
							course={course}
							notifications={this.props.notViewedNotifications[course._id]}
							subscribed={!!subscribedSet[course._id]}
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

export default connect(
	mapStateToProps,
	null
)(StudentList);