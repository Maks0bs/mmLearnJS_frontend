import React, { Component } from 'react';
import { connect } from 'react-redux'

class User extends Component {
	render() {
		// only show info, that user flagged as allowed to be shown
		// show all possibilities for logged in user
		return (
			<div>
				{JSON.stringify(this.props.authenticatedUser)}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.services
	}
}

export default connect(
	mapStateToProps
)(User)