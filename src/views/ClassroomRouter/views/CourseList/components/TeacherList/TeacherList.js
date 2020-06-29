import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CourseListItem from "../CourseListItem";
import {getUserSubscribedSet} from "../../services/helpers";

class TeacherList extends Component {
	constructor(props){
		super(props);

		this.state = {
			redirectToCreateCourse: false
		}
	}

	handleCreateCourse = () => {
		this.setState({
			redirectToCreateCourse: true
		})
	}

	render() {
		let { redirectToCreateCourse } = this.state;
		if (redirectToCreateCourse){
			return (
				<Redirect to="/classroom/course/create" />
			)
		}

		let subscribedSet = getUserSubscribedSet(this.props.authenticatedUser);
		
		return (
			<div className={this.props.className}>
				<button
					className="btn btn-outline m-4"
					onClick={this.handleCreateCourse}
				>
					Create new course
				</button>
				<h1>Teacher courses: </h1>
				{this.props.teacherCourses.map((course, i) => (
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
)(TeacherList);