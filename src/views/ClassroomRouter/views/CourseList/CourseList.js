import React, { Component } from 'react';
import { connect } from 'react-redux'
import MainDashboard from './components/MainList'
import StudentDashboard from './components/StudentList'
import TeacherDashboard from './components/TeacherList'
import {cleanup} from "./services/actions";
import SmallLoading from "../../../../components/reusables/SmallLoading";

/**
 * Lists all courses that are relevant to the user
 * and also the list of all open courses
 * @memberOf components.views.classroom
 * @component
 */
class CourseList extends Component {

	componentWillUnmount() {this.props.cleanup();}

	render() {
		let { authenticatedUser: user } = this.props;
		let isAuthenticated = user && user._id;

		return (
			<div className="container my-5">
				{isAuthenticated && user.role === 'teacher' && (
					<div>
						{this.props.teacherCourses ? (
							<TeacherDashboard />
						) : (
							<SmallLoading />
						)}
					</div>
				)}
				{isAuthenticated && (
					<div>
						{this.props.enrolledCourses ? (
							<StudentDashboard className="mt-5" />
						) : (
							<SmallLoading />
						)}
					</div>
				)}
				<div>
					{this.props.openCourses ? (
						<MainDashboard />
					) : (
						<SmallLoading />
					)}
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
	cleanup: () => dispatch(cleanup())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseList)