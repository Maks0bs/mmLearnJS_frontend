import React, { Component } from 'react';
import { connect } from 'react-redux'
import CourseListItem from "../CourseListItem";
import CollapsibleCourseList from "../CollapsibleCourseList";

class MainList extends Component {

	render() {

		return (
			<CollapsibleCourseList
				listName={"Open courses"}
			>
				{this.props.openCourses.map((course, i) => (
					<div key={i}>
						<CourseListItem
							course={course}
						/>
					</div>
				))}
			</CollapsibleCourseList>
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