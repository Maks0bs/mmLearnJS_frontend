import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getExerciseById, cleanup } from "./services/actions";
import ExercisePreview from "./views/ExercisePreview/ExercisePreview";
import Attempt from "./views/Attempt";
import BigLoadingCentered from "../../../../../../../../components/reusables/BigLoadingCentered";
import { addNavItem, removeNavItem } from "../../../../../../../../services/routing/actions";
import OptimizedPureComponent from "../../../../../../../../components/performance/OptimizedPureComponent";


class ExerciseRouter extends OptimizedPureComponent {

	componentWillUnmount() {
		this.props.cleanup();
		this.props.removeNavItem('exercise link');
	}

	render() {
		super.render();
		if (this.canCallOptimally()){
			this.startLoading();
			this.props.getExerciseById(this.props.courseData._id, this.props.match.params.exerciseId)
				.then(() => {
					this.stopLoading();
				})
		}
		if (!this.props.exercise){
			return (
				<BigLoadingCentered />
			)
		}

		this.props.addNavItem({
			id: 'exercise link',
			name: 'Exercise "' + this.props.exercise.name + '"',
			path: `/classroom/course/${this.props.courseData._id}/exercise/${this.props.exercise._id}`
		})

		console.log('ex',this.props.exercise);

		if (this.props.exercise === 'not accessible'){
			return (
				<Redirect
					to={`/classroom/course/${this.props.courseData._id}`}
				/>
			)
		}
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

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.exercise.services,
		...state.views.classroom.course.main.services
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getExerciseById: (courseData, id) => dispatch(getExerciseById(courseData, id)),
		cleanup: () => dispatch(cleanup()),
		addNavItem: (item) => dispatch(addNavItem(item)),
		removeNavItem: (id) => dispatch(removeNavItem(id))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExerciseRouter)
