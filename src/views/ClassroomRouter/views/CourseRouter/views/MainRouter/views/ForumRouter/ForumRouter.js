import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Topic from './views/Topic'
import Forum from './views/Forum'
import { connect } from 'react-redux'
import { getForumFromCourse } from './services/actions'
import OptimizedComponent from "../../../../../../../../components/OptimizedComponent";


class ForumRouter extends OptimizedComponent {
	render() {
		super.render();
		if (this.canCallOptimally()){
			console.log('check this out', this.props.forumData);
			this.props.getForumFromCourse(this.props.courseData, this.props.match.params.forumId);
		}
		if (!this.props.forumData){
			return null;
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
		getForumFromCourse: (courseId, forumId) => dispatch(getForumFromCourse(courseId, forumId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForumRouter)
