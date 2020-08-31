import React, { Component } from 'react';
import { resetPassword } from './services/actions'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToast } from "../../../../components/ToastRoot/services/actions";
/**
 * This page lets the user reset their password.
 * The password should be put in twice.
 * After submitting the new password, user will receive a
 * status notification
 *
 * @memberOf components.views.public
 * @component
 */
class ResetPassword extends Component {
	constructor(props){
		super(props);

		this.state = {
			/*
				New password the user wants to set
			 */
			password1: '',
			/*
				Copy of the new password
			 */
			password2: '',
			/*
			 * After successful password reset,
			 * the user should be redirected to the home page
			 */
			redirect: false
		}
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
	}

	onSubmit = (event) => {
		event.preventDefault()
		let { password1, password2 } = this.state;
		if (password1 !== password2){
			return this.props.addToast(
				(<div>Passwords do not match</div>),
				{type: 'error'}
			)
		}
		this.props.resetPassword(password1, this.props.match.params.token)
			.then(() => {
				if (!this.props.error || this.props.message){
					this.setState({
						redirect: true
					})
					this.props.addToast(
						(<div>{this.props.message}</div>),
						{type: 'success'}
					)
				} else {
					this.props.addToast(
						(<div>{this.props.error}</div>),
						{type: 'error'}
					)
				}
			})
	}

	render(){
		if (this.state.redirect){
			return (<Redirect to={'/'} />)
		}

		let { password1, password2 } = this.state;
		return (
			<div className="container">
				<h2 className="mt-5 mb-5">Enter a new, safe password</h2>

				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label className="text-muted">New password</label>
						<input
							onChange={this.handleChange("password1")}
							type="password"
							className="form-control"
							value={password1}
						/>
						<label className="text-muted mt-5">Repeat new password</label>
						<input
							onChange={this.handleChange("password2")}
							type="password"
							className="form-control"
							value={password2}
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

let mapStateToProps = (state) => ({
	...state.views.public.resetPassword,
})
let mapDispatchToProps = (dispatch) => ({
	resetPassword: (password, token) => dispatch(resetPassword(password, token)),
	addToast: (component, options) => dispatch(addToast(component, options)),
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ResetPassword);