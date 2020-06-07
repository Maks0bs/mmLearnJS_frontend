import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { enrollInCourse, clearMessages } from '../services/actions'

class CourseEnrollForm extends Component {
	constructor(){
		super();
		this.state = {
			password: '',
			reload: false
		}
	}

	componentWillUnmount() {
		this.props.clearMessages();
		console.log('cwunmount');
	}

	handleChange = (name) => (event) => {
		this.props.clearMessages();
		this.setState({
			[name]: event.target.value
		})
	}

	onSubmit = (event) => {
		event.preventDefault()
		let { password } = this.state;
		let data = {
			_id: this.props.courseData._id,
			password: password
		}

		this.props.enrollInCourse(data)
			.then(() => {
				if (!this.props.error){
					this.setState({
						password: '',
						reload: true
					})
				}
			})
		
		
	}

	render() {
		console.log('course enroll form', this.props);
		let { password, reload } = this.state;
		if (reload){
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
		
		let { enrollmentMessage: message, enrollmentError: error, courseData } = this.props
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
						style={{display: courseData.hasPassword ? "" : "none"}}
					>
						<label className="text-muted">Course password</label>
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

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.services
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		enrollInCourse: (data) => dispatch(enrollInCourse(data)),
		clearMessages: () => dispatch(clearMessages())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CourseEnrollForm));
