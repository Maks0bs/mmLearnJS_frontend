import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Info from './views/Info'
import Forum from './views/Forum'
import { connect } from 'react-redux'
import { getCourseById } from './services/actions'


class MainRouter extends Component {

	render() {
		this.props.getCourseById(this.props.match.params.courseId);
		let { path } = this.props.match;
		console.log('mainr', path);
		return (
			<div>
				<Switch>
					<Route
						exact path={`${path}/`}
						component={Info}
					/>
					
					<Route
						exact path={`${path}/forum/:forumId`}
						component={Forum}
					/>
					
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.services
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getCourseById: (courseId) => dispatch(getCourseById(courseId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainRouter)
