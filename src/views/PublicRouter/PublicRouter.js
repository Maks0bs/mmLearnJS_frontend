import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import PublicMenu from './components/PublicMenu'
import Home from './views/Home'
import Signup from './views/Signup'
import ActivateAccount from './views/ActivateAccount'
import Signin from './views/Signin'
import { connect } from 'react-redux'
import { getAuthenticatedUser } from '../../services/actions'
import ActivationMessage from '../components/ActivationMessage'
import InviteSignup from './views/InviteSignup'
import _ from 'lodash'



class PublicRouter extends Component {
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
		if (this.upd % 2 === 1){
			this.props.getAuthenticatedUser()
		}
		if (this.props.authenticatedUser === false){
			return null;
		}

		let { path } = this.props.match;
		return (
			// notice that you can horizontally scroll the page
			// this is most likely the problem with the main container
			// for menu and switch (the following div)
			<div>
				<ActivationMessage />
				<PublicMenu/>
				<Switch>
					<Route
						exact path={`${path}`}
						component={Home}
					/>
					<Route
						exact path={`/signup`}
						component={Signup}
					/>
					<Route
						exact path={`/activate-account/:activationToken`}
						component={ActivateAccount}
					/>
					<Route
						exact path={`/signin`}
						component={Signin}
					/>
					<Route 
						exact path={`/invite-signup/:token`}
						component={InviteSignup}
					/>
				</Switch>
			</div>
		);
	}
}

let mapDispatchToProps = dispatch => {
	return {
		getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
	}
}

let mapStateToProps = (state) => {
	return {
		...state.services
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PublicRouter);
