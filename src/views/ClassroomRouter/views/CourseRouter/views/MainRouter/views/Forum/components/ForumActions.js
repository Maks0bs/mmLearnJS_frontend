import React, { Component } from 'react';
import { connect } from 'react-redux'

class ForumActions extends Component {
	render() {
		return (
			<div>
				Forum actions
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.forum
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
(ForumActions);
