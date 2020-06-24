import React, { Component } from 'react';
import { connect } from 'react-redux'


class Dashboard extends Component {
	render() {
		return (
			<form>
				<input
					className="form-control"
					type="date"

					onChange={(e) => {console.log(e.target.value)}}
					min={"2000-01-01"}
					max={"2100-01-01"}
				/>
			</form>
		)
	}
}

let mapStateToProps = (state) => {
	return {
		authenticatedUser: state.services.authenticatedUser
	}
}

export default connect(
	mapStateToProps,
	null
)(Dashboard)