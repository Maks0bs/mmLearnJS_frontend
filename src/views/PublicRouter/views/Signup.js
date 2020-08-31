import React, { Component } from 'react';
import SignupComponent from "../components/SignupComponent/SignupComponent";

/**
 * The form for creating an account on this website.
 * View API docs for details about required user data.
 *
 * @memberOf components.views.public
 * @component
 */
class Signup extends Component {


	render(){
		return (
			<SignupComponent />
		)
	}
}

export default Signup