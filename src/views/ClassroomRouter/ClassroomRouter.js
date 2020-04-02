import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ClassroomMenu from './components/ClassroomMenu'
import Main from './views/Main'
import { getAuthenticatedUser } from '../../services/actions'
import { connect } from 'react-redux'
import ActivationMessage from '../components/ActivationMessage'
import User from './views/User'

class ClassroomRouter extends Component {
	render() {
		//maybe move getting auth user in shouldCOmponentUpdate
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
				</Switch>
			</div>
		);
	}
}

export default connect(
	null,
	{ getAuthenticatedUser }
)(ClassroomRouter);
