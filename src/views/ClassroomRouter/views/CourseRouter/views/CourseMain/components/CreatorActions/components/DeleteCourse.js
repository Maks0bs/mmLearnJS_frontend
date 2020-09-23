import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteCourse } from '../../../services/actions'
import {addToast} from "../../../../../../../../../components/ToastRoot/services/actions";
import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

/**
 * The component that allows the creator to delete their course
 * @memberOf components.views.classroom.course.CourseMain.CreatorActions
 * @component
 */
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
				this.setState({ redirectToCourseList: true})
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
		if (this.state.redirectToCourseList){
			return <Redirect to={`/classroom/courses`}/>
		}
		return (
			<div className="container my-3">
				<h1>Are you sure you want to delete this course?</h1>
				<button 
					className="btn btn-raised btn-success ml-3"
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
let mapDispatchToProps = (dispatch) => ({
	deleteCourse: (courseId) => dispatch(deleteCourse(courseId)),
	addToast: (component, options) => dispatch(addToast(component, options))
})
DeleteCourse.propTypes = {
	/**
	 * Action that should be performed if this component is in a modal
	 * and this modal gets closed
	 */
	onClose: PropTypes.func
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeleteCourse);
