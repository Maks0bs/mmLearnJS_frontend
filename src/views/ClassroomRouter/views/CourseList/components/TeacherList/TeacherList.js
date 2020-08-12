import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CourseListItem from "../CourseListItem";
import { getUserSubscribedSet, transitionStyles} from "../../services/helpers";
import { Transition } from 'react-transition-group'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import CollapsibleCourseList from "../CollapsibleCourseList";

class TeacherList extends Component {
	constructor(props){
		super(props);

		this.state = {
			redirectToCreateCourse: false,
			showList: false
		}
	}

	handleCreateCourse = () => {
		this.setState({
			redirectToCreateCourse: true
		})
	}



	render() {
		let { redirectToCreateCourse } = this.state;
		let { notViewedNotifications, teacherCourses } = this.props;
		if (redirectToCreateCourse){
			return (
				<Redirect to="/classroom/course/create" />
			)
		}

		let subscribedSet = getUserSubscribedSet(this.props.authenticatedUser);

		let notificationsCount = 0;
		for (let c of teacherCourses){
			let curNotifications = notViewedNotifications[c._id];
			notificationsCount += curNotifications ? curNotifications : 0;
		}



		return (
			<div className={this.props.className}>
				<button
					className="btn btn-outline m-4"
					onClick={this.handleCreateCourse}
				>
					Create new course
				</button>
				<CollapsibleCourseList
					listName={(
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
				>
					{teacherCourses.map((course, i) => (
						<div key={i}>
							<CourseListItem
								course={course}
								notifications={notViewedNotifications[course._id]}
								subscribed={!!subscribedSet[course._id]}
							/>
						</div>
					))}
				</CollapsibleCourseList>
			</div>
		)
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
)(TeacherList);