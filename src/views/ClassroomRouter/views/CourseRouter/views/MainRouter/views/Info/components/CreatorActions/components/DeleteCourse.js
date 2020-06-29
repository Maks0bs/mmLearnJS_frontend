import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteCourse } from '../../../services/actions'

class DeleteCourse extends Component {

	deleteCourse = (e) => {
		e.preventDefault();
		this.props.deleteCourse(this.props.courseData._id)
		.then(() => {
			this.props.onClose();
		})
	}

	render() {
		return (
			<div>
				<h1>Are you sure about that?</h1>
				<button 
					className="btn btn-raised btn-outline ml-3"
					type="button"
					onClick={this.props.onClose}
				>
					Cancel
				</button>

				<button 
					className="btn btn-raised btn-outline btn-danger ml-3"
					type="button"
					onClick={this.deleteCourse}
				>
					Delete
				</button>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.services
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		deleteCourse: (courseId) => dispatch(deleteCourse(courseId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
(DeleteCourse);
