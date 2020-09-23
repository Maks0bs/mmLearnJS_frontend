import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAuthenticatedUser } from "../../../../../../../services/main/actions";
import { enrollInCourse, clearMessages } from '../services/actions'
import { addToast } from "../../../../../../../components/ToastRoot/services/actions";

/**
 * This form allows new users to enroll in the course
 * @memberOf components.views.classroom.course.CourseMain
 * @component
 */
class CourseEnrollForm extends Component {
	constructor(props){
		super(props );
		this.state = { password: ''}
	}

	componentWillUnmount() {
		this.props.clearMessages();
	}

	handleChange = (name) => (event) => {
		this.props.clearMessages();
		this.setState({
			[name]: event.target.value
		})
	}

	onSubmit = (event) => {
		event.preventDefault()
		this.props.enrollInCourse(this.props.course._id, this.state.password)
			.then(() => {
				if (!this.props.error){
					this.props.addToast(
						(<div>{this.props.message || 'Enrollment successful'}</div>),
						{type: 'success'}
					)
					this.props.getAuthenticatedUser();
				}
				else{
					return this.props.addToast(
						(<div>{this.props.error}</div>),
						{type: 'error'}
					)
				}
			})
	}

	render() {
		let { password } = this.state;
		
		let { message, error, course } = this.props
		return (
			<div>
				<div 
					className="alert alert-danger"
					style={{display: error ? "" : "none"}}
				>
					{error}
				</div>
				<div 
					className="alert alert-info"
					style={{display: message ? "" : "none"}}
				>
					{message}
				</div>
				<form onSubmit={this.onSubmit}>
					<div 
						className="form-group"
						style={{
							display: course.hasPassword ? "flex" : "none",
							alignItems: 'center'
						}}
					>
						<label className="text-muted mx-2 my-0">Course password</label>
						<input 
							onChange={this.handleChange("password")}
							type="password" 
							className="form-control"
							value={password}
						/>
					</div>
					<button 
						className="btn btn-raised btn-outline"
						type="submit"
					>
						Enroll in course
					</button>
				</form>
			</div>
		);
	}
}

let mapStateToProps = (state) => ({
	course: state.views.classroom.course.services.course,
	...state.views.classroom.course.main
})
let mapDispatchToProps = (dispatch) => ({
	enrollInCourse: (id, password) => dispatch(enrollInCourse(id, password)),
	clearMessages: () => dispatch(clearMessages()),
	addToast: (component, options) => dispatch(addToast(component, options)),
	getAuthenticatedUser: () => dispatch(getAuthenticatedUser())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseEnrollForm);