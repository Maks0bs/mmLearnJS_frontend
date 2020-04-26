import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import MainRouter from './views/MainRouter'
import EditContent from './views/EditContent'
import CreateCourse from './views/CreateCourse'
import EditInfo from './views/EditInfo'


class CourseRouter extends Component {

	render() {
		let { path } = this.props.match;
		console.log('course router', this.props);
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
						exact path={`${path}/edit-info/:courseId`}
						component={EditInfo}
					/>

					<Route
						path={`${path}/:courseId`}
						component={MainRouter}
					/>
					
				</Switch>
			</div>
		);
	}
}

export default CourseRouter
