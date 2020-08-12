import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getExerciseById } from "./services/actions";
import OptimizedComponent from "../../../../../../../../components/OptimizedComponent";
import ExercisePreview from "./views/ExercisePreview/ExercisePreview";
import Attempt from "./views/Attempt";
import LoadingRingAnimated from "../../../../../../../../res/images/LoadingRingAnimated200px.svg";
import BigLoadingCentered from "../../../../../../../../components/BigLoadingCentered";


class ExerciseRouter extends OptimizedComponent {
	render() {
		super.render();
		if (this.canCallOptimally()){
			this.props.getExerciseById(this.props.courseData._id, this.props.match.params.exerciseId);
		}
		if (!this.props.exercise || !this.props.exercise._id){
			return (
				<BigLoadingCentered />
			)
		}
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
		getExerciseById: (courseData, id) => dispatch(getExerciseById(courseData, id))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExerciseRouter)
