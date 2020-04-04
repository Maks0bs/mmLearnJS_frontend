import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCourseById } from './services/actions'

class Course extends Component {

	componentDidMount(){
		this.props.getCourseById(this.props.match.params.courseId);
	}

	render() {
		return (
			//add password form
			<div className={this.props.className}>
				{JSON.stringify(this.props.courseData)}
				<button
					className="btn btn-outline my-sm-0"
				>
					Enroll in this course
				</button>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getCourseById: (courseId) => dispatch(getCourseById(courseId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Course);