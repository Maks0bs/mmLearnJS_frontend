import React, { Component } from 'react';
import { connect } from 'react-redux'

class ForumTopics extends Component {
	render() {
		return (
			<div>
				{JSON.stringify(this.props.forumData)}
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
(ForumTopics);