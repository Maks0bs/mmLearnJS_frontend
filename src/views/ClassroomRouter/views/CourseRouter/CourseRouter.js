import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import MainRouter from './views/MainRouter'
import EditContent from './views/EditContent'
import EditInfo from './views/EditInfo'
import EditExercises from "./views/EditExercises";
import {connect} from "react-redux";
import { getCourseById } from "./services/actions";
import { removeNavItem, addNavItem } from "../../../../services/routing/actions";

/**
 * @namespace components.views.classroom.course
 */

/**
 * This router is responsible for all pages
 * that contain detailed data of one single course
 * @memberOf components.views.classroom.course
 * @component
 */
class CourseRouter extends Component {

	componentWillUnmount() {
		this.props.removeNavItem('course link');
	}

	render() {
		let { path } = this.props.match;
		let { pathname } = this.props.location

		return (
			<div>
				<Switch>
					<Route
						exact path={`${path}/edit/:courseId`}
						render={() => {
							// extraction of id is only done in Route.render
							// it is more efficient than doing on each router render
							let courseId = pathname.split('/').pop();
							this.props.getCourseById(courseId);

							return (<EditContent />)
						}}
					/>

					<Route
						exact path={`${path}/edit-info/:courseId`}
						render={() => {
							let courseId = pathname.split('/').pop();
							this.props.getCourseById(courseId);

							return (<EditInfo />)
						}}
					/>

					<Route
						exact path={`${path}/edit-exercises/:courseId`}
						render={() => {
							let courseId = pathname.split('/').pop();
							this.props.getCourseById(courseId);

							return (<EditExercises />)
						}}
					/>

					<Route
						path={`${path}/:courseId`}
						render={() => {
							// might be more efficient (or not):
							// [...pathname.matchAll(/\/[A-Za-z0-9-]+/g)]
							let courseId = pathname.split('/')[3];
							this.props.getCourseById(courseId);
							return (<MainRouter />)
						}}
					/>
					
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => ({
	...state.services
})
let mapDispatchToProps = (dispatch) => ({
	getCourseById: (id) => dispatch(getCourseById(id)),
	removeNavItem: (id) => dispatch(removeNavItem(id)),
	addNavItem: (item) => dispatch(addNavItem(item))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseRouter);
