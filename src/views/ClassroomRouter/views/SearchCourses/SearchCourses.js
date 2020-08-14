import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	searchCourses,
	cleanup
} from "./services/actions";
import { addToast } from "../../../../components/ToastRoot/services/actions";
import OptimizedComponent from "../../../../components/performance/OptimizedComponent";
import {isEqual} from "lodash";
import CourseSearchItem from "./components/CourseSearchItem";
import BigLoadingCentered from "../../../../components/reusables/BigLoadingCentered";


class SearchCourses extends OptimizedComponent {

	componentWillUnmount() {
		this.props.cleanup();
	}


	render() {
		super.render();
		if (this.canCallOptimally() && !this.loading){
			//this.props.cleanup();
			this.props.searchCourses(this.props.match.params.searchQuery)
			this.loading = true;
		}

		if (this.props.courses){
			this.loading = false;
		}

		if (this.loading){
			return (
				<BigLoadingCentered />
			)
		}

		return (
			<div className="container mt-3">
				<ul
					style={{
						listStyleType: 'square'
					}}
				>
					{(!this.props.courses || (this.props.courses.length === 0) ) && (
						<h1>
							Nothing was found for given query
						</h1>
					)}
					{this.props.courses && this.props.courses.map((course, i) => (
						<li>
							<CourseSearchItem
								course={course}
							/>
						</li>
					))}
				</ul>
			</div>
		)

	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.searchCourses,
		authenticatedUser: state.services.authenticatedUser
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		addToast: (component, options) => dispatch(addToast(component, options)),
		searchCourses: (key) => dispatch(searchCourses(key)),
		cleanup: () => dispatch(cleanup())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchCourses)