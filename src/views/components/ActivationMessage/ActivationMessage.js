import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleActivationMessage, getActivationMessageStatus } from './services/actions'

/**
 * The message that notifies the user, if their account is not activated.
 * Displayed above the navigation bar at the top of the page
 *
 * @memberOf components.views.components
 * @component
 */
class ActivationMessage extends Component {

	componentDidMount(){
		this.props.getStatus();
	}

	render() {
		if (!this.props.show){
			return null;
		}
		let user = this.props.authenticatedUser;
		/*
			Displayed only if the user is authenticated
			and not activated
		*/
		return (user && user._id && !user.activated) ? (
			<div className="alert alert-warning fade show mb-0 py-0 px-1 text-center">
				Your account is not activated. 
				Check your email or go to your <Link to={`/classroom/user/${user._id}`}>profile</Link>
				{' '}to activate it.
				{/*
					[x] button to close the message
				*/}
				<button 
					type="button" 
					className="close" 
					data-dismiss="alert" 
					aria-label="Close"
					onClick={this.props.toggleActivationMessage}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		) : null;
	}
}
let mapStateToProps = (state) => ({
	...state.services,
	...state.views.components.activationMessage
})
let mapDispatchToProps = (dispatch) => ({
	toggleActivationMessage: () => dispatch(toggleActivationMessage()),
	getStatus: () => dispatch(getActivationMessageStatus())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActivationMessage)