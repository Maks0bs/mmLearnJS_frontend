import React, { Component } from 'react';
import { activateAccount } from './services/actions'
import { connect } from 'react-redux'

/**
 * Displays the activation status of the user after sending an API
 * request to activate the user
 *
 * @memberOf components.views.public
 * @component
 */
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

let mapDispatchToProps = (dispatch) => ({
	activateAccount: (token) => dispatch(activateAccount(token))
})
let mapStateToProps = (state) => ({
	...state.views.public.activateAccount
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ActivateAccount);