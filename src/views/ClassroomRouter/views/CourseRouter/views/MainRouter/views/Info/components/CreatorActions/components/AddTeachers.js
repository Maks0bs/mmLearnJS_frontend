import React, { Component } from 'react';
import { connect } from 'react-redux'
import { sendTeacherInvite } from '../../../services/actions'

class AddTeachers extends Component {
	constructor(){
		super();

		this.state = {
			email: ''
		}
	}

	handleChange = (name) => (event) => {
		console.log(event);
		this.setState({
			[name]: event.target.value
		})
	}

	onSubmit = (event) => {
		event.preventDefault()
		let { email } = this.state;

		this.props.sendTeacherInvite(email, this.props.courseData._id)
			.then(() => {
				if (!this.props.error){
					this.props.onClose();
				}
				else{
					console.log(this.props.error);
				}
			})
		
		
	}

	render() {
		let { email } = this.state;
		return (
			<div className="container">
				<h1>Add teacher </h1>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label className="text-muted">Teacher email</label>
						<input 
							onChange={this.handleChange("email")/*can be changed to this.handleChane.bind(this, "name")*/} 
							type="email" 
							className="form-control"
							value={email}
						/>
					</div>

					<button 
						className="btn btn-raised btn-outline ml-3"
						type="button"
						onClick={this.props.onClose}
					>
						Cancel
					</button>
					<button 
						className="btn btn-raised btn-outline btn-info ml-3"
						type="submit"
					>
						Add teacher
					</button>
			</form>
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
		sendTeacherInvite: (email, courseId) => dispatch(
			sendTeacherInvite(email, courseId)
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
(AddTeachers);