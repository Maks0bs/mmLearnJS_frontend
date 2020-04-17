import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { saveChanges } from '../services/actions'

class EditActions extends Component {
	constructor(){
		super();

		this.state = {
			redirectToMain: false
		}
	}

	handleLeave = () => {
		this.setState({
			redirectToMain: true
		})
	}

	handleSaveChanges = (e) => {
		this.props.saveChanges(this.props.courseData)
			.then(() => {
				this.handleLeave();
			})
	}

	render() {
		if (this.state.redirectToMain){
			return <Redirect to={`/classroom/course/${this.props.courseData._id}`} />
		}
		return (
			<div>
				<button 
					className="btn btn-raised btn-outline btn-danger ml-3"
					onClick={this.handleLeave}
				>
					Cancel changes
				</button>

				<button 
					className="btn btn-raised btn-outline btn-success ml-3"
					onClick={this.handleSaveChanges}
				>
					Save changes
				</button>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.editContent
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		saveChanges: (courseId) => dispatch(saveChanges(courseId))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditActions)