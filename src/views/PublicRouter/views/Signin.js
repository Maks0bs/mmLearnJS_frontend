import React, { Component } from 'react';
import SigninComponent from '../../components/Signin'

/**
 * Complete page dedicated to logging in
 * Sometimes you may be redirected here if you are not authorized or in some other cases
 */
class Signin extends Component {
	render() {
		return (
			<div className="container w-100">
				<SigninComponent
					className="row w-50 justify-content-center"
					shouldRedirect={true}
				/>
			</div>
		);
	}
}

export default Signin