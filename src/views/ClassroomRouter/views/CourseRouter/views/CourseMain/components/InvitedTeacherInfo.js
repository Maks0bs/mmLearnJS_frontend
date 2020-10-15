import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAuthenticatedUser } from "../../../../../../../services/main/actions";
import { getCourseById } from "../../../services/actions";
import { acceptTeacherInvite } from '../services/actions'
import { addToast } from "../../../../../../../components/ToastRoot/services/actions";

/**
 * Information which is shown only to teachers
 * who are invited to the given course. They can accept their invitation
 * @memberOf components.views.classroom.course.CourseMain
 * @component
 */
class InvitedTeacherInfo extends Component {

	acceptInvitation = (e) => {
		e.preventDefault();
		this.props.acceptTeacherInvite(this.props.course._id)
			.then(() =>
				this.props.getCourseById(this.props.course._id, this.props.authenticatedUser)
			)
			.then(() => this.props.getAuthenticatedUser())
			.then(() => {
				if (!this.props.error){
					this.props.addToast(
						(<div>You are a teacher in the course</div>),
						{type: 'success'}
					)
				} else {
					this.props.addToast(
						(<div>{this.props.error}</div>),
						{type: 'error'}
					)
				}
			})
	}

	render() {
		return (
			<div className="text-center">
				<div className="alert alert-info"
					style={{
						borderRadius: '5px',
						padding: '7px',
						display: 'inline-block',
						alignItems: 'center'
					}}
				>
					<h5>You are invited to be a teacher at this course</h5>
					<button
						className="btn btn-raised btn-success"
						type="button"
						onClick={this.acceptInvitation}
					>
						Accept invitation
					</button>
				</div>
			</div>
		);
	}
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.services,
	...state.services
})
let mapDispatchToProps = (dispatch) => ({
	acceptTeacherInvite: (courseId) => dispatch(acceptTeacherInvite(courseId)),
	addToast: (component, options) => dispatch(addToast(component, options)),
	getAuthenticatedUser: () => dispatch(getAuthenticatedUser()),
	getCourseById: (id, user) => dispatch(getCourseById(id, user))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InvitedTeacherInfo);