import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class TeacherActions extends Component {
	constructor(){
		super()

		this.state = {
			redirectToEdit: false
		}
	}

	render() {
		let { redirectToEdit } = this.state;
		let { courseData } = this.props;
		if (redirectToEdit){
			return (
				<Redirect to={`/classroom/course/edit/${courseData._id}`} />
			)
		}
		return (
			<div>
				<h1>Teacher actions:</h1>
				<button 
					className="btn btn-raised btn-outline btn-info ml-3"
					style={{
						background: ''
					}}
				>
					Edit course info
				</button>

				<button 
					className="btn btn-raised btn-outline btn-info ml-3"
					style={{
						background: ''
					}}
					onClick={(e) => {
						this.setState({
							redirectToEdit: true
						})
					}}
				>
					Edit course content
				</button>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		...state.views.classroom.course.main
	}
}

export default connect(
	mapStateToProps
)(TeacherActions);
