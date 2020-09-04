import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import ClassroomMenu from './components/ClassroomMenu'
import MainClassroom from './views/MainClassroom'
import { connect } from 'react-redux'
import ActivationMessage from '../components/ActivationMessage'
import UserRouter from './views/UserRouter'
import CourseList from './views/CourseList'
import Dashboard from "./views/Dashboard";
import CourseRouter from './views/CourseRouter'
import SearchCourses from "./views/SearchCourses/SearchCourses";
import BigLoadingCentered from "../../components/reusables/BigLoadingCentered";
import {
	addNotViewedNotifications, getEnrolledCourses,
	getOpenCourses, getTeacherCourses
} from "./views/CourseList/services/actions";
import { getUser } from "./views/UserRouter/services/actions";
import {addToast} from "../../components/ToastRoot/services/actions";
import CreateCourse from "./views/CreateCourse";

/**
 * @namespace components.views.classroom
 */

/**
 * This router is responsible for routing to all links that are
 * used by authenticated users. This is the core of the website,
 * all most important features are on this router
 * @memberOf components.views.classroom
 * @component
 */
class ClassroomRouter extends Component {

	displayError = (text) => {
		return this.props.addToast(
			(<div>{text.message || text || 'Error occurred'}</div>),
			{type: 'error'}
		)
	}
	 // Receives course lists, handles errors and adds notifications
	handleCourseListData = (payload) => {
		if (payload.error) {
			return this.displayError(payload.error.message || payload.error);
		}
		return this.props.addNotViewedNotifications(
			// Extract IDs from the whole course data
			Array.isArray(payload) ? payload.map(c => c._id) : []
		)
			.then(() => {
				if (this.props.error) throw {
					message: 'Problem with loading enrolled courses'
				}
			})
			.catch(err => this.displayError(err.message))
	}

	render() {
		let { authenticatedUser: user } = this.props;
		if (user === null){ return (<BigLoadingCentered />)}

		let { path } = this.props.match;
		return (
			<div>
				<ActivationMessage />
				<ClassroomMenu />
				<Switch>
					<Route
						exact path={`${path}`}
						component={MainClassroom}
					/>
					<Route
						exact path={`${path}/courses`}
						render={() => {
							this.props.getOpenCourses()

							let isAuthenticated = user && user._id;
							if (isAuthenticated) {
								this.props.getEnrolledCourses(user._id)
									.then(({payload}) => this.handleCourseListData(payload));
								(user.role === 'teacher') &&
								this.props.getTeacherCourses(user._id)
									.then(({payload}) => this.handleCourseListData(payload));
							}
							return (<CourseList />)
						}}
					/>
					<Route
						exact path={`${path}/dashboard`}
						component={Dashboard}
					/>
					<Route
						exact path={`${path}/search/:searchQuery`}
						component={SearchCourses}
					/>
					<Route
						exact path={`${path}/create-course`}
						component={CreateCourse}
					/>
					<Route
						path={`${path}/course`}
						component={CourseRouter}
					/>
					<Route
						path={`${path}/user/:userId`}
						render={() => {
							let [,userId] = /^\/classroom\/user\/([A-Za-z0-9]+)/.exec(
								this.props.location.pathname
							);
							this.props.getUser(userId);
							return (<UserRouter />)
						}}
					/>
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => ({...state.services})
let mapDispatchToProps = (dispatch) => ({
	getOpenCourses: () => dispatch(getOpenCourses()),
	getEnrolledCourses: (userId) => dispatch(getEnrolledCourses(userId)),
	getTeacherCourses: (userId) => dispatch(getTeacherCourses(userId)),
	addNotViewedNotifications: (courses) => dispatch(addNotViewedNotifications(courses)),
	addToast: (component, options) => dispatch(addToast(component, options)),
	getUser: (userId) => dispatch(getUser(userId))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ClassroomRouter));