import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class TeacherActions extends Component {
	constructor(){
		super()

		this.state = {
			redirectToEdit: false,
			redirectToEditInfo: false,
			redirectToEditTests: false
		}
	}

	render() {
		let { redirectToEdit, redirectToEditInfo, redirectToEditTests } = this.state;
		let { courseData } = this.props;
		if (redirectToEdit){
			return (
				<Redirect to={`/classroom/course/edit/${courseData._id}`} />
			)
		}
		if (redirectToEditInfo) {
			return (
				<Redirect to={`/classroom/course/edit-info/${courseData._id}`} />
			)
		}
		if (redirectToEditTests) {
			return (
				<Redirect to={`/classroom/course/edit-exercises/${courseData._id}`} />
			)
		}
		return (
			<div>
				<h1>Teacher actions:</h1>
				<button 
					className="btn btn-raised btn-outline btn-info ml-3"
					onClick={(e) => {
						this.setState({
							redirectToEditInfo: true
						})
					}}
				>
					Edit course info
				</button>

				<button 
					className="btn btn-raised btn-outline btn-info ml-3"
					onClick={(e) => {
						this.setState({
							redirectToEdit: true
						})
					}}
				>
					Edit course content
				</button>

				<button
					className="btn btn-raised btn-outline btn-info ml-3"
					onClick={(e) => {
						this.setState({
							redirectToEditTests: true
						})
					}}
				>
					Edit exercises / tests
				</button>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main.services
	}
}

export default connect(
	mapStateToProps
)(TeacherActions);
