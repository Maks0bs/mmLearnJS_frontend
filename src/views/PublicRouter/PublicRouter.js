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



class PublicRouter extends Component {

	render() {
		this.props.getAuthenticatedUser();
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

export default connect(
	null,
	mapDispatchToProps
)(PublicRouter);
