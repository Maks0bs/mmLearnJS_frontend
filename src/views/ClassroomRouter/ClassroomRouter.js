import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ClassroomMenu from './components/ClassroomMenu'
import Main from './views/Main'
import { getAuthenticatedUser } from '../../services/actions'
import { connect } from 'react-redux'
import ActivationMessage from '../components/ActivationMessage'
import User from './views/User'
import Dashboard from './views/Dashboard'
import CreateCourse from './views/CreateCourse'
import Course from './views/Course'
import _ from 'lodash'

class ClassroomRouter extends Component {
	constructor() {
		super();

		this.state = {
			loaded: false
		}
	}

	shouldComponentUpdate(nextProps) {
		console.log('this props', this.props, 'next props', nextProps)
		return !_.isEqual(nextProps, this.props);
	}


	render() {
		console.log('classroom router', this.props);
		this.props.getAuthenticatedUser()
		
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
						exact path={`${path}/user/:userId`}
						component={User}
					/>
					<Route
						exact path={`${path}/dashboard`}
						component={Dashboard}
					/>
					<Route
						exact path={`${path}/create-course`}
						component={CreateCourse}
					/>
					<Route
						exact path={`${path}/course/:courseId`}
						component={Course}
					/>
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.services
	}
}

export default connect(
	null,
	{ getAuthenticatedUser }
)(ClassroomRouter);
