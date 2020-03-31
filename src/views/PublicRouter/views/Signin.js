import React, { Component } from 'react';
import SigninComponent from '../../components/Signin'

class Signin extends Component {
	render() {
		return (
			<div className="container w-100">
				<SigninComponent className="row w-50 justify-content-center"/>
			</div>
		);
	}
}

export default Signin