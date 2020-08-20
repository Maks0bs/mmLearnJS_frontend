import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ClassroomMenu from './components/ClassroomMenu'
import Main from './views/Main'
import { getAuthenticatedUser } from '../../services/actions'
import { connect } from 'react-redux'
import ActivationMessage from '../components/ActivationMessage'
import UserRouter from './views/UserRouter'
import CourseList from './views/CourseList'
import Dashboard from "./views/Dashboard";
import CourseRouter from './views/CourseRouter'
import OptimizedComponent from "../../components/performance/OptimizedComponent";
import SearchCourses from "./views/SearchCourses/SearchCourses";
import BigLoadingCentered from "../../components/reusables/BigLoadingCentered";
import OptimizedPureComponent from "../../components/performance/OptimizedPureComponent";

class ClassroomRouter extends OptimizedPureComponent {

	render() {
		super.render();
		if (this.canCallOptimally()){
			this.startLoading()
			this.props.getAuthenticatedUser()
				.then(() => {
					this.stopLoading();
				})
		}
		if (this.props.authenticatedUser === null){
			return (
				<BigLoadingCentered />
			)
		}
		
		let { path } = this.props.match;
		return (
			<div>

				<ActivationMessage />
				<ClassroomMenu />
				<Switch>
					<Route
						exact path={`${path}`}
						component={Main}
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
						path={`${path}/course`}
						component={CourseRouter}
					/>
					<Route
						path={`${path}/user/:userId`}
						component={UserRouter}
					/>
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClassroomRouter);
