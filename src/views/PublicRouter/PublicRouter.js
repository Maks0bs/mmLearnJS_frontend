import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import PublicMenu from './components/PublicMenu'
import Home from './views/Home'
import Signup from './views/Signup'
import ActivateAccount from './views/ActivateAccount'
import Signin from './views/Signin'
import { extendSession } from '../../services/actions'
import { connect } from 'react-redux'


class PublicRouter extends Component {

	static getDerivedStateFromProps(nextProps, prevState){
		console.log('nextprops', nextProps);
		console.log('prevstate', prevState)
	}

	render() {
		//this.props.extendSession();//might have to make synchronous
		let { path } = this.props.match;
		return (
			// notice that you can horizontally scroll the page
			// this is most likely the problem with the main container
			// for menu and switch (the following div)
			<div>
				<PublicMenu />
				{/*JSON.stringify(this.props.user)*/}
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

let mapStateToProps = (state) => {
	return {
		...state.services
	}
}

export default connect(
	mapStateToProps,
	{ extendSession }
)(PublicRouter);
