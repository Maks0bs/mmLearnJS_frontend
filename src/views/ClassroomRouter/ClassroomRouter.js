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
	constructor(){
		super()

		this.state = {
			updated: false
		}
	}

	render() {
		if (!this.state.updated) {
			this.props.getAuthenticatedUser()
			.then(() => {
				this.setState({
					updated: true
				})
			})

			return null;
		}
		
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

export default connect(
	null,
	{ getAuthenticatedUser }
)(ClassroomRouter);
