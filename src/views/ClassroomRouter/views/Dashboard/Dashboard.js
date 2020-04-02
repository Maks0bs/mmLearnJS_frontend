import React, { Component } from 'react';
import { connect } from 'react-redux'

class Dashboard extends Component {
	render() {
		return (
			<div></div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.services;
	}
}

export default connect(
	mapStateToProps,
	null
)(Dashboard)