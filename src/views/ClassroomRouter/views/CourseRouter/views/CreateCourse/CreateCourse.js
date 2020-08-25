import React, { Component } from 'react';
import { createCourse, clearMessages } from './services/actions'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class CreateCourse extends Component {
	constructor(props){
		super(props);

		this.state = {
			name: '',
			about: '',
			type: 'open',
			hasPassword: false,
			password: '',
			redirectToCourse: false
		}
	}

	componentWillUnmount() {
		this.props.clearMessages();
	}

	handleHasPassword = () => {

		this.setState({
			hasPassword: !this.state.hasPassword,
			password: ''
		})
	}

	handleChange = (name) => (event) => {
		this.props.clearMessages();
		this.setState({
			[name]: event.target.value
		})
	}


	onSubmit = (event) => {
		event.preventDefault()
		let {name, about, type, password, hasPassword} = this.state;
		let data ={
			name,
			about,
			type,
			password,
			hasPassword
		}

		this.props.createCourse(data)
			.then((data) => {
				if (!this.props.error){
					this.setState({
						name: '',
						about: '',
						type: '',
						password: '',
						hasPassword: false,
						redirectToCourse: true
					})
				}
			})
		
		
	}

	renderSignupForm(name, about, hasPassword, password, type){
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<label className="text-muted">Name</label>
					<input 
						onChange={this.handleChange("name")/*can be changed to this.handleChane.bind(this, "name")*/} 
						type="text" 
						className="form-control"
						value={name}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Info about course</label>
					<input
						onChange={this.handleChange("about")}
						type="textarea"
						className="form-control"
						value={about}
					/>
				</div>
				<div className="form-group">
					<label
						className="text-muted"
						htmlFor="course_add_password"
					>
						Add a password to the course?
					</label>
					<input
						id="course_add_password"
						type="checkbox"
						onChange={this.handleHasPassword}
						className="ml-3"
						checked={hasPassword}
					/>
				</div>

				<div 
					className="form-group" 
					style={{display: hasPassword ? "" : "none"}}
				>
					<label className="text-muted">Course password</label>
					<input
						onChange={this.handleChange("password")}
						type="text"
						className="form-control"
						value={password}
					/>
				</div>
				<div className="form-group">
					<select 
						name="type"
						value={type}
						onChange={this.handleChange("type")}
					>
						<option value="open">Open</option>
						<option value="public">Public [to be implemented[</option>
						<option value="hidden">Hidden [to be implemented]</option>
					</select>
				</div>

				<button 
					className="btn btn-raised btn-outline"
					type="submit"
				>
					Submit
				</button>
			</form>
		);
	}

	render(){
		let { name, about, type, hasPassword, password, redirectToCourse } = this.state;
		let { error, message, newCourseId } = this.props;
		if (redirectToCourse && newCourseId) {
			return <Redirect to={`/classroom/course/${newCourseId}`} />
		}
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Create a new course</h2>

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

				{this.renderSignupForm(name, about, hasPassword, password, type)}
			</div>
		);
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		createCourse: (data) => dispatch(createCourse(data)),
		clearMessages: () => dispatch(clearMessages())
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.create
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateCourse);