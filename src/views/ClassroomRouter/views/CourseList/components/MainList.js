import React, { Component } from 'react';
import { connect } from 'react-redux'
import CourseListItem from "./CourseListItem";
import CollapsibleCourseList from "./CollapsibleCourseList";

/**
 * The list of open courses, wrapped in a
 * {@link components.views.classroom.CourseList.CollapsibleCourseList}
 * @memberOf components.views.classroom.CourseList
 * @component
 */
class MainList extends Component {

	render() {
		let { openCourses: courses } = this.props;
		return (
			<CollapsibleCourseList
				listHeading={"Open courses"}
				loading={this.props.loading.open}
			>
				{courses ? courses.map((course, i) => (
					<div key={i}>
						<CourseListItem course={course}/>
					</div>
				)) : []}
			</CollapsibleCourseList>
		);
	}
}

let mapStateToProps = (state) => ({
	...state.views.classroom.courseList
})
export default connect(
	mapStateToProps
)(MainList);