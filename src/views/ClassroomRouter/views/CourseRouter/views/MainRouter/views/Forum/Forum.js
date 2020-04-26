import React, { Component } from 'react';
import { createCourse, clearMessages } from './services/actions'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Forum extends Component {

	render(){
		console.log('forum', this.props);
		return (
			<div>
				test test test
			</div>
		)
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.forum
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Forum);