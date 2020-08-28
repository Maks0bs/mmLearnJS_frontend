import React, { Component } from 'react';
import SigninComponent from '../../components/Signin'

/**
 * A separate page for displaying the signin form. Sometimes the user
 * will be redirected here if they are not authorized to perform
 * some action on the site (normally caused by API 401 errors)
 *
 * @memberOf components.views.public
 * @component
 */
class Signin extends Component {
	render() {
		return (
			<div className="container w-100">
				<SigninComponent
					className="row w-50 justify-content-center"
					shouldRedirect
				/>
			</div>
		);
	}
}

export default Signin