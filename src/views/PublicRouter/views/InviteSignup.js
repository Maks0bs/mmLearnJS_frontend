import React, { Component } from 'react';
import QueryString from 'query-string'
import SignupComponent from "../components/SignupComponent";

/**
 * A more specified version of the signup page
 * users will visit this page if they were invited via
 * a special link
 *
 * @memberOf components.views.public
 * @component
 */
class InviteSignup extends Component {

	render(){
		let startingStateFromURIParams = QueryString.parse(this.props.location.search);
		let invitation;
		/*
			Find out what type of invitation we have.
			Clean the object with initial state.
		 */
		if (startingStateFromURIParams.teacher){
			invitation = 'teacher';
			delete startingStateFromURIParams.teacher;
		}
		return (
			<SignupComponent
				startingState={startingStateFromURIParams}
				invitation={invitation}
				token={this.props.match.params.token}
			/>
		)
	}
}



export default InviteSignup