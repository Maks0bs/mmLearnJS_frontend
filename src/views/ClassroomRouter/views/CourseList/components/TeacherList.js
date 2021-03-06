import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CourseListItem from "./CourseListItem";
import { getUserSubscribedSet } from "../services/helpers";
import CollapsibleCourseList from "./CollapsibleCourseList";

/**
 * The list of courses, where the current user is a teacher, wrapped in a
 * {@link components.views.classroom.CourseList.CollapsibleCourseList}
 * @memberOf components.views.classroom.CourseList
 * @component
 */
class TeacherList extends Component {
	constructor(props){
		super(props);

		this.state = {
			redirectToCreateCourse: false,
		}
	}

	handleCreateCourse = () => this.setState({redirectToCreateCourse: true})

	render() {
		let { redirectToCreateCourse } = this.state;
		let { notViewedNotifications,
			teacherCourses: courses,
			authenticatedUser
		} = this.props;
		if (redirectToCreateCourse){
			return (<Redirect to="/classroom/create-course" />)
		}

		let subscribedSet = getUserSubscribedSet(authenticatedUser.subscribedCourses);
		let notificationsCount = 0;
		// Calculate the overall amount of notifications in the given list
		if (Array.isArray(courses)){
			for (let c of courses){
				let curNotifications = notViewedNotifications[c._id];
				notificationsCount += curNotifications ? curNotifications : 0;
			}
		}
		return (
			<div className={this.props.className}>
				<button
					className="btn btn-raised btn-info mx-3 mb-3"
					onClick={this.handleCreateCourse}
				>
					Create new course
				</button>
				<CollapsibleCourseList
					listHeading={(
						<div>
							Teachers list
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
					loading={this.props.loading.teacher}
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
			</div>
		)
	}
}

let mapStateToProps = (state) => ({
	...state.views.classroom.courseList,
	...state.services
})
export default connect(
	mapStateToProps
)(TeacherList);