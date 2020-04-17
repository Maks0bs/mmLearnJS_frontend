import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUser } from './services/actions'

class User extends Component {

	componentDidMount(){
		this.props.getUser(this.props.match.params.userId);
	}

	render() {
		// only show info, that user flagged as allowed to be shown
		// show all possibilities for logged in user
		return (
			<div>
				{JSON.stringify(this.props.user)}
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.user
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getUser: (userId) => dispatch(getUser(userId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User)