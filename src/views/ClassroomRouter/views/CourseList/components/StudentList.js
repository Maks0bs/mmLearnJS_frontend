import React, { Component } from 'react';
import { connect } from 'react-redux'
import CourseListItem from "./CourseListItem";
import {getUserSubscribedSet} from "../services/helpers";
import CollapsibleCourseList from "./CollapsibleCourseList";

/**
 * The list of courses, that the current user is enrolled in, wrapped in a
 * {@link components.views.classroom.CourseList.CollapsibleCourseList}
 * @memberOf components.views.classroom.CourseList
 * @component
 */
class StudentList extends Component {

	render() {
		let { notViewedNotifications,
			enrolledCourses: courses,
			authenticatedUser
		} = this.props;
		let subscribedSet = getUserSubscribedSet(authenticatedUser.subscribedCourses);
		let notificationsCount = 0;
		// Calculate the overall amount of notifications in the given list
		if (Array.isArray(courses)){
			for (let c of courses){
				let curNotifications = notViewedNotifications[c._id];
				notificationsCount += curNotifications ? curNotifications : 0
			}
		}


		return (
			<CollapsibleCourseList
				listHeading={(
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
				loading={this.props.loading.enrolled}
			>
				{courses ? courses.map((course, i) => (
					<div key={i}>
						<CourseListItem
							course={course}
							notifications={notViewedNotifications[course._id]}
							subscribed={!!subscribedSet[course._id]}
						/>
					</div>
				)) : []}
			</CollapsibleCourseList>
		);
	}
}

let mapStateToProps = (state) => ({
	...state.views.classroom.courseList,
	authenticatedUser: state.services.authenticatedUser
})
export default connect(
	mapStateToProps
)(StudentList);