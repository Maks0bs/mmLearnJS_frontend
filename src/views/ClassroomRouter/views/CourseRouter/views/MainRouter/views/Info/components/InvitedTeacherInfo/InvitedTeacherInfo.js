import React, { Component } from 'react';
import { connect } from 'react-redux'
import { acceptTeacherInvite } from '../../services/actions'

class InvitedTeacherInfo extends Component {
	constructor() {
		super();

		this.state = {
			redirectToCourse: false
		}
	}

	acceptInvitation = (e) => {
		e.preventDefault();
		this.props.acceptTeacherInvite(this.props.courseData._id)
		.then(() => {
			if (!this.props.error){
				this.setState({
					redirectToCourse: true
				})
			}
		})
	}

	render() {
		return (
			<div>
				<h5>You are invited to be a teacher</h5>
				<button 
					className="btn btn-raised btn-outline btn-success ml-3"
					type="button"
					onClick={this.acceptInvitation}
				>
					Accept invitation
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
		acceptTeacherInvite: (courseId) => dispatch(acceptTeacherInvite(courseId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
(InvitedTeacherInfo);