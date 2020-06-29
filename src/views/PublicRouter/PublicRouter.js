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
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import ResetPassword from "./views/ResetPassword/ResetPassword";
import OptimizedComponent from "../../components/OptimizedComponent";



class PublicRouter extends OptimizedComponent {

	render() {
		super.render();
		if (this.canCallOptimally()){
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
					<Route
						exact path={`/forgot-password`}
						component={ForgotPassword}
					/>
					<Route
						exact path={`/reset-password/:token`}
						component={ResetPassword}
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
