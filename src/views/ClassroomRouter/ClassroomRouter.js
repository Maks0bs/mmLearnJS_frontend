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
import { getUser } from "./views/UserRouter/services/actions";
import CreateCourse from "./views/CreateCourse";
import {getCourseById, getFirstTimeStatus} from "./views/CourseRouter/services/actions";

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

	render() {
		let { authenticatedUser: user } = this.props;
		if (user === null){
			return (<BigLoadingCentered />)
		}

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
						component={CourseList}
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
						path={`${path}/course/:courseId`}
						render={() => {
							let [, courseId] = /^\/classroom\/course\/([A-Za-z0-9]+)/.exec(
								this.props.location.pathname
							);
							console.log('render cr');
							this.props.getCourseById(courseId, user);
							this.props.getFirstTimeStatus();
							return (<CourseRouter />)
						}}
					/>
					<Route
						path={`${path}/user/:userId`}
						render={() => {
							let [, userId] = /^\/classroom\/user\/([A-Za-z0-9]+)/.exec(
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

let mapStateToProps = (state) => ({
	...state.services
})
let mapDispatchToProps = (dispatch) => ({
	getUser: (userId) => dispatch(getUser(userId)),
	getCourseById: (id, user) => dispatch(getCourseById(id, user)),
	getFirstTimeStatus: () => dispatch(getFirstTimeStatus())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ClassroomRouter));