import React, { Component } from 'react';
import { connect } from 'react-redux'

class ActivationMessage extends Component {
	render() {
		let user = this.props.authenticatedUser;
		return (user && user._id && !user.activated) ? (
			<div className="alert alert-warning mb-0 p-0 text-center">
				Your account is not activated
			</div>
		) : null;
	}
}


let mapStateToProps = (state) => {
	return {
		...state.services
	}
}

export default connect(
	mapStateToProps
)(ActivationMessage)