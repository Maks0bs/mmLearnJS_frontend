import React, { Component } from 'react';
import { signup, inviteSignup } from './services/actions'
import { connect } from 'react-redux'
import { addToast } from "../../../../components/ToastRoot/services/actions";
import PropTypes from 'prop-types'
import SignupForm from "./components/SignupForm";
import BigLoadingAbsolute from "../../../../components/reusables/BigLoadingAbsolute";

/**
 * The page for creating an account on this website.
 * With a special token, this page allows users to signup from an
 * email invite.
 * View API docs for details about required user data and invitational
 * registration.
 *
 * @memberOf components.views.public
 * @component
 */
class SignupComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}


	notify = () => {
		this.setState({loading: false})
		if (this.props.error){
			this.props.addToast(
				(<div>Error while trying to create the account</div>),
				{ type: 'error' }
			)
		} else {
			this.props.addToast(
				(<div>Successfully created a new account</div>),
				{ type: 'success' }
			)
		}
	}

	onSubmit = (data) => {
		this.setState({loading: true})
		if (this.props.invitation){
			return this.props.inviteSignup(data, this.props.token)
				.then(() => this.notify())
		} else {
			return this.props.signup(data)
				.then(() => this.notify())
		}
	}

	render(){
		let { error, message } = this.props;
		let isMobileWidth = (window.innerWidth <= 1000)
		return (
			<div
				className="container text-center"
				style={{width: isMobileWidth ? '85%' : '50%'}}
			>
				{this.state.loading && (<BigLoadingAbsolute />)}
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

				<SignupForm
					invitation={this.props.invitation}
					onSubmit={this.onSubmit}
					startingState={this.props.startingState}
				/>
			</div>
		);
	}
}

let mapDispatchToProps = (dispatch) => ({
	signup: (user) => dispatch(signup(user)),
	inviteSignup: (user, token) => dispatch(inviteSignup({...user, token})),
	addToast: (component, options) => dispatch(addToast(component, options))
})
let mapStateToProps = (state) => ({
	...state.views.public.signup
})
SignupComponent.propTypes = {
	/**
	 * Specifies with what kind of invitation the user wants to sign up
	 * Currently there is only an invitation to register as a teacher
	 */
	invitation: PropTypes.string,
	/**
	 * Initial values of the fields in the form
	 */
	startingState: PropTypes.object,
	/**
	 * The invitation token which specifies some user data
	 */
	token: PropTypes.string
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignupComponent);