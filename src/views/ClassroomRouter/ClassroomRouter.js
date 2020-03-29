import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ClassroomMenu from './components/ClassroomMenu'
import Main from './views/Main'

class ClassroomRouter extends Component {
	render() {
		let { path } = this.props.match;
		return (
			<div>
				<ClassroomMenu />
				<Switch>
					<Route
						exact path={`${path}`}
						component={Main}
					/>
				</Switch>
			</div>
		);
	}
}

export default ClassroomRouter;
