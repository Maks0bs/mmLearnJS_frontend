import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { acceptTeacherInvite } from '../../services/actions'
import { addToast } from "../../../../../../../../../../components/ToastRoot/services/actions";

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
				this.props.addToast(
					(
						<div>
							You are a teacher in the course
						</div>
					),
					{
						type: 'success'
					}
				)
				this.setState({
					redirectToCourse: true
				})
			} else {
				this.props.addToast(
					(
						<div>
							{this.props.error}
						</div>
					),
					{
						type: 'error'
					}
				)
			}
		})
	}

	render() {

		if (this.state.redirectToCourse){
			return (
                <Redirect 
                    to={{
                        pathname: '/reload',
                        state: {
                            page: this.props.location.pathname
                        }
                    }}
                />
            )
		}

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
		acceptTeacherInvite: (courseId) => dispatch(acceptTeacherInvite(courseId)),
		addToast: (component, options) => dispatch(addToast(component, options))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
(withRouter(InvitedTeacherInfo));