import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getOpenCourses } from '../../services/actions'
import CourseListItem from "../CourseListItem";

class MainList extends Component {

	componentDidMount(){
		this.props.getOpenCourses();
	}

	render() {
		if (!this.props.openCourses){
			return null;
		}
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

let mapDispatchToProps = (dispatch) => {
	return {
		getOpenCourses: () => dispatch(getOpenCourses())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainList);