import React, {Component, PureComponent} from 'react';
import { Switch, Route } from 'react-router-dom'
import Info from './views/Info'
import ForumRouter from './views/ForumRouter'
import { connect } from 'react-redux'
import { addNavItem, removeNavItem } from "../../../../../../services/routing/actions";
import {getCourseById, viewCourse, cleanup} from './services/actions'
import OptimizedPureComponent from "../../../../../../components/performance/OptimizedPureComponent";
import GradesRouter from "./views/GradesRouter/GradesRouter";
import ExerciseRouter from "./views/ExerciseRouter/ExerciseRouter";
import BigLoadingCentered from "../../../../../../components/reusables/BigLoadingCentered";


class MainRouter extends OptimizedPureComponent {


	componentWillUnmount() {
		this.props.cleanup();
		this.props.removeNavItem('course link')
	}

	com

	render() {

		super.render();
		if (this.canCallOptimally()){
			this.startLoading();
			this.props.getCourseById(this.props.match.params.courseId)
				.then(() => {
					this.stopLoading()
				})
			if (this.props.authenticatedUser) {
				this.props.viewCourse(this.props.match.params.courseId);
			}
		}
		if (!this.props.courseData._id) {
			return (
				<BigLoadingCentered />
			)
		}

		console.log('add nav', this.props.addNavItem({
			id: 'course link',
			name: 'Course "' + this.props.courseData.name + '"',
			path: `/classroom/course/${this.props.courseData._id}`
		}))


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
		viewCourse: (courseId) => dispatch(viewCourse(courseId)),
		cleanup: () => dispatch(cleanup()),
		addNavItem: (item) => dispatch(addNavItem(item)),
		removeNavItem: (id) => dispatch(removeNavItem(id))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainRouter)
