import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getTeacherCourses, getNotViewedNotification } from '../../services/actions'
import CourseListItem from "../CourseListItem";

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

	componentDidMount(){
		this.props.getTeacherCourses(this.props.authenticatedUser._id);
	}

	render() {
		let { redirectToCreateCourse } = this.state;
		if (redirectToCreateCourse){
			return (
				<Redirect to="/classroom/course/create" />
			)
		}

		let { teacherCourses: courses} = this.props
		if (!courses){
			courses = [];
		}
		
		return (
			<div className={this.props.className}>
				<button
					className="btn btn-outline m-4"
					onClick={this.handleCreateCourse}
				>
					Create new course
				</button>
				<h1>Teacher courses: </h1>
				{courses.map((course, i) => (
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
		getTeacherCourses: (userId) => dispatch(getTeacherCourses(userId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TeacherList);