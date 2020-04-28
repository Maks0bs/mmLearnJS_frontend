import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Info from './views/Info'
import Forum from './views/Forum'
import { connect } from 'react-redux'
import { getCourseById } from './services/actions'
import _ from 'lodash'


class MainRouter extends Component {

	state = {
		upd: false
	}

	shouldComponentUpdate(nextProps) {
		return !_.isEqual(nextProps, this.props);
	}


	render() {
		this.props.getCourseById(this.props.match.params.courseId)
		let { path } = this.props.match;
		console.log('mainr props', this.props);
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
		...state.views.classroom.course.main.services
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
