import React, { Component } from 'react';

class Notifications extends Component {
	render() {
		return (
			<div>
				{JSON.stringify(this.props.authenticatedUser.notifications)}
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
	mapStateToProps,
	null
)
(Notifications);