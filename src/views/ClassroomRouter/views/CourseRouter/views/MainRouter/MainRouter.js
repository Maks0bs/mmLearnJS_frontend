import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Info from './views/Info'
import ForumRouter from './views/ForumRouter'
import { connect } from 'react-redux'
import { toggleLoading } from "../../../../../../services/actions";
import {getCourseById, viewCourse} from './services/actions'
import OptimizedPureComponent from "../../../../../../components/OptimizedPureComponent";
import GradesRouter from "./views/GradesRouter/GradesRouter";
import ExerciseRouter from "./views/ExerciseRouter/ExerciseRouter";
import LoadingRingAnimated from '../../../../../../res/images/LoadingRingAnimated200px.svg'


class MainRouter extends OptimizedPureComponent {

	render() {
		super.render();
		if (this.canCallOptimally()){
			//this.props.toggleLoading(true);
			this.props.getCourseById(this.props.match.params.courseId)
			if (this.props.authenticatedUser) {
				this.props.viewCourse(this.props.match.params.courseId);
			}
		}
		if (!this.props.courseData._id){
			return (
				<div
					style={{
						textAlign: 'center'
					}}
				>
					<img src={LoadingRingAnimated} alt="loading"/>
				</div>
			)
		} else {
			//this.props.toggleLoading(false);
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
						path={`${path}/grades`}
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
		viewCourse: (courseId) => dispatch(viewCourse(courseId)),
		toggleLoading: (loading) => dispatch(toggleLoading(loading))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainRouter)
