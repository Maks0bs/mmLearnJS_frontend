import React, { Component } from 'react';
import { connect } from 'react-redux'
import MainDashboard from './components/MainList'
import StudentDashboard from './components/StudentList'
import TeacherDashboard from './components/TeacherList'
import {
	clearNotifications,
	getTeacherCourses,
	getEnrolledCourses,
	getOpenCourses,
	addNotViewedNotifications
} from "./services/actions";
import { addToast } from "../../../../components/ToastRoot/services/actions";
import OptimizedPureComponent from '../../../../components/performance/OptimizedPureComponent'
import SmallLoading from "../../../../components/reusables/SmallLoading";


class CourseList extends OptimizedPureComponent {
	loadOpen = false
	loadEnrolled = false
	loadTeacher = false


	componentWillUnmount() {
		this.props.clearNotifications();
	}

	handleLoad = () => {
		this.loading = this.loadOpen || this.loadEnrolled || this.loadTeacher
	}

	onLoad = () => {
		let { authenticatedUser: user } = this.props;

		this.loadOpen = true;
		this.props.getOpenCourses()
			.then(() => {
				this.loadOpen = false;
				this.handleLoad();
			})
		if (user && user._id && !(this.props.enrolledCourses)) {
			this.loadEnrolled = true;
			this.props.getEnrolledCourses(user._id)
				.then(() => {
					if (this.props.error) throw {
						message: 'Problem with loading enrolled courses'
					}

					this.loadEnrolled = false;
					this.handleLoad();

					return this.props.addNotViewedNotifications(
						this.props.enrolledCourses.map(c => c._id)
					);
				})
				.then(() => {
					if (this.props.error) throw {
						message: 'Problem with loading enrolled courses'
					}
				})
				.catch(err => {
					this.displayError(err.message);
				})
		} else if (user && user._id){
			this.props.addNotViewedNotifications(
				this.props.enrolledCourses.map(c => c._id)
			)
				.then(() => {
					if (this.props.error) throw {
						message: 'Problem with loading enrolled courses'
					}
				})
				.catch(err => {
					this.displayError(err.message);
				})
		}
		if (user && user._id && user.role === 'teacher' &&
			!(this.props.teacherCourses)
		){
			this.loadTeacher = true;
			this.props.getTeacherCourses(user._id)
				.then(() => {
					if (this.props.error) throw {
						message: 'Problem with loading teacher courses'
					}

					this.loadTeacher = false;
					this.handleLoad();

					return this.props.addNotViewedNotifications(
						this.props.teacherCourses.map(c => c._id)
					);
				})
				.then(() => {
					if (this.props.error) throw {
						message: 'Problem with loading teacher courses'
					}
				})
				.catch(err => {
					this.displayError(err.message);
				})
		} else if (user && user._id && user.role === 'teacher'){
			this.props.addNotViewedNotifications(
				this.props.teacherCourses.map(c => c._id)
			)
				.then(() => {
					if (this.props.error) throw {
						message: 'Problem with loading teacher courses'
					}
				})
				.catch(err => {
					this.displayError(err.message);
				})
		}

	}

	displayError = (text) => {
		return this.props.addToast(
			(
				<div>
					{this.props.error || text.message}
				</div>
			),
			{
				type: 'error'
			}
		)
	}


	render() {
		super.render();
		if (this.canCallOptimally() && !this.loading){
			this.onLoad();
		}
		let { authenticatedUser: user } = this.props;

		return (
			<div className="container">
				{user && user._id && user.role === 'teacher' && (
					<div>
						{this.props.teacherCourses ? (
							<TeacherDashboard />
						) : (
							<SmallLoading />
						)}
					</div>
				)}
				{user && user._id && (
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

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.courseList,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		clearNotifications: () => dispatch(clearNotifications()),
		addToast: (component, options) => dispatch(addToast(component, options)),
		getOpenCourses: () => dispatch(getOpenCourses()),
		getEnrolledCourses: (userId) => dispatch(getEnrolledCourses(userId)),
		getTeacherCourses: (userId) => dispatch(getTeacherCourses(userId)),
		addNotViewedNotifications: (courses) => dispatch(addNotViewedNotifications(courses))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseList)