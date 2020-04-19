import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class AuthRoute extends Component {
	render(){
		let {component: Component, authenticatedUser: user, ...rest} = this.props;
		return (
			<Route 
				{...rest} 
				render={props => 
					(user && user._id) ? (
						<Component {...props} />
					) : (
						<Redirect 
							to={{
								pathname: "/placeholder",
								state: {
									from: props.location
								}
							}}
						/>
					)
				}
			/>
		)
	}
	
}

let mapStateToProps = (state) => {
	return {
		...state.services
	}
}

export default connect(
	mapStateToProps
)(AuthRoute);