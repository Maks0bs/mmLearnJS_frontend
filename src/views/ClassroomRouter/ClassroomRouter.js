import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ClassroomMenu from './components/ClassroomMenu'
import Main from './views/Main'
import { getAuthenticatedUser } from '../../services/actions'
import { connect } from 'react-redux'
import ActivationMessage from '../components/ActivationMessage'
import User from './views/User'
import Dashboard from './views/Dashboard'
import CourseRouter from './views/CourseRouter'
import _ from 'lodash'

class ClassroomRouter extends Component {
	constructor() {
		super();

		this.state = {
			loaded: false
		}
	}

	shouldComponentUpdate(nextProps) {
		return !_.isEqual(nextProps, this.props);
	}


	render() {
		console.log(this.props);
		this.props.getAuthenticatedUser()
		if (this.props.authenticatedUser === false){
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
						path={`${path}/course`}
						component={CourseRouter}
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

let mapDispatchToProps = (dispatch) => {
	return {
		getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClassroomRouter);
