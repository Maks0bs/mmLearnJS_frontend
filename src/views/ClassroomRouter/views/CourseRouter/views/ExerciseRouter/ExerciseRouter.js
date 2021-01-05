import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { cleanup } from "./services/actions";
import ExercisePreview from "./views/ExercisePreview/ExercisePreview";
import Attempt from "./views/Attempt";
import BigLoadingCentered from "../../../../../../components/reusables/BigLoadingCentered";
import { addNavItem, removeNavItem } from "../../../../../../services/routing/actions";

/**
 * @namespace components.views.classroom.course.exercise
 */

/**
 * This router is responsible for all pages
 * that contain data about an exercise in the course
 * @memberOf components.views.classroom.course.exercise
 * @component
 */
class ExerciseRouter extends Component {

	componentWillUnmount() {
		this.props.cleanup();
		this.props.removeNavItem('exercise link');
	}

	render() {
		let { course, exercise } = this.props;
		if (!exercise || !exercise._id){
			return ( <BigLoadingCentered />)
		}

		this.props.addNavItem({
			id: 'exercise link',
			name: 'Exercise "' + exercise.name + '"',
			path: `/classroom/course/${course._id}/exercise/${exercise._id}`
		})
		let { path } = this.props.match;
		return (
			<div>
				<Switch>
					<Route
						exact path={`${path}`}
						component={ExercisePreview}
					/>
				</Switch>
				<Switch>
					<Route
						exact path={`${path}/attempt/:attemptId`}
						component={Attempt}
					/>
				</Switch>
			</div>
		);
	}
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.exercise.services,
	...state.views.classroom.course.services
})
let mapDispatchToProps = (dispatch) => ({
	cleanup: () => dispatch(cleanup()),
	addNavItem: (item) => dispatch(addNavItem(item)),
	removeNavItem: (id) => dispatch(removeNavItem(id))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ExerciseRouter))