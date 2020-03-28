import React, { Component } from 'react';
import { activateAccount } from './services/actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Signup extends Component {

	sendActivation = (token) => {
		this.props.activateAccount(token)
		.then((data) => {
			if (data.error){
				console.log(data.error);
			}
		})
	}

	componentDidMount(){
		let token = this.props.match.params.activationToken;
		this.sendActivation(token)
	}
	
	render(){
		return (
			<div className="container">
				{this.props.message}
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
		message: state.viewsReducer.public.activateAccountReducer.message
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup);