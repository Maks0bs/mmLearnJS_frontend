import React, { Component } from 'react';
import { activateAccount } from './services/actions'
import { connect } from 'react-redux'
import PropTypes from "prop-types";

class ActivateAccount extends Component {

	componentDidMount(){
		let token = this.props.match.params.activationToken;
		this.props.activateAccount(token)
	}
	
	render(){
		let { error, message } = this.props;

		return (
			<div className="m-2">
				<div 
					className="alert alert-danger"
					style={{display: error ? "" : "none"}}
				>
					<h1>{error}</h1>
				</div>

				<div 
					className="alert alert-success"
					style={{display: message ? "" : "none"}}
				>
					<h1>{message}</h1>
				</div>
			</div>
		);
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		activateAccount: (token) => dispatch(activateAccount(token))
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.public.activateAccount
	}
}

ActivateAccount.propTypes = {
	message: PropTypes.string,
	error: PropTypes.string
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActivateAccount);