import React, { Component } from 'react';
import { connect } from 'react-redux'
import CourseListItem from "../CourseListItem";
import {getUserSubscribedSet} from "../../services/helpers";
import CollapsibleCourseList from "../CollapsibleCourseList";

class StudentList extends Component {

	render() {
		let subscribedSet = getUserSubscribedSet(this.props.authenticatedUser);
		return (
			<CollapsibleCourseList
				listName={"Enrolled courses"}
			>
				{this.props.enrolledCourses.map((course, i) => (
					<div key={i}>
						<CourseListItem
							course={course}
							notifications={this.props.notViewedNotifications[course._id]}
							subscribed={!!subscribedSet[course._id]}
						/>
					</div>
				))}
			</CollapsibleCourseList>
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