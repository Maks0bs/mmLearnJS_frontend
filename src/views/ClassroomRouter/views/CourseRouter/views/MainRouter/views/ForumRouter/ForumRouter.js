import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Topic from './views/Topic'
import Forum from './views/Forum'
import { connect } from 'react-redux'
import { getForumFromCourse } from './services/actions'
import OptimizedComponent from "../../../../../../../../components/OptimizedComponent";
import BigLoadingCentered from "../../../../../../../../components/BigLoadingCentered";


class ForumRouter extends OptimizedComponent {
	render() {
		super.render();
		if (this.canCallOptimally()){
			this.props.getForumFromCourse(this.props.courseData, this.props.match.params.forumId);
		}
		if (!this.props.forumData){
			return <BigLoadingCentered />
		}
		if (this.props.forumData === 'not accessible'){
			return (
				<Redirect
					to={`/classroom/course/${this.props.courseData._id}`}
				/>
			)
		}
		let { path } = this.props.match;
		return (
			<div>
				<Switch>
					<Route
						exact path={`${path}`}
						component={Forum}
					/>
					
					<Route
						exact path={`${path}/topic/:topicId`}
						component={Topic}
					/>
					
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.forum,
		...state.views.classroom.course.main.services
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getForumFromCourse: (courseData, forumId) => dispatch(getForumFromCourse(courseData, forumId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForumRouter)
