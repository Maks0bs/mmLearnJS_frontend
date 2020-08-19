import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Info from './views/Info'
import ForumRouter from './views/ForumRouter'
import { connect } from 'react-redux'
import {getCourseById, viewCourse} from './services/actions'
import OptimizedPureComponent from "../../../../../../components/performance/OptimizedPureComponent";
import GradesRouter from "./views/GradesRouter/GradesRouter";
import ExerciseRouter from "./views/ExerciseRouter/ExerciseRouter";
import LoadingRingAnimated from '../../../../../../res/images/LoadingRingAnimated200px.svg'
import BigLoadingCentered from "../../../../../../components/reusables/BigLoadingCentered";


class MainRouter extends OptimizedPureComponent {

	render() {
		super.render();
		if (this.canCallOptimally()){
			this.props.getCourseById(this.props.match.params.courseId)
			if (this.props.authenticatedUser) {
				this.props.viewCourse(this.props.match.params.courseId);
			}
		}
		if (!this.props.courseData._id) {
			return (
				<BigLoadingCentered />
			)
		}
		let { path } = this.props.match;
		return (
			<div>
				<Switch>
					<Route
						exact path={`${path}/`}
						component={Info}
					/>
					
					<Route
						path={`${path}/forum/:forumId`}
						component={ForumRouter}
					/>

					<Route
						path={`${path}/exercise/:exerciseId`}
						component={ExerciseRouter}
					/>

					<Route
						path={`${path}/grades/:gradeFilter`}
						component={GradesRouter}
					/>
					
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.services,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getCourseById: (courseId) => dispatch(getCourseById(courseId)),
		viewCourse: (courseId) => dispatch(viewCourse(courseId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainRouter)
