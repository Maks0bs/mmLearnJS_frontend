import React, { Component } from 'react';
import { signup } from './services/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Signup extends Component {
	constructor(props){
		super(props);

		this.state = {
			name: "",
			email: "",
			password: "",
			error: "",
			message: ''
		}
	}

	handleChange = (name) => (event) => {
		this.setState({
			error: "",

			[name]: event.target.value
		})
	}


	clickSubmit = (event) => {
		event.preventDefault();
		let {name, email, password} = this.state;
		let user ={
			name: name,
			email: email,
			password: password
		}

		
		this.props.signup(user)
		.then((data) => {
			if (data.error){
				this.setState({
					error: data.error
				})
			}
			else{

				console.log('data', data);
				this.setState({
					name: "",
					email: "",
					password: "",
					error: "",
					message: this.props.message
				})
			}
		})
		
		
	}

	renderSignupForm(name, email, password){
		return (
			<form>
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

				<button 
					className="btn btn-raised btn-primary"
					onClick={this.clickSubmit}
				>
					Submit
				</button>
			</form>
		);
	}

	render(){
		console.log(this.state);
		let {name, email, password, error, message} = this.state;
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

				{this.renderSignupForm(name, email, password)}
			</div>
		);
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		signup: (user) => dispatch(signup(user))
	}
}

let mapStateToProps = (state) => {
	return {
		message: state.viewsReducer.public.signupReducer.message
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup);