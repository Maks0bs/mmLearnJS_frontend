import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Info from './views/Info'
import ForumRouter from './views/ForumRouter'
import { connect } from 'react-redux'
import {getCourseById, viewCourse} from './services/actions'
import OptimizedComponent from "../../../../../../components/OptimizedComponent";


class MainRouter extends OptimizedComponent {

	render() {
		super.render();
		if (this.canCallOptimally()){
			this.props.getCourseById(this.props.match.params.courseId)
			if (this.props.authenticatedUser) {
				this.props.viewCourse(this.props.match.params.courseId);
			}
		}
		if (!this.props.courseData._id){
			return null;
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
					
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.services,
		...state.services
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
