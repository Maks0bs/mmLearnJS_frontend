import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ClassroomMenu from './components/ClassroomMenu'

class ClassroomRouter extends Component {
	render() {
		let { path } = this.props.match;
		return (
			<div>
				<ClassroomMenu />
				<Switch>
				</Switch>
			</div>
		);
	}
}

export default ClassroomRouter;
