import React, { Component } from 'react';
import { forgotPassword } from './services/actions'
import { connect } from 'react-redux'
import { addToast } from "../../../../components/ToastRoot/services/actions";

class ForgotPassword extends Component {
	constructor(props){
		super(props);

		this.state = {
			email: ''
		}
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
	}



	onSubmit = (event) => {
		event.preventDefault()
		let { email} = this.state;

		this.props.forgotPassword(email)
			.then((data) => {
				if (!this.props.error || this.props.message){
					this.props.addToast(
						(
							<div>
								{this.props.message}
							</div>
						),
						{
							type: 'info'
						}
					)
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



	render(){
		let { email } = this.state;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Enter email to send password reset info to</h2>

				<form onSubmit={this.onSubmit}>

					<div className="form-group">
						<label className="text-muted">Email</label>
						<input
							onChange={this.handleChange("email")}
							type="email"
							className="form-control"
							value={email}
						/>
					</div>
					<button
						className="btn btn-raised btn-outline"
						type="submit"
					>
						Submit
					</button>
				</form>
			</div>
		);
	}
}



let mapStateToProps = (state) => {
	return {
		...state.views.public.forgotPassword,
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		forgotPassword: (email) => dispatch(forgotPassword(email)),
		addToast: (component, options) => dispatch(addToast(component, options)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ForgotPassword);