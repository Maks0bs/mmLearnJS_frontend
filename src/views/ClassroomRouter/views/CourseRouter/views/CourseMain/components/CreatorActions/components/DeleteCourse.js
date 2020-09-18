import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteCourse } from '../../../services/actions'
import {addToast} from "../../../../../../../../../components/ToastRoot/services/actions";

class DeleteCourse extends Component {
	constructor(props) {
		super(props);

		this.state = { redirectToCourseList: false }
	}

	deleteCourse = (e) => {
		e.preventDefault();
		this.props.deleteCourse(this.props.course._id)
		.then(() => {
			if (!this.props.error){
				this.props.addToast(
					(<div>Course deleted successfully</div>),
					{type: 'info'}
				)
				this.props.onClose();
			}
			else{
				this.props.addToast(
					(<div>{this.props.error}</div>),
					{type: 'error'}
				)
			}
		})
	}

	render() {
		return (
			<div>
				<h1>Are you sure you want to delete this course?</h1>
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

let mapStateToProps = (state) => ({
		...state.views.classroom.course.services
})

let mapDispatchToProps = (dispatch) => {
	return {
		deleteCourse: (courseId) => dispatch(deleteCourse(courseId)),
		addToast: (component, options) => dispatch(addToast(component, options))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
(DeleteCourse);
