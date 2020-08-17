import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleActivationMessage, getActivationMessageStatus } from './services/actions'
import PropTypes from "prop-types";

class ActivationMessage extends Component {

	componentDidMount(){
		this.props.getStatus();
	}

	render() {
		if (!this.props.show){
			return null;
		}
		let user = this.props.authenticatedUser;
		return (user && user._id && !user.activated) ? (
			<div className="alert alert-warning alert-dissmissible fade show mb-0 py-0 px-1 text-center">
				Your account is not activated. 
				Check your email or go to your <Link to={`/classroom/user/${user._id}`}>profile</Link>
				{' '}to activate it.
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


let mapStateToProps = (state) => {
	return {
		...state.services,
		show: state.views.components.activationMessage.show
	}
}

ActivationMessage.propTypes = {
	show: PropTypes.bool
}

let mapDispatchToProps = (dispatch) => {
	return {
		toggleActivationMessage: () => dispatch(toggleActivationMessage()),
		getStatus: () => dispatch(getActivationMessageStatus())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActivationMessage)