import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import PublicMenu from './components/PublicMenu'
import Home from './views/Home'


class PublicRouter extends Component {
	render() {
		let { path } = this.props.match;
		return (
			// notice that you can horizontally scroll the page
			// this is most likely the problem with the main container
			// for menu and switch (the following div)
			<div>
				<PublicMenu />
				<Switch>
					<Route
						exact path={`${path}`}
						component={Home}
					/>
				</Switch>
			</div>
		);
	}
}

export default PublicRouter;
