import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getExerciseFromCourse } from "./services/actions";
import OptimizedComponent from "../../../../../../../../components/OptimizedComponent";
import ExercisePreview from "./views/ExercisePreview/ExercisePreview";


class ExerciseRouter extends OptimizedComponent {
	render() {
		super.render();
		if (this.canCallOptimally()){
			this.props.getExerciseFromCourse(this.props.courseData, this.props.match.params.exerciseId);
		}
		if (!this.props.exercise){
			return null;
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
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.exercise,
		...state.views.classroom.course.main.services
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getExerciseFromCourse: (courseData, id) => dispatch(getExerciseFromCourse(courseData, id))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExerciseRouter)
