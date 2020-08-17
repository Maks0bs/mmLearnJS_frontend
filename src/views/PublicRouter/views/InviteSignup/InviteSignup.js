import React, { Component } from 'react';
import { inviteSignup, clearMessages } from './services/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import QueryString from 'query-string'
import PropTypes from "prop-types";

class InviteSingup extends Component {
	constructor(props){
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			teacherChecked: false,
			teacherPassword: ''
		}
	}

	handleChange = (name) => (event) => {
		this.props.clearMessages();
		this.setState({
			[name]: event.target.value
		})
	}

	componentWillUnmount() {
		this.props.clearMessages();
	}

	handleTeacherCheck = () => {

		this.setState({
			teacherChecked: !this.state.teacherChecked,
			teacherPassword: ''
		})
	}


	onSubmit = (event) => {
		event.preventDefault()
		let {name, email, password, teacherPassword, teacherChecked} = this.state;
		let { token } = this.props.match.params;
		let user ={
			name: name,
			email: email,
			password: password,
			teacherPassword: teacherPassword,
			teacher: teacherChecked,
			token: token
		}

		this.props.signup(user)
			.then((data) => {
				if (!this.props.error){
					this.setState({
						name: '',
						email: '',
						password: '',
						teacherPassword: '',
						teacherChecked: false
					})
				}
			})
		
		
	}

	componentDidMount() {
		let params = QueryString.parse(this.props.location.search);
		if (params.email){
			this.setState({
				email: params.email
			})
		}
	}

	renderSignupForm(name, email, password, teacherChecked, teacherPassword, params){
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
					<label className="text-muted">Email</label>
					<input
						onChange={this.handleChange("email")}
						type="email"
						className="form-control"
						value={email}
					/>
				</div>
				<div className="form-group">
					<label className="text-muted">Password</label>
					<input 
						onChange={this.handleChange("password")}
						type="password" 
						className="form-control"
						value={password}
					/>
				</div>
				{(params.teacher !== 'true') ? (
					<div>
						<div className="form-group">
							<label className="text-muted">Sign up as a teacher?</label>
							<input
								type="checkbox"
								onClick={this.handleTeacherCheck}
								className="ml-3"
								checked={teacherChecked}
							/>
						</div>

						<div 
							className="form-group" 
							style={{display: teacherChecked ? "" : "none"}}
						>
							<label className="text-muted">Teacher password</label>
							<input
								onChange={this.handleChange("teacherPassword")}
								type="text"
								className="form-control"
								value={teacherPassword}
							/>
						</div>
					</div>
				) : (
					<div>
						<p>You will be registered as a teacher</p>
					</div>
				)
				}
				

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
		let { name, email, password, teacherChecked, teacherPassword } = this.state;
		let { error, message } = this.props;
		let params = QueryString.parse(this.props.location.search);
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Signup</h2>

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

				{this.renderSignupForm(name, email, password, teacherChecked, teacherPassword, params)}

				<Link 
					to="/signup"
					className="mt-2 ml-3"
				>
					Regular signup form
				</Link>
			</div>
		);
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		signup: (user) => dispatch(inviteSignup(user)),
		clearMessages: () => dispatch(clearMessages())
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.public.inviteSignup
	}
}

InviteSingup.propTypes = {
	message: PropTypes.string,
	error: PropTypes.string
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InviteSingup);