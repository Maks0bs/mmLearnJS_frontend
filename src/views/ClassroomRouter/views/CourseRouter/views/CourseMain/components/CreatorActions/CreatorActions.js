import React, { Component } from 'react';
import { hideModal, showModal } from '../../../../../../../../components/ModalRoot/services/actions'
import { connect } from 'react-redux'
import DeleteCourse from './components/DeleteCourse'
import AddTeachers from './components/AddTeachers'
import {deleteCourse, sendTeacherInvite} from "../../services/actions";
import {addToast} from "../../../../../../../../components/ToastRoot/services/actions";

/**
 * Some actions that are only displayed to the creator of the course
 * @memberOf components.views.classroom.course.CourseMain
 * @component
 */
class CreatorActions extends Component {

	onShowDeleteModal = (e) => {
		e.preventDefault();
		this.props.showModal(
			<DeleteCourse onClose={this.props.hideModal} />
		)
	}

	showAddTeachersModal = (e) => {
		e.preventDefault();
		this.props.showModal(
			<AddTeachers onClose={this.props.hideModal}/>
		)
	}

	render() {
		return (
			<div
				className="container my-3"
				style={{display: 'flex', alignItems: 'center', flexFlow: 'row wrap'}}
			>
				<h1 className="mx-2">Creator actions:</h1>
				<button 
					className="btn btn-raised btn-outline btn-info m-2"
					type="button"
					onClick={this.showAddTeachersModal}
				>
					Add teachers
				</button>
				<button 
					className="btn btn-raised btn-outline btn-danger m-2"
					type="button"
					onClick={this.onShowDeleteModal}
				>
					Delete course
				</button>
			</div>
		);
	}
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.services,
	...state.views.classroom.course.main
})
let mapDispatchToProps = (dispatch) => ({
	hideModal: () => dispatch(hideModal()),
	showModal: (component) => dispatch(showModal(component)),
	sendTeacherInvite: (email, courseId) => dispatch(sendTeacherInvite(email, courseId)),
	addToast: (component, options) => dispatch(addToast(component, options)),
	deleteCourse: (courseId) => dispatch(deleteCourse(courseId))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreatorActions);