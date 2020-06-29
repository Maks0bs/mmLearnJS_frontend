import React, { Component } from 'react';
import { connect } from 'react-redux'
import CourseListItem from "../CourseListItem";

class MainList extends Component {

	render() {

		return (
			<div className={this.props.className}>
				<h1>Open courses:</h1>
				{this.props.openCourses.map((course, i) => (
					<div key={i}>
						<CourseListItem
							course={course}
						/>
					</div>
				))}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.courseList
	}
}

export default connect(
	mapStateToProps,
	null
)(MainList);