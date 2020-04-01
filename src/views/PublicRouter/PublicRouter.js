import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import PublicMenu from './components/PublicMenu'
import Home from './views/Home'
import Signup from './views/Signup'
import ActivateAccount from './views/ActivateAccount'
import Signin from './views/Signin'
import { connect } from 'react-redux'



class PublicRouter extends Component {

	render() {
		let { path } = this.props.match;
		return (
			// notice that you can horizontally scroll the page
			// this is most likely the problem with the main container
			// for menu and switch (the following div)
			<div>
				<PublicMenu />
				{JSON.stringify(this.props.authenticatedUser)}
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

export default connect(
	null,
)(PublicRouter);
