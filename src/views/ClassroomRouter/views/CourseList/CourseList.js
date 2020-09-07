import React, { Component } from 'react';
import { connect } from 'react-redux'
import MainList from './components/MainList'
import StudentList from './components/StudentList'
import TeacherList from './components/TeacherList'
import {
	addNotViewedNotifications, cleanup, setLoading,
	getEnrolledCourses, getOpenCourses, getTeacherCourses
} from "./services/actions";
import SmallLoading from "../../../../components/reusables/SmallLoading";
import {addToast} from "../../../../components/ToastRoot/services/actions";

/**
 * Lists all courses that are relevant to the user
 * and also the list of all open courses
 * @memberOf components.views.classroom
 * @component
 */
class CourseList extends Component {

	displayError = (text) => {
		return this.props.addToast(
			(<div>{text.message || text || 'Error occurred'}</div>),
			{type: 'error'}
		)
	}
	// Receives course lists, handles errors and adds notifications
	handleCourseListData = (payload) => {
		if (this.props.error) {
			return this.displayError(this.props.error.message || this.props.error);
		}
		return this.props.addNotViewedNotifications(
			// Extract IDs from the whole course data
			Array.isArray(payload) ? payload.map(c => c._id) : []
		)
			.then(() => {
				if (this.props.error) throw {
					message: 'Problem with loading courses'
				}
			})
			.catch(err => this.displayError(err.message))
	}

	componentDidMount() {
		let { authenticatedUser: user } = this.props;
		this.props.setLoading('open' , true);
		this.props.getOpenCourses()

		let isAuthenticated = user && user._id;
		if (isAuthenticated) {
			this.props.setLoading('enrolled' , true);
			this.props.getEnrolledCourses(user._id)
				.then(() => this.handleCourseListData(this.props.enrolledCourses))
			if (user.role === 'teacher') {
				this.props.setLoading('teacher', true);
				this.props.getTeacherCourses(user._id)
					.then(() => this.handleCourseListData(this.props.teacherCourses));
			}

		}
	}

	componentWillUnmount() {this.props.cleanup()}

	render() {
		let { authenticatedUser: user } = this.props;
		let isAuthenticated = user && user._id;

		return (
			<div className="container my-5">
				{isAuthenticated && user.role === 'teacher' && (
					<TeacherList />
				)}
				{isAuthenticated && (
					<StudentList />
				)}
				<div>
					<MainList />
				</div>
			</div>
		);
	}
}

let mapStateToProps = (state) => ({
	...state.views.classroom.courseList,
	...state.services
})
let mapDispatchToProps = (dispatch) => ({
	cleanup: () => dispatch(cleanup()),
	getOpenCourses: () => dispatch(getOpenCourses()),
	getEnrolledCourses: (userId) => dispatch(getEnrolledCourses(userId)),
	getTeacherCourses: (userId) => dispatch(getTeacherCourses(userId)),
	addNotViewedNotifications: (courses) => dispatch(addNotViewedNotifications(courses)),
	addToast: (component, options) => dispatch(addToast(component, options)),
	setLoading: (listName, value) => dispatch(setLoading(listName, value))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseList)