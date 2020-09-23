import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sendTeacherInvite } from '../../../services/actions'
import { addToast } from "../../../../../../../../../components/ToastRoot/services/actions";
import PropTypes from "prop-types";

/**
 * The component that allows the creator to add more teachers to their course
 * (without creator rights)
 * @memberOf components.views.classroom.course.CourseMain.CreatorActions
 * @component
 */
class AddTeachers extends Component {
	constructor(props){
		super(props);
		this.state = { email: ''}
	}

	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.value })
	}

	onSubmit = (event) => {
		event.preventDefault()

		this.props.sendTeacherInvite(this.state.email, this.props.course._id)
			.then(() => {
				if (!this.props.error){
					this.props.addToast(
						(<div>{this.props.message || 'Teacher invitation has been sent'}</div>),
						{type: 'success'}
					)
					this.setState({email: ''})
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
			<div className="container my-3">
				<h1>Add teacher </h1>
				<form onSubmit={this.onSubmit}>
					<div
						className="form-group"
						style={{alignItems: 'center', display: 'flex'}}
					>
						<label className="text-muted my-0 mx-2">Teacher email</label>
						<input 
							onChange={this.handleChange("email")}
							type="email" 
							className="form-control"
							value={this.state.email}
						/>
					</div>
					<button
						className="btn btn-raised ml-3"
						type="button"
						onClick={this.props.onClose}
					>
						Cancel
					</button>
					<button className="btn btn-raised btn-info ml-3" type="submit">
						Add
					</button>
				</form>
			</div>
		);
	}
}
let mapStateToProps = (state) => ({
	...state.views.classroom.course.services,
	...state.views.classroom.course.main
})
let mapDispatchToProps = (dispatch) => ({
	sendTeacherInvite: (email, courseId) =>
		dispatch(sendTeacherInvite(email, courseId)),
	addToast: (component, options) => dispatch(addToast(component, options))
})
AddTeachers.propTypes = {
	/**
	 * Action that should be performed if this component is in a modal
	 * and this modal gets closed
	 */
	onClose: PropTypes.func
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddTeachers);