import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Topic from './views/Topic'
import Forum from './views/Forum'
import { connect } from 'react-redux'
import { getForumFromCourse, cleanup } from './services/actions'
import { addNavItem, removeNavItem} from "../../../../../../services/routing/actions";
import OptimizedComponent from "../../../../../../components/performance/OptimizedComponent";
import BigLoadingCentered from "../../../../../../components/reusables/BigLoadingCentered";


class ForumRouter extends OptimizedComponent {


	componentWillUnmount() {
		this.props.removeNavItem('forum link')
		this.props.cleanup();
	}

	render() {
		super.render();
		this.props.getForumFromCourse(this.props.courseData, this.props.match.params.forumId);
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
		this.props.addNavItem({
			id: 'forum link',
			name: 'Forum "' + this.props.forumData.name + '"',
			path: `/classroom/course/${this.props.courseData._id}/forum/${this.props.forumData._id}`
		})
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
		getForumFromCourse: (courseData, forumId) => dispatch(getForumFromCourse(courseData, forumId)),
		addNavItem: (item) => dispatch(addNavItem(item)),
		removeNavItem: (id) => dispatch(removeNavItem(id)),
		cleanup: () => dispatch(cleanup())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForumRouter)
