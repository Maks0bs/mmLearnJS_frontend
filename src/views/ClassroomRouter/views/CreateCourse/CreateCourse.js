import React, { Component } from 'react';
import { createCourse, clearMessages } from './services/actions'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

/**
 * The component that allows a teacher to create a new course.
 * Contains a form to enter the starting basic course data
 *
 * @memberOf components.views.classroom
 * @component
 */
class CreateCourse extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '', about: '', type: 'open',
			hasPassword: false, password: '',
			redirectToCourse: false
		}
	}

	componentWillUnmount() {
		this.props.clearMessages();
	}

	handleHasPassword = () => {
		this.setState({
			hasPassword: !this.state.hasPassword, password: ''
		})
	}

	handleChange = (name) => (event) => {
		this.props.clearMessages();
		this.setState({
			[name]: event.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault()
		this.props.createCourse({...this.state})
			.then(() => {
				if (!this.props.error){
					this.setState({
						name: '', about: '', type: '',
						password: '', hasPassword: false,
						redirectToCourse: true
					})
				}
			})
	}

	renderSignupForm = () => {
		let { name, about, type, hasPassword, password } = this.state;
		let inlineStyle = {display: 'flex', alignItems: 'center'}
		return (
			<form onSubmit={this.onSubmit}>
				<div className="form-group" style={inlineStyle}>
					<label className="text-muted my-0 mx-2">Name</label>
					<input 
						onChange={this.handleChange("name")}
						type="text" 
						className="form-control"
						value={name}
					/>
				</div>
				<div className="form-group" style={inlineStyle}>
					<label className="text-muted my-0 mx-2">Info about course</label>
					<input
						onChange={this.handleChange("about")}
						type="textarea"
						className="form-control"
						value={about}
					/>
				</div>
				<div className="form-group" style={inlineStyle}>
					<label className="text-muted my-0" htmlFor="course_add_password">
						Add a password to the course?
					</label>
					<input type="checkbox" className="ml-3"
						id="course_add_password"
						onChange={this.handleHasPassword}
						checked={hasPassword}
					/>
				</div>

				<div
					className="form-group"
					style={hasPassword ? inlineStyle : {display: 'none'}}
				>
					<label className="text-muted my-0 mx-2">Course password</label>
					<input type="text" className="form-control"
						onChange={this.handleChange("password")}
						value={password}
					/>
				</div>
				<div className="form-group">
					<select name="type" value={type} className="p-1"
						onChange={this.handleChange("type")}
					>
						<option value="open">Open</option>
						<option value="public">Public [to be implemented]</option>
						<option value="hidden">Hidden [to be implemented]</option>
					</select>
				</div>

				<button className="btn btn-raised btn-outline" type="submit">
					Create
				</button>
			</form>
		);
	}

	render(){

		let { error, message, newCourseId } = this.props;
		if (this.state.redirectToCourse && newCourseId) {
			return <Redirect to={`/classroom/course/${newCourseId}`} />
		}
		return (
			<div
				className="container"
				style={{width: '65%'}}
			>
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

				{this.renderSignupForm()}
			</div>
		);
	}
}

let mapStateToProps = (state) => ({
	...state.views.classroom.createCourse
})
let mapDispatchToProps = (dispatch) => ({
	createCourse: (data) => dispatch(createCourse(data)),
	clearMessages: () => dispatch(clearMessages())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateCourse);