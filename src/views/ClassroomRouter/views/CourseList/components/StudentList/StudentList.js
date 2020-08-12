import React, { Component } from 'react';
import { connect } from 'react-redux'
import CourseListItem from "../CourseListItem";
import {getUserSubscribedSet} from "../../services/helpers";
import CollapsibleCourseList from "../CollapsibleCourseList";

class StudentList extends Component {

	render() {
		let subscribedSet = getUserSubscribedSet(this.props.authenticatedUser);
		let { notViewedNotifications, enrolledCourses } = this.props;
		let notificationsCount = 0;
		for (let c of enrolledCourses){
			let curNotifications = notViewedNotifications[c._id];
			notificationsCount += curNotifications ? curNotifications : 0
		}

		console.log(this.props);


		return (
			<CollapsibleCourseList
				listName={(
					<div>
						Enrolled courses list
						<mark
							style={{
								background: 'yellow',
								display: (notificationsCount > 0) ? '' : 'none'
							}}
						>
							{notificationsCount}
						</mark>
					</div>
				)}
			>
				{enrolledCourses.map((course, i) => (
					<div key={i}>
						<CourseListItem
							course={course}
							notifications={notViewedNotifications[course._id]}
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