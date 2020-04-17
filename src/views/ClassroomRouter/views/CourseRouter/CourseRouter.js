import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Main from './views/Main'
import EditContent from './views/EditContent'
import CreateCourse from './views/CreateCourse'


class CourseRouter extends Component {

	render() {
		let { path } = this.props.match;
		return (
			<div>
				<Switch>
					<Route
						exact path={`${path}/create`}
						component={CreateCourse}
					/>
					
					<Route
						exact path={`${path}/edit/:courseId`}
						component={EditContent}
					/>

					<Route
						exact path={`${path}/:courseId`}
						component={Main}
					/>
					
				</Switch>
			</div>
		);
	}
}

export default CourseRouter
