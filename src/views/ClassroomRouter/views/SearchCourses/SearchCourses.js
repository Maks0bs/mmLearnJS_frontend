import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
	searchCourses
} from "./services/actions";
import { addToast } from "../../../../components/ToastRoot/services/actions";
import OptimizedComponent from "../../../../components/OptimizedComponent";
import {isEqual} from "lodash";
import CourseSearchItem from "./components/CourseSearchItem";


class SearchCourses extends OptimizedComponent {
	render() {
		super.render();
		if (this.canCallOptimally()){
			this.props.searchCourses(this.props.match.params.searchQuery)
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
					{this.props.courses.map((course, i) => (
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
		searchCourses: (key) => dispatch(searchCourses(key))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchCourses)