import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ClassroomMenu from './components/ClassroomMenu'
import Main from './views/Main'
import { getAuthenticatedUser } from '../../services/actions'
import { connect } from 'react-redux'
import ActivationMessage from '../components/ActivationMessage'
import UserRouter from './views/UserRouter'
import CourseList from './views/CourseList'
import Dashboard from "./views/Dashboard";
import CourseRouter from './views/CourseRouter'
import _ from 'lodash'

class ClassroomRouter extends Component {
	constructor() {
		super();

		this.upd = 0;
		this.state = {
			mounted: false
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!_.isEqual(nextProps, this.props)){
			this.upd++;
			return true;
		}
		return (!_.isEqual(nextState, this.state) || !_.isEqual(nextProps, this.props))
	}

	componentDidMount() {
		this.setState({
			mounted: true
		})
	}


	render() {
		if (!this.state.mounted){
			return null;
		}

		this.upd++;
		if (this.upd === 1){
			this.props.getAuthenticatedUser()
		}
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
						exact path={`${path}/courses`}
						component={CourseList}
					/>
					<Route
						exact path={`${path}/dashboard`}
						component={Dashboard}
					/>
					<Route
						path={`${path}/course`}
						component={CourseRouter}
					/>
					<Route
						path={`${path}/user/:userId`}
						component={UserRouter}
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
