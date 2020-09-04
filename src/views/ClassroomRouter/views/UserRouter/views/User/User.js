import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sendActivation } from "../../services/actions";
import { addToast } from '../../../../../../components/ToastRoot/services/actions'
import UserBasicInfoAndActions from "./components/UserBasicInfoAndActions";
import UserClassroomContent from "./components/UserClassroomContent";

/**
 * This component displays all (allowed) data to the users.
 * If you are the owner of the displayed account, you
 * have options to perform some actions with your user data
 * @memberOf components.views.classroom.user
 * @component
 */
class User extends Component {

	onResendActivation = (e) => {
		e.preventDefault();
		this.props.sendActivation()
			.then(() => {
				if (!this.props.error){
					this.props.addToast(
						(<div>Activation link sent to email</div>),
						{type: 'info'}
					)
				} else {
					this.props.addToast(
						(<div>{this.props.error}</div>),
						{type: 'error'}
					)
				}
			})
	}

	/*
		Checks if a certain field should be displayed to the user
		Don't display the selected field if:
		1) The displayed user is not the authenticated one and
		2) The displayed user has no data on the given field or wished to hide it
	 */
	shouldDisplay = (field) => () => {
		let { authenticatedUser, user } = this.props;
		let isAuthenticated = (authenticatedUser && (authenticatedUser._id === user._id) );
		let isHidden = Array.isArray(user.hiddenFields) && user.hiddenFields.includes(field)
		return isAuthenticated || (!user[field] && !isHidden)
	}

	render() {
		let { activated, name, email, created, _id,
			about, teacherCourses, enrolledCourses, photo
		} = this.props.user;
		let { authenticatedUser } = this.props;
		let isAuthenticated = (authenticatedUser && (authenticatedUser._id === _id) );
		return (
			<div className="container my-5">
				{!activated && (
					<h1 className="alert alert-info">
						User is not yet activated.
					</h1>
				)}
				<h1><strong>Profile</strong></h1>

				<UserBasicInfoAndActions
					activated={activated}
					isAuthenticated={isAuthenticated}
					resendActivation={this.onResendActivation}
					_id={_id}
					photo={photo}
					name={this.shouldDisplay("name") ? name : null}
					created={this.shouldDisplay("created") ? created : null}
					email={this.shouldDisplay("email") ? email : null}
				/>
				<hr/>
				<UserClassroomContent
					about={this.shouldDisplay("about") ? about : null}
					teacherCourses={
						this.shouldDisplay("teacherCourses") ? teacherCourses : null
					}
					enrolledCourses={
						this.shouldDisplay("enrolledCourses") ? enrolledCourses : null
					}
				/>
			</div>
		);
	}
}

let mapStateToProps = (state) => ({
	...state.views.classroom.user,
	...state.services
})
let mapDispatchToProps = (dispatch) => ({
	sendActivation: () => dispatch(sendActivation()),
	addToast: (component, options) => dispatch(addToast(component, options))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User)